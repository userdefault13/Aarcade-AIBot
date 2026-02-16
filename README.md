# Aarcade AI Bot

Standalone Department Assistant chatbot for Cloudflare Pages. Answers queries about the 8 Business Development departments (Executive, HR, Finance, Marketing, Sales, Operations, Communications, IT).

## Development

```bash
npm install
npm run dev
```

Runs the Vue app at `http://localhost:5173`. The API at `/api/worker-ai` will 404 in dev (Vite doesn't run the Cloudflare Function). Use `npm run pages:dev` to test with the full stack locally.

## Build & Deploy to Cloudflare Pages

```bash
npm run build
npm run pages:deploy
```

Or with Wrangler directly:

```bash
npx wrangler pages deploy dist --project-name=aarcade-aibot
```

**First-time setup:** Create a Pages project in the [Cloudflare dashboard](https://dash.cloudflare.com/) (Workers & Pages → Create → Pages → Connect to Git, or Direct Upload). For Direct Upload, run `wrangler pages deploy dist` and follow the prompts to create the project.

## Project structure

- `src/` – Vue 3 app (chat UI)
- `functions/api/worker-ai.js` – Cloudflare Pages Function (API)
- `public/` – Static assets, `_routes.json` (only `/api/*` invokes Functions)
- `wrangler.toml` – Cloudflare Pages config

## Embedding in other sites

To embed this chatbot in another site (e.g. AarcadeGh-t), add an iframe:

```html
<iframe
  src="https://aarcade-aibot.pages.dev"
  title="Department Assistant"
  width="400"
  height="600"
  style="border: none; border-radius: 12px;"
></iframe>
```

Or use the URL as a floating widget by opening it in a popup/window.
