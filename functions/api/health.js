/**
 * Cloudflare Pages Function: AI Bot Health API.
 * GET /api/health
 */
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

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const checks = {
    api: { ok: true },
    ai: { ok: !!env.AI },
    serper: { ok: !!env.SERPER_API_KEY },
    fred: { ok: !!env.FRED_API_KEY },
    alphavantage: { ok: !!env.ALPHAVANTAGE_API_KEY },
  };

  const failedCount = Object.values(checks).filter((c) => !c.ok).length;
  const status = failedCount === 0 ? 'ok' : failedCount < 3 ? 'degraded' : 'error';

  return json({
    status,
    timestamp: new Date().toISOString(),
    checks,
  });
}
