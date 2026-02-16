/**
 * Shared logic for Aarcade Assistant (Aavegotchi, AarcadeGhst, Business)
 * Used by Cloudflare Function and dev server
 */
import { create, all } from 'mathjs';

const math = create(all);

// Business Development departments (admin)
const DEPARTMENTS = [
  { id: 'executive', title: 'Executive / Leadership', path: '/adminbusinessdevelopment/executive', description: 'C-suite and general management tools. Board view and Journey Builder for strategic planning and game roadmaps (e.g. Gotchinopoly).', keywords: ['executive', 'leadership', 'ceo', 'c-suite', 'management', 'board', 'journey', 'roadmap', 'planning'], category: 'business' },
  { id: 'hr', title: 'Human Resources', path: '/adminbusinessdevelopment/hr', description: 'Recruitment, onboarding, and HR operations. Kanban board for HR tasks.', keywords: ['hr', 'human resources', 'recruitment', 'hiring', 'onboarding', 'people', 'employees'], category: 'business' },
  { id: 'finance', title: 'Finance / Accounting', path: '/adminbusinessdevelopment/finance', description: 'Financial reporting and accounting. Track incomes, expenses, and cash flow.', keywords: ['finance', 'accounting', 'money', 'budget', 'revenue', 'expenses', 'cash flow'], category: 'business' },
  { id: 'marketing', title: 'Marketing', path: '/adminbusinessdevelopment/marketing', description: 'Campaigns, analytics, and brand. Marketing pipeline and content creation.', keywords: ['marketing', 'campaigns', 'brand', 'ads', 'analytics'], category: 'business' },
  { id: 'sales', title: 'Sales', path: '/adminbusinessdevelopment/sales', description: 'Pipeline, CRM, and sales operations. Track deals and customer relationships.', keywords: ['sales', 'pipeline', 'crm', 'deals', 'revenue'], category: 'business' },
  { id: 'operations', title: 'Operations', path: '/adminbusinessdevelopment/operations', description: 'Process and operational tools. Day-to-day tasks and process documentation.', keywords: ['operations', 'ops', 'process', 'tasks', 'kpis'], category: 'business' },
  { id: 'communications', title: 'Communications', path: '/adminbusinessdevelopment/communications', description: 'Internal and external communications. Content creation and comms pipeline.', keywords: ['communications', 'comms', 'content', 'internal', 'external'], category: 'business' },
  { id: 'it', title: 'IT', path: '/adminbusinessdevelopment/it', description: 'Technology and infrastructure. Board, Boo-Jam (workflow builder), and Mermaid diagram tools.', keywords: ['it', 'technology', 'tech', 'infrastructure', 'boo-jam', 'mermaid'], category: 'business' },
];

// Aavegotchi ecosystem
const AAVEGOTCHI_TOPICS = [
  { id: 'aavegotchi', title: 'Aavegotchi', path: '/', description: 'Aavegotchi is a DeFi-staked NFT gaming protocol on Polygon. Collect ghost NFTs (gotchis), equip wearables, and play games. GHST is the governance and utility token.', keywords: ['aavegotchi', 'gotchi', 'ghost', 'nft', 'polygon'], category: 'aavegotchi' },
  { id: 'gotchis', title: 'Gotchis (Aavegotchis)', path: '/myaavegotchis', description: 'Gotchis are your ghost NFT pets. View and manage your gotchis at My Aavegotchis. Each has traits, wearables, and kinship.', keywords: ['gotchi', 'gotchis', 'aavegotchi', 'pet', 'nft', 'ghost'], category: 'aavegotchi' },
  { id: 'portals', title: 'Portals', path: '/myportals', description: 'Portals let you summon new gotchis. Unopened portals can be opened to mint a gotchi with random traits.', keywords: ['portal', 'portals', 'summon', 'mint'], category: 'aavegotchi' },
  { id: 'ghst', title: 'GHST Token', path: '/stake', description: 'GHST is the Aavegotchi ecosystem token. Stake GHST for rewards, use in the Baazaar, and participate in governance.', keywords: ['ghst', 'token', 'crypto', 'staking'], category: 'aavegotchi' },
  { id: 'wearables', title: 'Wearables', path: '/myitems', description: 'Wearables are items you can equip on gotchis. They affect traits and appearance. Buy and sell on the Baazaar.', keywords: ['wearable', 'wearables', 'equip', 'items'], category: 'aavegotchi' },
  { id: 'baazaar', title: 'Baazaar', path: '/baazaar', description: 'The Baazaar is the marketplace for gotchis, wearables, and other Aavegotchi assets. Buy and sell NFTs.', keywords: ['baazaar', 'marketplace', 'buy', 'sell', 'trade'], category: 'aavegotchi' },
  { id: 'staking', title: 'Staking', path: '/stake', description: 'Stake GHST to earn rewards. Multiple staking options available on the Stake page.', keywords: ['stake', 'staking', 'rewards', 'ghst'], category: 'aavegotchi' },
  { id: 'lending', title: 'Lending', path: '/lending', description: 'Lend and borrow assets in the Aavegotchi ecosystem. DeFi lending protocol integration.', keywords: ['lending', 'lend', 'borrow', 'defi'], category: 'aavegotchi' },
  { id: 'dao', title: 'DAO / Governance', path: '/dao', description: 'Aavegotchi DAO governs the protocol. Vote on proposals and participate in community decisions.', keywords: ['dao', 'governance', 'vote', 'proposal'], category: 'aavegotchi' },
  { id: 'raffle', title: 'Raffle', path: '/raffle', description: 'Participate in raffles for wearables and other Aavegotchi rewards.', keywords: ['raffle', 'raffles', 'lottery'], category: 'aavegotchi' },
  { id: 'auction', title: 'Auction', path: '/auction', description: 'Bid on gotchis, wearables, and other assets in auctions.', keywords: ['auction', 'auctions', 'bid'], category: 'aavegotchi' },
];

