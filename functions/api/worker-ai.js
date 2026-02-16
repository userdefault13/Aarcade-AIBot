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
    else {
      reply = getReply(query);
    }

    return json({ reply });
  }

  return json({ error: 'Method not allowed' }, 405);
}
