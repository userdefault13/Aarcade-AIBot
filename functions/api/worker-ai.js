/**
 * Cloudflare Pages Function: Aarcade Assistant API.
 * POST /api/worker-ai with body: { query: string }
 */
import { ALL_TOPICS, getReply } from '../../lib/worker-ai.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method === 'GET') {
    return json({
      topics: ALL_TOPICS.map((t) => ({ id: t.id, title: t.title, path: t.path, category: t.category })),
      message: 'POST { query: string } to ask about Aavegotchi, Aarcade games, or Business.',
    });
  }

  if (request.method === 'POST') {
    let body = {};
    try {
      body = await request.json();
    } catch (_) {}
    const query = (body.query || '').trim();
    let reply;

    // Summarize: "summarize:" or "summarize this:" followed by text
    const summarizeMatch = query.match(/^summarize(?:\s+this)?[:\s]+(.+)/is);
    if (summarizeMatch && context.env.AI) {
      const text = summarizeMatch[1].trim();
      if (text.length > 50) {
        try {
          const aiRes = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
            prompt: `Summarize the following in 2-4 concise sentences. Keep the key points:\n\n${text.slice(0, 4000)}`,
            max_tokens: 256,
          });
          reply = (aiRes?.response ?? aiRes?.result?.response ?? '')?.trim() || getReply(query);
        } catch (err) {
          reply = getReply(query);
        }
      } else {
        reply = 'Please provide more text to summarize (e.g. "summarize: [your text here]").';
      }
    }
    // General writing/rewrite: "rewrite:", "improve:", "write:"
    else if (context.env.AI && /^(rewrite|improve|write|rephrase)(?:\s+this)?[:\s]+/i.test(query)) {
      const match = query.match(/^(rewrite|improve|write|rephrase)(?:\s+this)?[:\s]+(.+)/is);
      const action = (match[1] || '').toLowerCase();
      const text = (match[2] || '').trim();
      const prompts = {
        rewrite: 'Rewrite the following to be clearer and more concise:',
        improve: 'Improve the following text for clarity and flow:',
        write: 'Write a short, clear version of the following:',
        rephrase: 'Rephrase the following in different words:',
      };
      if (text.length > 20) {
        try {
          const aiRes = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
            prompt: `${prompts[action] || prompts.rewrite}\n\n${text.slice(0, 4000)}`,
            max_tokens: 512,
          });
          reply = (aiRes?.response ?? aiRes?.result?.response ?? '')?.trim() || getReply(query);
        } catch (err) {
          reply = getReply(query);
        }
      } else {
        reply = `Please provide text after "${action}:" (e.g. "${action}: [your text]").`;
      }
    }
    // Web search (requires SERPER_API_KEY in env)
    else if (context.env.SERPER_API_KEY && /^search(?:\s+for)?[:\s]+/i.test(query)) {
      const match = query.match(/^search(?:\s+for)?[:\s]+(.+)/i);
      const searchQuery = (match[1] || '').trim();
      if (searchQuery) {
        try {
          const res = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
              'X-API-KEY': context.env.SERPER_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q: searchQuery, num: 5 }),
          });
          const data = await res.json();
          const results = data.organic || [];
          if (results.length > 0) {
            reply = `**Search results for "${searchQuery}":**\n\n` + results
              .slice(0, 5)
              .map((r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet || ''}\n   ${r.link || ''}`)
              .join('\n\n');
          } else {
            reply = `No results found for "${searchQuery}".`;
          }
        } catch (err) {
          reply = getReply(query);
        }
      } else {
        reply = 'Usage: "search: [your query]" or "search for: [query]"';
      }
    }
    // CPI / inflation history (requires FRED_API_KEY)
    else if (/^(cpi|inflation\s*history|cpi\s*history)[:\s]*(.*)$/i.test(query)) {
      const match = query.match(/^(cpi|inflation\s*history|cpi\s*history)[:\s]*(\d*)/i);
      const months = Math.min(parseInt(match?.[2] || '12', 10) || 12, 24);
      if (context.env.FRED_API_KEY) {
        try {
          const end = new Date();
          const start = new Date(end);
          start.setMonth(start.getMonth() - months);
          const res = await fetch(
            `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${context.env.FRED_API_KEY}&file_type=json&observation_start=${start.toISOString().slice(0, 10)}&observation_end=${end.toISOString().slice(0, 10)}&sort_order=desc`
          );
          const data = await res.json();
          const obs = data?.observations || [];
          if (obs.length > 0) {
            const rows = obs.slice(0, 12).map((o) => `  ${o.date}: ${parseFloat(o.value || 0).toFixed(2)}`);
            const latest = obs[0];
            const yoy = obs.length >= 13 ? (((parseFloat(latest.value) - parseFloat(obs[12].value)) / parseFloat(obs[12].value)) * 100).toFixed(1) : '—';
            reply = `**CPI (Consumer Price Index)** — last ${months} months\n\nLatest: **${latest.date}** = ${parseFloat(latest.value).toFixed(2)} (1982–84=100)${yoy !== '—' ? ` | YoY: ${yoy}%` : ''}\n\nRecent:\n${rows.join('\n')}\n\n*Data: FRED (St. Louis Fed).*`;
          } else {
            reply = 'No CPI data returned. Check FRED_API_KEY and try again.';
          }
        } catch (err) {
          reply = `Could not fetch CPI: ${err.message}`;
        }
      } else {
        reply = 'CPI/inflation history requires **FRED_API_KEY**. Get a free key at https://fred.stlouisfed.org/docs/api/api_key.html and add it in Cloudflare → Settings → Environment variables.';
      }
    }
    // BTC / Bitcoin historical (CoinGecko — no key needed)
    else if (/^(btc|bitcoin|eth|ethereum)\s*(?:price|history)?\s*(\d*)\s*(?:days?)?$/i.test(query)) {
      const match = query.match(/^(btc|bitcoin|eth|ethereum)\s*(?:price|history)?\s*(\d*)\s*(?:days?)?$/i);
      const coin = /eth/i.test(match?.[1] || '') ? 'ethereum' : 'bitcoin';
      const days = Math.min(parseInt(match?.[2] || '30', 10) || 30, 365);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`);
        const data = await res.json();
        const prices = data?.prices || [];
        if (prices.length > 0) {
          const latest = prices[prices.length - 1];
          const first = prices[0];
          const change = first ? (((latest[1] - first[1]) / first[1]) * 100).toFixed(1) : '—';
          const sample = prices.filter((_, i) => i % Math.max(1, Math.floor(prices.length / 8)) === 0).slice(-8);
          const rows = sample.map(([ts, p]) => `  ${new Date(ts).toLocaleDateString()}: $${p.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
          reply = `**${coin === 'bitcoin' ? 'Bitcoin (BTC)' : 'Ethereum (ETH)'}** — last ${days} days\n\nCurrent: **$${latest[1].toLocaleString(undefined, { maximumFractionDigits: 2 })}**\nChange: ${change}%\n\nSample:\n${rows.join('\n')}\n\n*Data: CoinGecko.*`;
        } else {
          reply = `No ${coin} data returned. Try again later.`;
        }
      } catch (err) {
        reply = `Could not fetch ${coin} price: ${err.message}`;
      }
    }
    // Stock ticker (requires ALPHAVANTAGE_API_KEY)
    else if (/^(stock|quote|ticker)[:\s]+([A-Za-z0-9.\-]+)/i.test(query)) {
      const match = query.match(/^(stock|quote|ticker)[:\s]+([A-Za-z0-9.\-]+)/i);
      const symbol = (match?.[2] || '').toUpperCase().trim();
      if (!symbol) {
        reply = 'Usage: "stock: AAPL" or "ticker: MSFT"';
      } else if (context.env.ALPHAVANTAGE_API_KEY) {
        try {
          const res = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&apikey=${context.env.ALPHAVANTAGE_API_KEY}&outputsize=compact`
          );
          const data = await res.json();
          const ts = data['Time Series (Daily)'];
          if (ts) {
            const dates = Object.keys(ts).sort().reverse();
            const latest = dates[0];
            const o = ts[latest];
            const rows = dates.slice(0, 10).map((d) => {
              const v = ts[d];
              return `  ${d}: O ${v['1. open']} H ${v['2. high']} L ${v['3. low']} C ${v['4. close']}`;
            });
            reply = `**${symbol}** — Daily OHLC\n\nLatest (${latest}):\n  Open ${o['1. open']} | High ${o['2. high']} | Low ${o['3. low']} | **Close ${o['4. close']}** | Vol ${parseInt(o['5. volume'], 10).toLocaleString()}\n\nRecent:\n${rows.join('\n')}\n\n*Data: Alpha Vantage. Free tier: 25 req/day.*`;
          } else if (data['Error Message']) {
            reply = `Stock error: ${data['Error Message']}`;
          } else {
            reply = `No data for ${symbol}. Check symbol (e.g. AAPL, MSFT, TSCO.LON).`;
          }
        } catch (err) {
          reply = `Could not fetch stock: ${err.message}`;
        }
      } else {
        reply = 'Stock data requires **ALPHAVANTAGE_API_KEY**. Get a free key at https://www.alphavantage.co/support/#api-key (25 req/day) and add it in Cloudflare → Settings → Environment variables.';
      }
    }
    else {
      reply = getReply(query);
    }

    return json({ reply });
  }

  return json({ error: 'Method not allowed' }, 405);
}