// AarcadeGhst games and site features
const AARCADE_TOPICS = [
  { id: 'aarcade', title: 'Aarcade Gh$t', path: '/', description: 'Aarcade Gh$t is a gaming hub for Aavegotchi. Play games, view your gotchis, and explore the ecosystem.', keywords: ['aarcade', 'aarcadeghst', 'aarcade ghst', 'site', 'hub'], category: 'aarcade' },
  { id: 'games', title: 'Games', path: '/games', description: 'Play Aarcade games including Paarcel and Gotchinopoly. Visit /games to browse and launch games.', keywords: ['games', 'play', 'game'], category: 'aarcade' },
  { id: 'paarcel', title: 'Paarcel', path: '/games/paarcel', description: 'Paarcel is a game on Aarcade. Play at /games/paarcel. Check the Manual for rules.', keywords: ['paarcel', 'game'], category: 'aarcade' },
  { id: 'gotchinopoly', title: 'Gotchinopoly', path: '/games/gotchinopoly', description: 'Gotchinopoly is a Monopoly-style game on Aarcade. Play at /games/gotchinopoly. For roadmap and planning, use the Journey Builder in Business Development (Executive) at /adminbusinessdevelopment/executive.', keywords: ['gotchinopoly', 'monopoly', 'game', 'roadmap', 'planning'], category: 'aarcade' },
  { id: 'leaderboard', title: 'Leaderboard', path: '/leaderboard', description: 'View game scores and rankings on the Leaderboard. Compete with other players.', keywords: ['leaderboard', 'scores', 'rankings', 'compete'], category: 'aarcade' },
  { id: 'player-profile', title: 'Player Profile', path: '/player', description: 'View your player profile and stats. Connect your wallet to see your gotchis and game history.', keywords: ['profile', 'player', 'stats', 'account'], category: 'aarcade' },
  { id: 'manuals', title: 'Game Manuals', path: '/manuals', description: 'Read game manuals and how-to guides. Each game has a Manual link on the Games page.', keywords: ['manual', 'manuals', 'guide', 'how to', 'rules'], category: 'aarcade' },
  { id: 'play', title: 'Play', path: '/play', description: 'Quick access to play games. Use the Play link or visit /games to choose a game.', keywords: ['play', 'quick play'], category: 'aarcade' },
  { id: 'chat', title: 'Chat / Messages', path: '/', description: 'Chat with the team using the chat widget (bottom-right). Send messages and get support.', keywords: ['chat', 'message', 'support', 'help', 'contact'], category: 'aarcade' },
];

// Economics & Finance concepts
const ECO_FINANCE_TOPICS = [
  { id: 'npv', title: 'NPV (Net Present Value)', path: '/', description: 'NPV discounts future cash flows to today\'s value. NPV > 0 means the investment adds value. Formula: NPV = Σ CF_t / (1+r)^t - initial investment.', keywords: ['npv', 'net present value', 'discounted cash flow', 'dcf'], category: 'finance' },
  { id: 'irr', title: 'IRR (Internal Rate of Return)', path: '/', description: 'IRR is the discount rate that makes NPV = 0. It\'s the "break-even" return. Higher IRR = better project (all else equal).', keywords: ['irr', 'internal rate of return', 'yield'], category: 'finance' },
  { id: 'compound-interest', title: 'Compound Interest', path: '/', description: 'Interest earned on both principal and accumulated interest. FV = PV × (1 + r)^n. Try: "compound 1000 at 5% for 10 years"', keywords: ['compound', 'compound interest', 'fv', 'future value'], category: 'finance' },
  { id: 'supply-demand', title: 'Supply and Demand', path: '/', description: 'Supply: quantity producers offer at each price. Demand: quantity buyers want. Equilibrium: where supply meets demand. Price rises when demand > supply.', keywords: ['supply', 'demand', 'equilibrium', 'market'], category: 'economics' },
  { id: 'inflation', title: 'Inflation', path: '/', description: 'Rise in general price level over time. Reduces purchasing power. Central banks target ~2% inflation. Real return = nominal return - inflation.', keywords: ['inflation', 'cpi', 'purchasing power'], category: 'economics' },
  { id: 'opportunity-cost', title: 'Opportunity Cost', path: '/', description: 'The value of the next-best alternative forgone. Every choice has an opportunity cost. Key concept in economics and decision-making.', keywords: ['opportunity cost', 'trade-off'], category: 'economics' },
  { id: 'roi', title: 'ROI (Return on Investment)', path: '/', description: 'ROI = (Gain - Cost) / Cost × 100%. Measures profitability. Try: "roi 1500 1000" for 50% ROI.', keywords: ['roi', 'return on investment', 'profit margin'], category: 'finance' },
  { id: 'present-value', title: 'Present Value (PV)', path: '/', description: 'Today\'s value of a future sum. PV = FV / (1+r)^n. Discount rate r reflects time value of money.', keywords: ['present value', 'pv', 'discount'], category: 'finance' },
  { id: 'historical-data', title: 'Historical Data (CPI, BTC, Stocks)', path: '/', description: 'Get CPI inflation history, Bitcoin/Ethereum prices, or stock ticker data. Try: "cpi 12", "btc 30", "stock: AAPL".', keywords: ['cpi', 'inflation history', 'btc', 'bitcoin price', 'eth', 'ethereum', 'stock', 'ticker', 'historical'], category: 'finance' },
];

