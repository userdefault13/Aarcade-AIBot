# Aarcade AI Bot

Standalone **Aarcade Assistant** for Cloudflare Pages. Answers questions about:
- **Aavegotchi** – gotchis, GHST, Baazaar, staking, wearables, DAO, etc.
- **Aarcade Gh$t** – games (Paarcel, Gotchinopoly), leaderboard, player profile, manuals
- **Business** – 8 departments (Executive, HR, Finance, Marketing, Sales, Operations, Communications, IT)
- **Writing** – `summarize: [text]` or `rewrite: [text]` (uses Cloudflare Workers AI)
- **Web search** – `search: [query]` (optional, requires Serper API key)
- **Historical data** – CPI, BTC/ETH prices, stock tickers (see below)
- **Crypto & trading** – DCA, HODL, RSI, moving averages, stop loss, take profit
- **Writing** – `summarize: [text]` or `rewrite: [text]` (uses Cloudflare Workers AI)
- **Web search** – `search: [query]` (optional, requires Serper API key)

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

**Workers AI** (summarize/rewrite): Add the AI binding in the dashboard (Settings → Bindings → Workers AI). The wrangler.toml already includes `[ai] binding = "AI"`.

**Web search** (optional): Add `SERPER_API_KEY` as an environment variable/secret in the dashboard. Get a key at [serper.dev](https://serper.dev). Then use `search: your query` in the chat.

**Historical data** (optional):
- **CPI / inflation:** `cpi` or `cpi 12` — add `FRED_API_KEY` (free at [FRED](https://fred.stlouisfed.org/docs/api/api_key.html))
- **Bitcoin / Ethereum:** `btc`, `btc 30`, `eth 7` — no key needed (CoinGecko)
- **Stocks:** `stock: AAPL`, `ticker: MSFT` — add `ALPHAVANTAGE_API_KEY` (free 25 req/day at [Alpha Vantage](https://www.alphavantage.co/support/#api-key))

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
  title="Aarcade Assistant"
  width="400"
  height="600"
  style="border: none; border-radius: 12px;"
></iframe>
```

Or use the URL as a floating widget by opening it in a popup/window.
