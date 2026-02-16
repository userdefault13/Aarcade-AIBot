<template>
  <div :class="$style.app">
    <header :class="$style.header">
      <h1 :class="$style.title">AI BOT ADMIN</h1>
      <p :class="$style.subtitle">Health, tools, and skills overview</p>
    </header>

    <main :class="$style.main">
      <!-- Health Section -->
      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">HEALTH</h2>
        <div v-if="healthLoading" :class="$style.loading">Loading health...</div>
        <div v-else-if="healthError" :class="$style.error">{{ healthError }}</div>
        <div v-else :class="$style.healthGrid">
          <div :class="[$style.card, $style.healthCard]">
            <span :class="$style.cardLabel">Status</span>
            <span :class="[$style.cardValue, $style['status' + (health?.status || 'unknown')]]">
              {{ health?.status || '—' }}
            </span>
          </div>
          <div :class="[$style.card, $style.healthCard]">
            <span :class="$style.cardLabel">Timestamp</span>
            <span :class="$style.cardValue">{{ formatTime(health?.timestamp) }}</span>
          </div>
          <div :class="$style.checksList">
            <span :class="$style.cardLabel">Checks</span>
            <div :class="$style.checkRow" v-for="(check, key) in health?.checks" :key="key">
              <span :class="$style.checkName">{{ key }}</span>
              <span :class="check.ok ? $style.checkOk : $style.checkFail">{{ check.ok ? '✓' : '✗' }}</span>
            </div>
          </div>
        </div>
        <button :class="$style.refreshBtn" @click="fetchHealth" :disabled="healthLoading">Refresh</button>
      </section>

      <!-- Tools Overview Section -->
      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">TOOLS & SKILLS</h2>
        <div v-if="toolsLoading" :class="$style.loading">Loading tools...</div>
        <div v-else-if="toolsError" :class="$style.error">{{ toolsError }}</div>
        <div v-else :class="$style.toolsOverview">
          <div :class="$style.toolGroup">
            <h3 :class="$style.groupTitle">Topics ({{ tools?.topics?.length ?? 0 }})</h3>
            <div :class="$style.toolList">
              <div v-for="t in (tools?.topics ?? []).slice(0, 10)" :key="t.id" :class="$style.toolItem">
                <span :class="$style.toolId">{{ t.id }}</span>
                <span :class="$style.toolTitle">{{ t.title }}</span>
              </div>
              <div v-if="(tools?.topics?.length ?? 0) > 10" :class="$style.toolItem">
                <span :class="$style.toolMore">+{{ (tools?.topics?.length ?? 0) - 10 }} more</span>
              </div>
            </div>
          </div>
          <div :class="$style.toolGroup">
            <h3 :class="$style.groupTitle">Rich Responses ({{ tools?.richResponses?.length ?? 0 }})</h3>
            <div :class="$style.toolList">
              <div v-for="r in (tools?.richResponses ?? []).slice(0, 5)" :key="r.id" :class="$style.toolItem">
                <span :class="$style.toolId">{{ r.id }}</span>
              </div>
              <div v-if="(tools?.richResponses?.length ?? 0) > 5" :class="$style.toolItem">
                <span :class="$style.toolMore">+{{ (tools?.richResponses?.length ?? 0) - 5 }} more</span>
              </div>
            </div>
          </div>
          <div :class="$style.toolGroup">
            <h3 :class="$style.groupTitle">Capabilities</h3>
            <div :class="$style.toolList">
              <div v-for="c in (tools?.capabilities ?? [])" :key="c.id" :class="$style.toolItem">
                <span :class="$style.toolId">{{ c.id }}</span>
                <span :class="$style.toolTitle">{{ c.name }}</span>
                <span :class="c.enabled ? $style.checkOk : $style.checkFail">{{ c.enabled ? '✓' : '✗' }}</span>
              </div>
            </div>
          </div>
          <div :class="$style.toolGroup" v-if="(tools?.customTools?.length ?? 0) > 0">
            <h3 :class="$style.groupTitle">Custom Tools ({{ tools?.customTools?.length ?? 0 }})</h3>
            <div :class="$style.toolList">
              <div v-for="t in tools?.customTools" :key="t.id" :class="$style.toolItem">
                <span :class="$style.toolId">{{ t.id }}</span>
                <span :class="$style.toolTitle">{{ t.title || t.id }}</span>
              </div>
            </div>
          </div>
        </div>
        <button :class="$style.refreshBtn" @click="fetchTools" :disabled="toolsLoading">Refresh</button>
      </section>

      <!-- Add Tool Form -->
      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">ADD NEW TOOL</h2>
        <p :class="$style.helpText">Add the generated JSON to custom-tools.json in the AI bot repo and redeploy.</p>
        <div :class="$style.form">
          <div :class="$style.formRow">
            <label>ID</label>
            <input v-model="newTool.id" placeholder="my-tool" />
          </div>
          <div :class="$style.formRow">
            <label>Title</label>
            <input v-model="newTool.title" placeholder="My Tool" />
          </div>
          <div :class="$style.formRow">
            <label>Description</label>
            <input v-model="newTool.description" placeholder="What this tool does" />
          </div>
          <div :class="$style.formRow">
            <label>Keywords (comma-separated)</label>
            <input v-model="newTool.keywordsStr" placeholder="keyword1, keyword2" />
          </div>
          <div :class="$style.formRow">
            <label>Category</label>
            <input v-model="newTool.category" placeholder="custom" />
          </div>
          <div :class="$style.formRow">
            <label>Path</label>
            <input v-model="newTool.path" placeholder="/" />
          </div>
          <div :class="$style.formRow">
            <label>Triggers (comma-separated, for rich response)</label>
            <input v-model="newTool.triggersStr" placeholder="trigger1, trigger2" />
          </div>
          <div :class="$style.formRow">
            <label>Content (for rich response)</label>
            <textarea v-model="newTool.content" placeholder="Full response content..." rows="3"></textarea>
          </div>
          <div :class="$style.formActions">
            <button :class="$style.primaryBtn" @click="generateTool">Generate JSON</button>
          </div>
        </div>
        <div v-if="generatedJson" :class="$style.outputBox">
          <pre :class="$style.pre">{{ generatedJson }}</pre>
          <div :class="$style.outputActions">
            <button :class="$style.secondaryBtn" @click="copyToClipboard">Copy to clipboard</button>
            <button :class="$style.secondaryBtn" @click="downloadJson">Download custom-tools.json</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const baseUrl = import.meta.env.VITE_AI_BOT_URL || '';

