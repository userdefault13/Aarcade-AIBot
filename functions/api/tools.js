/**
 * Cloudflare Pages Function: AI Bot Tools API.
 * GET /api/tools
 */
import { ALL_TOPICS, RICH_RESPONSES } from '../../lib/worker-ai.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

const CAPABILITIES = [
  { id: 'math', name: 'Basic Math', example: '4 + 4', envKey: null },
  { id: 'stats', name: 'Statistics', example: 'mean of 1, 2, 3', envKey: null },
  { id: 'calculus', name: 'Calculus', example: 'derivative of x^2', envKey: null },
  { id: 'compound', name: 'Compound Interest', example: 'compound 1000 at 5% for 10', envKey: null },
  { id: 'npv', name: 'NPV', example: 'npv -1000 100 100 100 5%', envKey: null },
  { id: 'roi', name: 'ROI', example: 'roi 1500 1000', envKey: null },
  { id: 'dca', name: 'DCA', example: 'dca 100 12', envKey: null },
  { id: 'rsi', name: 'RSI', example: 'rsi [14 prices]', envKey: null },
  { id: 'summarize', name: 'Summarize', example: 'summarize: text', envKey: 'AI' },
  { id: 'rewrite', name: 'Rewrite', example: 'rewrite: text', envKey: 'AI' },
  { id: 'search', name: 'Web Search', example: 'search: query', envKey: 'SERPER_API_KEY' },
  { id: 'cpi', name: 'CPI/Inflation', example: 'cpi 12', envKey: 'FRED_API_KEY' },
  { id: 'btc', name: 'BTC/ETH Price', example: 'btc 30', envKey: null },
  { id: 'stock', name: 'Stock Ticker', example: 'stock: AAPL', envKey: 'ALPHAVANTAGE_API_KEY' },
];

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let customTools = [];
  try {
    const origin = new URL(request.url).origin;
    const res = await fetch(`${origin}/custom-tools.json`);
    if (res.ok) {
      const data = await res.json();
      customTools = Array.isArray(data) ? data : [];
    }
  } catch (_) {
    customTools = [];
  }

  const topics = ALL_TOPICS.map((t) => ({
    id: t.id,
    title: t.title,
    path: t.path,
    description: t.description,
    keywords: t.keywords,
    category: t.category,
  }));

  const richResponses = Object.entries(RICH_RESPONSES).map(([id, config]) => ({
    id,
    triggers: config.triggers || [],
  }));

  const capabilities = CAPABILITIES.map((c) => ({
    ...c,
    enabled: c.envKey ? !!env[c.envKey] : true,
  }));

  return json({
    topics,
    richResponses,
    capabilities,
    customTools,
  });
}