// Crypto & trading strategies
const CRYPTO_TRADING_TOPICS = [
  { id: 'dca', title: 'DCA (Dollar-Cost Averaging)', path: '/', description: 'Invest a fixed amount at regular intervals regardless of price. Smooths volatility and removes timing risk. Try: "dca 100 12" or "dca 100 monthly for 12 at 50000".', keywords: ['dca', 'dollar cost averaging', 'averaging in', 'periodic investment'], category: 'trading' },
  { id: 'hodl', title: 'HODL', path: '/', description: 'Hold On for Dear Life — buy and hold long-term, ignore short-term volatility. Popular in crypto for believers in long-term appreciation.', keywords: ['hodl', 'hold', 'buy and hold', 'long term'], category: 'trading' },
  { id: 'rsi', title: 'RSI (Relative Strength Index)', path: '/', description: 'Momentum oscillator 0–100. RSI > 70 = overbought; RSI < 30 = oversold. Used for entry/exit signals.', keywords: ['rsi', 'relative strength', 'overbought', 'oversold'], category: 'trading' },
  { id: 'moving-average', title: 'Moving Averages (MA, EMA)', path: '/', description: 'SMA = average of last N prices. EMA weights recent prices more. Golden cross (short MA crosses above long) = bullish; death cross = bearish.', keywords: ['moving average', 'sma', 'ema', 'golden cross', 'death cross'], category: 'trading' },
  { id: 'support-resistance', title: 'Support & Resistance', path: '/', description: 'Support = price floor where buyers step in. Resistance = price ceiling where sellers dominate. Breakouts signal trend changes.', keywords: ['support', 'resistance', 'breakout', 'price level'], category: 'trading' },
  { id: 'stop-loss', title: 'Stop Loss', path: '/', description: 'Pre-set sell order to limit losses. E.g. sell if price drops 10% from entry. Essential risk management.', keywords: ['stop loss', 'stop-loss', 'stop loss order', 'risk management'], category: 'trading' },
  { id: 'take-profit', title: 'Take Profit', path: '/', description: 'Pre-set sell order to lock in gains. E.g. sell 50% at +20% profit. Complements stop loss.', keywords: ['take profit', 'take-profit', 'profit target', 'exit strategy'], category: 'trading' },
  { id: 'position-sizing', title: 'Position Sizing', path: '/', description: 'How much to risk per trade. Rule of thumb: risk 1–2% of portfolio per trade. Keeps you in the game after losses.', keywords: ['position sizing', 'position size', 'risk per trade', 'kelly criterion'], category: 'trading' },
];

const ALL_TOPICS = [...DEPARTMENTS, ...AAVEGOTCHI_TOPICS, ...AARCADE_TOPICS, ...ECO_FINANCE_TOPICS, ...CRYPTO_TRADING_TOPICS];

