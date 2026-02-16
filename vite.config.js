import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { getReply, ALL_TOPICS } from './lib/worker-ai.js';

function workerAiDevPlugin() {
  return {
    name: 'worker-ai-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/worker-ai' || req.url?.startsWith('/api/worker-ai?')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }
          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              topics: ALL_TOPICS.map((t) => ({ id: t.id, title: t.title, path: t.path, category: t.category })),
              message: 'POST { query: string } to ask about Aavegotchi, Aarcade games, or Business.',
            }));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const { query = '' } = JSON.parse(body || '{}');
                let reply;
                if (/^summarize(?:\s+this)?[:\s]+/i.test(query) || /^(rewrite|improve|write|rephrase)(?:\s+this)?[:\s]+/i.test(query)) {
                  reply = 'Summarize/rewrite uses Cloudflare Workers AI and works when deployed. Run `npm run pages:deploy` and test on the live site.';
                } else if (/^search(?:\s+for)?[:\s]+/i.test(query)) {
                  reply = 'Web search requires SERPER_API_KEY when deployed. Add it in Cloudflare dashboard → Settings → Environment variables.';
                } else {
                  reply = getReply(query);
                }
                if (/^summarize(?:\s+this)?[:\s]+/i.test(query) || /^(rewrite|improve|write|rephrase)(?:\s+this)?[:\s]+/i.test(query)) {
                  reply = 'Summarize/rewrite uses Cloudflare Workers AI and works when deployed. Run `npm run pages:deploy` and test on the live site.';
                } else if (/^search(?:\s+for)?[:\s]+/i.test(query)) {
                  reply = 'Web search requires SERPER_API_KEY when deployed. Add it in Cloudflare dashboard → Settings → Environment variables.';
                } else {
                  reply = getReply(query);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply }));
              } catch (_) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), workerAiDevPlugin()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