const health = ref(null);
const healthLoading = ref(false);
const healthError = ref('');

const tools = ref(null);
const toolsLoading = ref(false);
const toolsError = ref('');

const newTool = ref({
  id: '',
  title: '',
  description: '',
  keywordsStr: '',
  category: 'custom',
  path: '/',
  triggersStr: '',
  content: '',
});

const generatedJson = ref('');

function formatTime(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

async function fetchHealth() {
  if (!baseUrl) {
    healthError.value = 'Set VITE_AI_BOT_URL in env';
    return;
  }
  healthLoading.value = true;
  healthError.value = '';
  try {
    const res = await fetch(`${baseUrl}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    health.value = await res.json();
  } catch (err) {
    healthError.value = err?.message || 'Failed to fetch health';
    health.value = null;
  } finally {
    healthLoading.value = false;
  }
}

async function fetchTools() {
  if (!baseUrl) {
    toolsError.value = 'Set VITE_AI_BOT_URL in env';
    return;
  }
  toolsLoading.value = true;
  toolsError.value = '';
  try {
    const res = await fetch(`${baseUrl}/api/tools`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    tools.value = await res.json();
  } catch (err) {
    toolsError.value = err?.message || 'Failed to fetch tools';
    tools.value = null;
  } finally {
    toolsLoading.value = false;
  }
}

function generateTool() {
  const t = newTool.value;
  const keywords = t.keywordsStr
    ? t.keywordsStr.split(',').map((k) => k.trim()).filter(Boolean)
    : [];
  const triggers = t.triggersStr
    ? t.triggersStr.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  const tool = {
    id: t.id || 'custom-tool',
    title: t.title || t.id,
    description: t.description || '',
    keywords,
    category: t.category || 'custom',
    path: t.path || '/',
  };

  if (triggers.length && t.content) {
    tool.triggers = triggers;
    tool.content = t.content;
  }

  generatedJson.value = JSON.stringify([tool], null, 2);
}

function copyToClipboard() {
  if (!generatedJson.value) return;
  navigator.clipboard.writeText(generatedJson.value);
}

function downloadJson() {
  if (!generatedJson.value) return;
  const blob = new Blob([generatedJson.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom-tools.json';
  a.click();
  URL.revokeObjectURL(url);
}

onMounted(() => {
  fetchHealth();
  fetchTools();
});
</script>

<style module>
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a0a2e 0%, #2E1E5C 50%, #1a0a2e 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1.5rem 1.25rem;
  border-bottom: 2px solid rgba(139, 87, 255, 0.4);
}

.title {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.65rem;
  margin: 0 0 0.25rem 0;
  color: #A78BFA;
}

.subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.main {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem 1rem;
}

.section {
  background: rgba(139, 87, 255, 0.1);
  border: 2px solid rgba(139, 87, 255, 0.3);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.sectionTitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  color: #A78BFA;
  margin: 0 0 1rem 0;
}

.loading,
.error {
  font-size: 0.85rem;
  color: #9CA3AF;
  margin-bottom: 0.75rem;
}

.error {
  color: #F87171;
}

.healthGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: rgba(139, 87, 255, 0.2);
  border: 2px solid rgba(139, 87, 255, 0.4);
  border-radius: 4px;
  padding: 0.75rem;
}

.cardLabel {
  display: block;
  font-size: 0.65rem;
  color: #9CA3AF;
  margin-bottom: 0.25rem;
}

.cardValue {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  color: #fff;
}

.statusok {
  color: #34D399;
}

.statusdegraded {
  color: #FBBF24;
}

.statuserror {
  color: #F87171;
}

.statusunknown {
  color: #9CA3AF;
}

.checksList {
  grid-column: 1 / -1;
}

.checkRow {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.75rem;
}

.checkName {
  text-transform: capitalize;
}

.checkOk {
  color: #34D399;
}

.checkFail {
  color: #F87171;
}

.refreshBtn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.4rem;
  padding: 0.5rem 1rem;
  background: rgba(139, 87, 255, 0.3);
  border: 2px solid #8B57FF;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.refreshBtn:hover:not(:disabled) {
  background: rgba(139, 87, 255, 0.5);
}

.refreshBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolsOverview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.toolGroup {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0.75rem;
}

.groupTitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.4rem;
  color: #A78BFA;
  margin: 0 0 0.5rem 0;
}

.toolList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toolItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background: rgba(139, 87, 255, 0.2);
  border-radius: 4px;
}

.toolId {
  color: #9CA3AF;
}

.toolTitle {
  color: #fff;
}

.toolMore {
  color: #A78BFA;
  font-size: 0.65rem;
}

.helpText {
  font-size: 0.75rem;
  color: #9CA3AF;
  margin: 0 0 1rem 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.formRow {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.formRow label {
  font-size: 0.7rem;
  color: #A78BFA;
}

.formRow input,
.formRow textarea {
  padding: 0.5rem;
  border: 2px solid rgba(139, 87, 255, 0.4);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-family: inherit;
}

.formRow textarea {
  resize: vertical;
  min-height: 60px;
}

.formActions {
  margin-top: 0.5rem;
}

.primaryBtn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.4rem;
  padding: 0.6rem 1.25rem;
  background: #8B57FF;
  border: 2px solid #8B57FF;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.primaryBtn:hover {
  background: #9F6FFF;
}

.outputBox {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(139, 87, 255, 0.4);
  border-radius: 4px;
}

.pre {
  font-size: 0.65rem;
  color: #A78BFA;
  overflow-x: auto;
  margin: 0 0 1rem 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.outputActions {
  display: flex;
  gap: 0.5rem;
}

.secondaryBtn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.35rem;
  padding: 0.4rem 0.75rem;
  background: rgba(139, 87, 255, 0.3);
  border: 2px solid #8B57FF;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.secondaryBtn:hover {
  background: rgba(139, 87, 255, 0.5);
}
</style>
