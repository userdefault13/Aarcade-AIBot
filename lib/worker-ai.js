/**
 * Shared logic for Department WorkerAI (used by Cloudflare Function and dev server)
 */
export const DEPARTMENTS = [
  { id: 'executive', title: 'Executive / Leadership', path: '/adminbusinessdevelopment/executive', description: 'C-suite and general management tools. Board view and Journey Builder for strategic planning.', keywords: ['executive', 'leadership', 'ceo', 'c-suite', 'management', 'board', 'journey'] },
  { id: 'hr', title: 'Human Resources', path: '/adminbusinessdevelopment/hr', description: 'Recruitment, onboarding, and HR operations. Kanban board for HR tasks.', keywords: ['hr', 'human resources', 'recruitment', 'hiring', 'onboarding', 'people', 'employees'] },
  { id: 'finance', title: 'Finance / Accounting', path: '/adminbusinessdevelopment/finance', description: 'Financial reporting and accounting. Track incomes, expenses, and cash flow.', keywords: ['finance', 'accounting', 'money', 'budget', 'revenue', 'expenses', 'cash flow'] },
  { id: 'marketing', title: 'Marketing', path: '/adminbusinessdevelopment/marketing', description: 'Campaigns, analytics, and brand. Marketing pipeline and content creation.', keywords: ['marketing', 'campaigns', 'brand', 'ads', 'analytics'] },
  { id: 'sales', title: 'Sales', path: '/adminbusinessdevelopment/sales', description: 'Pipeline, CRM, and sales operations. Track deals and customer relationships.', keywords: ['sales', 'pipeline', 'crm', 'deals', 'revenue'] },
  { id: 'operations', title: 'Operations', path: '/adminbusinessdevelopment/operations', description: 'Process and operational tools. Day-to-day tasks and process documentation.', keywords: ['operations', 'ops', 'process', 'tasks', 'kpis'] },
  { id: 'communications', title: 'Communications', path: '/adminbusinessdevelopment/communications', description: 'Internal and external communications. Content creation and comms pipeline.', keywords: ['communications', 'comms', 'content', 'internal', 'external'] },
  { id: 'it', title: 'IT', path: '/adminbusinessdevelopment/it', description: 'Technology and infrastructure. Board, Boo-Jam (workflow builder), and Mermaid diagram tools.', keywords: ['it', 'technology', 'tech', 'infrastructure', 'boo-jam', 'mermaid'] },
];

export function getReply(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return 'Ask me anything about the 8 departments: Executive, HR, Finance, Marketing, Sales, Operations, Communications, and IT.';

  const listPatterns = ['list', 'all', 'show', 'what are', 'which', 'departments', 'overview'];
  const isList = listPatterns.some((p) => q.includes(p)) || q === 'departments' || q.length < 10;

  if (isList) {
    const lines = DEPARTMENTS.map((d) => `• **${d.title}** – ${d.description}\n  Path: ${d.path}`).join('\n\n');
    return `Here are all 8 departments:\n\n${lines}`;
  }

  const matched = [];
  for (const dept of DEPARTMENTS) {
    if (dept.keywords.some((k) => q.includes(k)) || q.includes(dept.id) || q.includes(dept.title.toLowerCase())) {
      matched.push(dept);
    }
  }

  if (matched.length === 1) {
    const d = matched[0];
    return `**${d.title}**\n\n${d.description}\n\nPath: ${d.path}`;
  }
  if (matched.length > 1) {
    const lines = matched.map((d) => `• ${d.title} (${d.path})`).join('\n');
    return `Found ${matched.length} relevant departments:\n\n${lines}`;
  }

  return `I couldn't find a specific match. Try asking about:\n• "List all departments"\n• "What is IT?"\n• "Tell me about Finance"\n• "HR tools"`;
}