// Rich, substantive responses for deep topics (returned instead of topic lists)
const RICH_RESPONSES = {
  roadmap: {
    triggers: ['roadmap', 'planning', 'strategy', 'product vision', 'north star', 'okr', 'how to build', 'where to start', 'gotchinopoly roadmap', 'game roadmap', 'lets build', 'lets work on', 'build roadmap'],
    content: `The very first place is defining the **"why"** and **"who"** — everything else flows from there.

Most common realistic starting sequence (outcome-oriented & agile-friendly):

1. **Product vision + North Star** — the 2–5 sentence "why we exist" answer
2. **Business & product objectives** — measurable goals for the next 6–18 months
3. **Deep understanding of users** — actual pain, jobs-to-be-done, feedback data (not just personas)
4. **Strategic themes / problem buckets** — group the big bets
5. **Only then** — collect, score & sequence initiatives into a visual roadmap

You almost never start with features or dates — that's the most common rookie mistake.

**Practical starting workflow**

**Step 0 — Before anything else**  
Answer (in writing, with stakeholders):
- What problem are we really solving?
- For whom? (very narrow at first)
- What does meaningful success look like in 12–24 months?
- What is the one sentence our product exists to achieve?

If you cannot answer these clearly → stop and do discovery first.

**Step 1 — Align on vision, strategy & goals**
- One-page product vision / strategy doc
- 3–5 OKRs or North Star metric + input metrics
- High-level success criteria for the next cycle

**Step 2 — Get grounded in reality**
- Customer interviews / support tickets / churn reasons
- Usage data / funnel drop-off analysis
- Competitive gaps that actually matter
- Internal constraints (money, people, tech debt)

**Step 3 — Turn problems into strategic themes**
Group into 3–6 big themes (not features yet), e.g. "Radical simplification of onboarding", "Multi-player collaboration foundation".

**Step 4 — Prioritize & shape the roadmap**
- **Now** (1–3 months) — high-confidence items
- **Next** (3–9 months) — directional bets
- **Later** (9+ months) — options / moonshots

Use lightweight scoring (RICE, ICE, or forced ranking). Outcome-based or Now–Next–Later roadmaps beat detailed Gantt timelines for most teams.

**For Aarcade / Gotchinopoly:** Use the Journey Builder at /adminbusinessdevelopment/executive to visualize phases and milestones.`,
  },
  gotchi: {
    triggers: ['what is a gotchi', 'what is gotchi', 'what are gotchis', 'explain gotchi', 'tell me about gotchi'],
    content: `A **gotchi** (or Aavegotchi) is your ghost NFT pet in the Aavegotchi ecosystem. Think of it as a collectible character that lives on the Polygon blockchain.

Each gotchi has:
- **Traits** — unique stats that affect gameplay
- **Wearables** — items you can equip (hats, accessories) that change appearance and traits
- **Kinship** — a bond that grows when you interact with your gotchi

You can view and manage your gotchis at **My Aavegotchis** (/myaavegotchis). New gotchis come from **Portals** — unopened portals let you summon and mint a new gotchi with random traits.

Aavegotchi is the broader DeFi-staked NFT gaming protocol; gotchis are the actual ghost pets you collect and play with.`,
  },
  aavegotchi: {
    triggers: ['what is aavegotchi', 'what is aave gotchi', 'explain aavegotchi'],
    content: `**Aavegotchi** is a DeFi-staked NFT gaming protocol on Polygon. It combines NFTs with DeFi: your ghost pets (gotchis) are staked with GHST tokens, making them yield-bearing assets.

Key pieces:
- **Gotchis** — ghost NFT pets with traits, wearables, and kinship
- **GHST** — the ecosystem token (stake, governance, marketplace)
- **Baazaar** — marketplace for gotchis and wearables
- **Games** — play with your gotchis (e.g. on Aarcade: Paarcel, Gotchinopoly)

View your gotchis at /myaavegotchis, stake GHST at /stake, and trade on the Baazaar at /baazaar.`,
  },
  paarcel: {
    triggers: ['how do i play paarcel', 'how to play paarcel', 'what is paarcel', 'paarcel game'],
    content: `**Paarcel** is a game on Aarcade Gh$t. To play:

1. Go to **Games** (/games) and select Paarcel
2. Click **PLAY GAME** or visit /games/paarcel
3. Check the **Manual** for rules and how-to

Connect your wallet to use your gotchis in the game. The Manual link is on the Games page next to each game.`,
  },
  npv: {
    triggers: ['what is npv', 'explain npv', 'how does npv work', 'net present value'],
    content: `**NPV (Net Present Value)** measures whether an investment adds value by discounting future cash flows to today.

**Formula:** NPV = Σ CF_t / (1+r)^t − initial investment

- **CF_t** = cash flow in period t  
- **r** = discount rate (cost of capital)  
- **NPV > 0** → project adds value, accept  
- **NPV < 0** → destroys value, reject  
- **NPV = 0** → break-even

**Example:** Try \`npv -1000 100 100 100 100 100 5%\` — initial outlay $1000, five $100 inflows, 5% discount.`,
  },
  irr: {
    triggers: ['what is irr', 'explain irr', 'internal rate of return'],
    content: `**IRR (Internal Rate of Return)** is the discount rate that makes NPV = 0. It's the "break-even" return.

- Higher IRR = better project (all else equal)  
- Compare IRR to your cost of capital: if IRR > cost, the project adds value  
- Caveat: IRR can mislead with non-conventional cash flows (multiple sign changes)`,
  },
  compound: {
    triggers: ['what is compound interest', 'how does compound interest work', 'explain compounding'],
    content: `**Compound interest** is interest earned on both the principal and previously earned interest.

**Formula:** FV = PV × (1 + r)^n

- **FV** = future value  
- **PV** = present value (principal)  
- **r** = rate per period (e.g. 0.05 for 5%)  
- **n** = number of periods

**Example:** Try \`compound 1000 at 5% for 10 years\` → FV ≈ $1,628.89`,
  },
  supplyDemand: {
    triggers: ['supply and demand', 'how does supply and demand work', 'market equilibrium'],
    content: `**Supply and demand** determine prices in a market.

- **Demand:** quantity buyers want at each price (downward-sloping: lower price → more demand)  
- **Supply:** quantity producers offer at each price (upward-sloping: higher price → more supply)  
- **Equilibrium:** where supply = demand; price and quantity are stable  
- **Price rises** when demand > supply; **price falls** when supply > demand`,
  },
  inflation: {
    triggers: ['what is inflation', 'explain inflation', 'how does inflation work'],
    content: `**Inflation** is a rise in the general price level over time. It reduces purchasing power.

- **Real return** = nominal return − inflation (e.g. 7% nominal − 3% inflation ≈ 4% real)  
- Central banks often target ~2% inflation  
- High inflation erodes savings; deflation can hurt growth`,
  },
  opportunityCost: {
    triggers: ['what is opportunity cost', 'explain opportunity cost'],
    content: `**Opportunity cost** is the value of the next-best alternative you give up when making a choice.

Every decision has an opportunity cost. Example: spending $100 on A means you forgo whatever else you could have done with $100 (B, C, or saving).`,
  },
  roi: {
    triggers: ['what is roi', 'explain roi', 'return on investment'],
    content: `**ROI (Return on Investment)** measures profitability: (Gain − Cost) / Cost × 100%.

**Example:** Invest $1000, get $1500 back → ROI = (1500−1000)/1000 × 100 = **50%**

Try: \`roi 1500 1000\``,
  },
  historicalData: {
    triggers: ['historical data', 'cpi data', 'bitcoin price', 'btc price', 'stock price', 'stock ticker', 'how to get cpi', 'how to get btc', 'inflation history'],
    content: `**Historical data** — try these commands:

• **CPI / Inflation:** \`cpi\` or \`cpi 12\` (needs FRED_API_KEY)
• **Bitcoin / Ethereum:** \`btc\`, \`btc 30\`, \`eth 7\` (no key needed)
• **Stocks:** \`stock: AAPL\`, \`ticker: MSFT\` (needs ALPHAVANTAGE_API_KEY)

Add API keys in Cloudflare → Settings → Environment variables.`,
  },
  dca: {
    triggers: ['what is dca', 'dollar cost averaging', 'explain dca', 'how does dca work', 'dca strategy'],
    content: `**DCA (Dollar-Cost Averaging)** — invest a fixed amount at regular intervals (e.g. $100 every month).

**Why it works:**
- Removes timing risk — you buy more when prices are low, less when high
- Smooths volatility and emotional decisions
- Works well for crypto and volatile assets

**Example:** $100/month for 12 months = $1,200 total. If avg price is $50,000, you'd accumulate 0.024 units.

Try: \`dca 100 12\` or \`dca 100 12 50000\` (amount, periods, optional avg price)`,
  },
  hodl: {
    triggers: ['what is hodl', 'explain hodl', 'hodl strategy', 'buy and hold crypto'],
    content: `**HODL** — Hold On for Dear Life. Buy and hold long-term, ignore short-term volatility.

**Philosophy:** Believe in long-term appreciation; don't try to time the market. Popular in crypto since early Bitcoin days.

**Pros:** Simple, low fees, avoids emotional selling  
**Cons:** No downside protection; requires conviction through drawdowns`,
  },
  rsi: {
    triggers: ['what is rsi', 'explain rsi', 'relative strength index', 'rsi indicator', 'overbought oversold'],
    content: `**RSI (Relative Strength Index)** — momentum oscillator 0–100. Measures speed of price changes.

- **RSI > 70** → overbought (potential sell signal)
- **RSI < 30** → oversold (potential buy signal)
- **RSI = 50** → neutral

**Formula:** RSI = 100 − (100 / (1 + RS)), where RS = avg gain / avg loss over N periods (often 14).

Use with other indicators; RSI can stay overbought/oversold in strong trends.`,
  },
  movingAverages: {
    triggers: ['moving average', 'sma', 'ema', 'golden cross', 'death cross', 'ma crossover'],
    content: `**Moving averages** smooth price data to identify trends.

- **SMA (Simple MA):** Average of last N closing prices
- **EMA (Exponential MA):** Weights recent prices more heavily

**Signals:**
- **Golden cross:** Short MA (e.g. 50) crosses above long MA (e.g. 200) → bullish
- **Death cross:** Short MA crosses below long MA → bearish
- Price above MA = uptrend; below = downtrend`,
  },
  supportResistance: {
    triggers: ['support and resistance', 'support resistance', 'breakout', 'price levels', 'key levels'],
    content: `**Support & resistance** — price levels where buying/selling pressure tends to cluster.

- **Support:** Price floor; buyers step in, demand increases
- **Resistance:** Price ceiling; sellers dominate, supply increases
- **Breakout:** Price breaks through level with conviction → trend change
- **False breakout:** Price pierces level then reverses

Draw levels at prior highs/lows, round numbers, and volume clusters.`,
  },
  stopLoss: {
    triggers: ['stop loss', 'stop-loss', 'stop loss order', 'how to set stop loss'],
    content: `**Stop loss** — pre-set sell order to limit losses. Essential risk management.

**Types:**
- **Fixed %:** Sell if price drops 5–10% from entry
- **ATR-based:** Use Average True Range for volatility-adjusted stops
- **Trailing stop:** Moves up as price rises, locks in gains

**Rule of thumb:** Place stop where your thesis is invalidated, not arbitrary %.`,
  },
  takeProfit: {
    triggers: ['take profit', 'take-profit', 'profit target', 'when to sell', 'exit strategy'],
    content: `**Take profit** — pre-set sell order to lock in gains.

**Strategies:**
- **Fixed target:** Sell at +20%, +50%, etc.
- **Scale out:** Sell 1/3 at +20%, 1/3 at +40%, let rest run
- **Trailing stop:** Let winners run with a moving stop

Pair with stop loss: define risk (stop) and reward (target) before entering.`,
  },
  positionSizing: {
    triggers: ['position sizing', 'position size', 'how much to risk', 'risk per trade', 'kelly criterion'],
    content: `**Position sizing** — how much to risk per trade. Keeps you in the game after losses.

**Rule of thumb:** Risk 1–2% of portfolio per trade. If stop is 10% away, position = (1% × portfolio) / 10%.

**Kelly Criterion:** Optimal bet size = (edge × odds − (1−edge)) / odds. Often use "half Kelly" for safety.

Never risk more than you can afford to lose on a single trade.`,
  },
};

