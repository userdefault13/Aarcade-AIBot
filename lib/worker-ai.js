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

const ALL_TOPICS = [...DEPARTMENTS, ...AAVEGOTCHI_TOPICS, ...AARCADE_TOPICS];

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
};

export { DEPARTMENTS, AAVEGOTCHI_TOPICS, AARCADE_TOPICS, ALL_TOPICS };

export function getReply(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    return 'Ask me about **Aavegotchi** (gotchis, GHST, Baazaar, staking), **Aarcade Gh$t** (games, Paarcel, Gotchinopoly, leaderboard), or **Business** (departments, HR, Finance, IT).\n\nTry: "What is a gotchi?" or "How do I play Paarcel?" or "List all departments"';
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

  const listPatterns = ['list', 'all', 'show', 'what are', 'which', 'overview', 'help', 'topics'];
  const isList = listPatterns.some((p) => q.includes(p));

  if (isList) {
    const byCategory = {};
    for (const t of ALL_TOPICS) {
      const cat = t.category || 'other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(t);
    }
    const catNames = { aavegotchi: 'Aavegotchi Ecosystem', aarcade: 'Aarcade Gh$t', business: 'Business (Admin)' };
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
    // Conversational answer: combine descriptions instead of listing
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

  return `I couldn't find a specific match. Try:\n• "What is a gotchi?"\n• "How do I play Paarcel?"\n• "mean of 1, 2, 3, 4, 5"\n• "derivative of x^2"\n• "integral of x^2 from 0 to 1"\n• "List all departments"`;
}
