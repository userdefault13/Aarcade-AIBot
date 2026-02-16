/**
 * Shared logic for Aarcade Assistant (Aavegotchi, AarcadeGhst, Business)
 * Used by Cloudflare Function and dev server
 */

// Business Development departments (admin)
const DEPARTMENTS = [
  { id: 'executive', title: 'Executive / Leadership', path: '/adminbusinessdevelopment/executive', description: 'C-suite and general management tools. Board view and Journey Builder for strategic planning.', keywords: ['executive', 'leadership', 'ceo', 'c-suite', 'management', 'board', 'journey'], category: 'business' },
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
  { id: 'gotchinopoly', title: 'Gotchinopoly', path: '/games/gotchinopoly', description: 'Gotchinopoly is a Monopoly-style game on Aarcade. Play at /games/gotchinopoly.', keywords: ['gotchinopoly', 'monopoly', 'game'], category: 'aarcade' },
  { id: 'leaderboard', title: 'Leaderboard', path: '/leaderboard', description: 'View game scores and rankings on the Leaderboard. Compete with other players.', keywords: ['leaderboard', 'scores', 'rankings', 'compete'], category: 'aarcade' },
  { id: 'player-profile', title: 'Player Profile', path: '/player', description: 'View your player profile and stats. Connect your wallet to see your gotchis and game history.', keywords: ['profile', 'player', 'stats', 'account'], category: 'aarcade' },
  { id: 'manuals', title: 'Game Manuals', path: '/manuals', description: 'Read game manuals and how-to guides. Each game has a Manual link on the Games page.', keywords: ['manual', 'manuals', 'guide', 'how to', 'rules'], category: 'aarcade' },
  { id: 'play', title: 'Play', path: '/play', description: 'Quick access to play games. Use the Play link or visit /games to choose a game.', keywords: ['play', 'quick play'], category: 'aarcade' },
  { id: 'chat', title: 'Chat / Messages', path: '/', description: 'Chat with the team using the chat widget (bottom-right). Send messages and get support.', keywords: ['chat', 'message', 'support', 'help', 'contact'], category: 'aarcade' },
];

const ALL_TOPICS = [...DEPARTMENTS, ...AAVEGOTCHI_TOPICS, ...AARCADE_TOPICS];

export { DEPARTMENTS, AAVEGOTCHI_TOPICS, AARCADE_TOPICS, ALL_TOPICS };

export function getReply(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    return 'Ask me about **Aavegotchi** (gotchis, GHST, Baazaar, staking), **Aarcade Gh$t** (games, Paarcel, Gotchinopoly, leaderboard), or **Business** (departments, HR, Finance, IT).\n\nTry: "What is a gotchi?" or "How do I play Paarcel?" or "List all departments"';
  }

  const listPatterns = ['list', 'all', 'show', 'what are', 'which', 'overview', 'help', 'topics'];
  const isList = listPatterns.some((p) => q.includes(p)) || q.length < 8;

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
    return `**${d.title}**\n\n${d.description}\n\nPath: ${d.path}`;
  }
  if (matched.length > 1) {
    const lines = matched.map((d) => `• ${d.title} (${d.path})`).join('\n');
    return `Found ${matched.length} relevant topics:\n\n${lines}`;
  }

  return `I couldn't find a specific match. Try:\n• "What is a gotchi?"\n• "How do I play Paarcel?"\n• "List all departments"\n• "Baazaar" or "GHST" or "leaderboard"`;
}
