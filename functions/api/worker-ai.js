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
    const query = body.query || '';
    const reply = getReply(query);
    return json({ reply });
  }

  return json({ error: 'Method not allowed' }, 405);
}