export { DEPARTMENTS, AAVEGOTCHI_TOPICS, AARCADE_TOPICS, ECO_FINANCE_TOPICS, CRYPTO_TRADING_TOPICS, ALL_TOPICS };

export function getReply(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    return 'Ask me about **Aavegotchi** (gotchis, GHST, Baazaar), **Aarcade Gh$t** (games, Paarcel, Gotchinopoly), **Business** (departments, HR, Finance), **Economics & Finance** (NPV, IRR, ROI), or **Crypto & Trading** (DCA, HODL, RSI, stop loss).\n\nTry: "What is a gotchi?" • "What is DCA?" • "dca 100 12 50000" • "btc 30"';
  }

  // Check for rich responses first (substantive content over topic lists)
  for (const [, config] of Object.entries(RICH_RESPONSES)) {
    if (config.triggers.some((t) => q.includes(t))) {
      return config.content;
    }
  }

  // Basic math: "4 + 4", "what is 5 * 3", "10 - 2", etc.
  const mathMatch = q.match(/(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)/);
  if (mathMatch) {
    const [, a, op, b] = mathMatch;
    const x = parseFloat(a);
    const y = parseFloat(b);
    let result;
    if (op === '+') result = x + y;
    else if (op === '-') result = x - y;
    else if (op === '*') result = x * y;
    else if (op === '/') result = y === 0 ? 'undefined (divide by zero)' : x / y;
    return `**${x} ${op} ${y} = ${result}**`;
  }

  // Statistics: "mean of 1, 2, 3" or "1 2 3 4 5 std"
  const statsMatch = q.match(/(?:mean|average|median|mode|std|standard\s*deviation|variance|sum|min|max)\s+(?:of\s+)?([\d\s,.\-]+)/i) ||
    q.match(/([\d\s,.\-]+)\s+(?:mean|average|median|std|variance|sum|min|max)/i);
  if (statsMatch) {
    const numStr = statsMatch[1];
    const nums = numStr.match(/-?\d+(?:\.\d+)?/g)?.map(Number).filter((n) => !Number.isNaN(n)) || [];
    if (nums.length > 0) {
      const statMatch = q.match(/(mean|average|median|mode|std|standard\s*deviation|variance|sum|min|max)/i);
      const stat = (statMatch ? statMatch[1] : '').toLowerCase().replace(/\s+/g, '');
      let result, label;
      try {
        if (stat.includes('mean') || stat.includes('average')) {
          result = math.mean(nums);
          label = 'Mean';
        } else if (stat.includes('median')) {
          result = math.median(nums);
          label = 'Median';
        } else if (stat.includes('mode')) {
          result = math.mode(nums);
          label = 'Mode';
          if (Array.isArray(result)) result = result.join(', ');
        } else if (stat.includes('std') || stat.includes('standarddeviation')) {
          result = math.std(nums);
          label = 'Standard deviation';
        } else if (stat.includes('variance')) {
          result = math.var(nums);
          label = 'Variance';
        } else if (stat.includes('sum')) {
          result = math.sum(nums);
          label = 'Sum';
        } else if (stat.includes('min')) {
          result = math.min(nums);
          label = 'Min';
        } else if (stat.includes('max')) {
          result = math.max(nums);
          label = 'Max';
        } else {
          result = math.mean(nums);
          label = 'Mean';
        }
        const arrStr = nums.length > 10 ? `[${nums.slice(0, 5).join(', ')}... (${nums.length} numbers)]` : `[${nums.join(', ')}]`;
        return `**${label}** of ${arrStr} = **${typeof result === 'number' ? Math.round(result * 1e10) / 1e10 : result}**`;
      } catch (err) {
        return `Could not compute: ${err.message}`;
      }
    }
  }

  // Calculus: derivative
  const derivMatch = q.match(/(?:derivative|d\/dx|d\/d\w)\s+(?:of\s+)?(.+)/i) || q.match(/(.+)\s+(?:derivative|d\/dx)/i);
  if (derivMatch) {
    const expr = derivMatch[1].trim().replace(/\s+/g, '');
    if (expr && !expr.match(/^(what|how|list|search|summarize|rewrite)/i)) {
      try {
        const d = math.derivative(expr, 'x');
        return `**d/dx** (${expr}) = **${d.toString()}**`;
      } catch (err) {
        return `Could not compute derivative: ${err.message}`;
      }
    }
  }

  // Calculus: integral (definite, numerical)
  const integralMatch = q.match(/(?:integral|integrate)\s+(?:of\s+)?(.+?)\s+from\s+([\d.\-]+)\s+to\s+([\d.\-]+)/i) || q.match(/(?:integral|integrate)\s+(?:of\s+)?(.+)/i);
  if (integralMatch) {
    const expr = integralMatch[1].trim().replace(/\s+/g, '');
    const a = integralMatch[2] != null && integralMatch[3] != null ? parseFloat(integralMatch[2]) : 0;
    const b = integralMatch[2] != null && integralMatch[3] != null ? parseFloat(integralMatch[3]) : 1;
    if (expr && !expr.match(/^(what|how|list|search|summarize|rewrite)/i)) {
      try {
        const node = math.parse(expr);
        const scope = { x: 0 };
        const step = 0.001;
        let sum = 0;
        for (let x = a; x < b; x += step) {
          scope.x = x;
          sum += node.evaluate(scope) * step;
        }
        return `**∫** ${expr} dx from ${a} to ${b} ≈ **${sum.toFixed(6)}**`;
      } catch (err) {
        return `Could not compute integral: ${err.message}`;
      }
    }
  }

  // Finance: compound interest / FV — "compound 1000 at 5% for 10 years" or "fv 1000 5% 10"
  const compoundMatch = q.match(/(?:compound|fv|future\s*value)\s+(\d+(?:\.\d+)?)\s+(?:at\s+)?(\d+(?:\.\d+)?)\s*%\s*(?:for\s+)?(\d+(?:\.\d+)?)\s*(?:years?|periods?)?/i) ||
    q.match(/(?:compound|fv)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)/i);
  if (compoundMatch) {
    const pv = parseFloat(compoundMatch[1]);
    const r = parseFloat(compoundMatch[2]) / 100;
    const n = parseFloat(compoundMatch[3]);
    const fv = pv * Math.pow(1 + r, n);
    return `**FV** = ${pv} × (1 + ${compoundMatch[2]}%)^${n} = **$${fv.toFixed(2)}**`;
  }

  // Finance: PV — "pv 1000 at 5% in 10 years" or "present value of 1000 at 5% in 10"
  const pvMatch = q.match(/(?:pv|present\s*value)\s+(?:of\s+)?(\d+(?:\.\d+)?)\s+(?:at\s+)?(\d+(?:\.\d+)?)\s*%\s*(?:in\s+)?(\d+(?:\.\d+)?)\s*(?:years?|periods?)?/i) ||
    q.match(/(?:pv)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)/i);
  if (pvMatch) {
    const fv = parseFloat(pvMatch[1]);
    const r = parseFloat(pvMatch[2]) / 100;
    const n = parseFloat(pvMatch[3]);
    const pv = fv / Math.pow(1 + r, n);
    return `**PV** = ${fv} / (1 + ${pvMatch[2]}%)^${n} = **$${pv.toFixed(2)}**`;
  }

  // Finance: NPV — "npv -1000 100 100 100 100 100 5%" or "npv -1000 100 100 100 100 100"
  const npvMatch = q.match(/(?:npv|net\s*present\s*value)\s+([\d.\-\s,]+?)(?:\s+(\d+(?:\.\d+)?)\s*%)?\s*$/i);
  if (npvMatch) {
    const nums = npvMatch[1].match(/-?\d+(?:\.\d+)?/g)?.map(Number).filter((n) => !Number.isNaN(n)) || [];
    const rateStr = npvMatch[2];
    const r = rateStr ? parseFloat(rateStr) / 100 : 0.1;
    if (nums.length >= 2) {
      let npv = 0;
      for (let t = 0; t < nums.length; t++) {
        npv += nums[t] / Math.pow(1 + r, t);
      }
      return `**NPV** (r=${rateStr || '10'}%) = **$${npv.toFixed(2)}** ${npv >= 0 ? '(accept)' : '(reject)'}`;
    }
  }

  // Finance: ROI — "roi 1500 1000" or "roi gain cost"
  const roiMatch = q.match(/(?:roi|return\s*on\s*investment)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/i);
  if (roiMatch) {
    const gain = parseFloat(roiMatch[1]);
    const cost = parseFloat(roiMatch[2]);
    if (cost !== 0) {
      const roi = ((gain - cost) / cost) * 100;
      return `**ROI** = (${gain} − ${cost}) / ${cost} × 100 = **${roi.toFixed(1)}%**`;
    }
  }

  // Trading: DCA — "dca 100 12" or "dca 100 monthly for 12 at 50000"
  const dcaMatch = q.match(/(?:dca|dollar\s*cost\s*averaging)\s+(\d+(?:\.\d+)?)\s+(?:monthly\s+for\s+)?(\d+)(?:\s+at\s+(\d+(?:\.\d+)?))?/i) ||
    q.match(/(?:dca)\s+(\d+(?:\.\d+)?)\s+(\d+)(?:\s+(\d+(?:\.\d+)?))?/i);
  if (dcaMatch) {
    const amount = parseFloat(dcaMatch[1]);
    const periods = parseInt(dcaMatch[2], 10);
    const avgPrice = dcaMatch[3] ? parseFloat(dcaMatch[3]) : null;
    const total = amount * periods;
    if (periods > 0 && amount > 0) {
      let out = `**DCA** — $${amount}/period × ${periods} periods = **$${total.toLocaleString()}** total invested`;
      if (avgPrice && avgPrice > 0) {
        const units = total / avgPrice;
        out += `\nAt avg price $${avgPrice.toLocaleString()}: **${units.toFixed(6)}** units acquired`;
      }
      return out;
    }
  }

  // Trading: RSI — "rsi 45 46 44 47 43 48 42 49 41 50 40 51 39 52 38" (14+ prices)
  const rsiMatch = q.match(/(?:rsi|relative\s*strength)\s+(?:of\s+)?([\d\s,.\-]+)/i) || q.match(/([\d\s,.\-]+)\s+rsi/i);
  if (rsiMatch) {
    const numStr = rsiMatch[1];
    const prices = numStr.match(/-?\d+(?:\.\d+)?/g)?.map(Number).filter((n) => !Number.isNaN(n)) || [];
    if (prices.length >= 14) {
      const period = 14;
      const changes = [];
      for (let i = 1; i < prices.length; i++) changes.push(prices[i] - prices[i - 1]);
      const recent = changes.slice(-period);
      const gains = recent.filter((c) => c > 0);
      const losses = recent.filter((c) => c < 0).map((c) => -c);
      const avgGain = gains.length ? gains.reduce((a, b) => a + b, 0) / period : 0;
      const avgLoss = losses.length ? losses.reduce((a, b) => a + b, 0) / period : 0;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);
      return `**RSI(${period})** = **${rsi.toFixed(1)}** ${rsi > 70 ? '(overbought)' : rsi < 30 ? '(oversold)' : '(neutral)'}`;
    }
  }

  const listPatterns = ['list', 'all', 'show', 'what are', 'which', 'overview', 'help', 'topics'];
  const isList = listPatterns.some((p) => q.includes(p));

  if (isList) {
    const byCategory = {};
    for (const t of ALL_TOPICS) {
      const cat = t.category || 'other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(t);
    }
    const catNames = { aavegotchi: 'Aavegotchi Ecosystem', aarcade: 'Aarcade Gh$t', business: 'Business (Admin)', finance: 'Finance & Economics', economics: 'Economics', trading: 'Crypto & Trading' };
    let out = 'Here\'s what I can help with:\n\n';
    for (const [cat, topics] of Object.entries(byCategory)) {
      out += `**${catNames[cat] || cat}**\n`;
      for (const t of topics) {
        out += `• ${t.title} (${t.path})\n`;
      }
      out += '\n';
    }
    out += 'Ask about any topic for more details.';
    return out;
  }

  const matched = [];
  for (const t of ALL_TOPICS) {
    const titleLower = (t.title || '').toLowerCase();
    const match = t.keywords.some((k) => q.includes(k)) ||
      q.includes(t.id) ||
      (titleLower && q.includes(titleLower));
    if (match) matched.push(t);
  }

  if (matched.length === 1) {
    const d = matched[0];
    return `**${d.title}**\n\n${d.description}\n\n→ ${d.path}`;
  }
  if (matched.length > 1) {
    const primary = matched[0];
    let out = `**${primary.title}**\n\n${primary.description}`;
    if (matched.length === 2) {
      out += `\n\nRelated: **${matched[1].title}** — ${matched[1].description}`;
    } else {
      out += `\n\nRelated: ${matched.slice(1).map((m) => `**${m.title}** (${m.path})`).join(', ')}`;
    }
    out += `\n\n→ ${primary.path}`;
    return out;
  }

  return `I couldn't find a specific match. Try:\n• "What is a gotchi?"\n• "What is DCA?" • "dca 100 12 50000"\n• "btc 30" • "stock: AAPL"\n• "compound 1000 at 5% for 10 years"\n• "roi 1500 1000"\n• "List all topics"`;
}
