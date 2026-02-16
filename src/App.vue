<template>
  <div :class="$style.app">
    <header :class="$style.header">
      <div :class="$style.headerInner">
        <div :class="$style.avatar">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h1 :class="$style.title">Aarcade Assistant</h1>
          <p :class="$style.subtitle">Hi! Ask me anything about Aavegotchi, games, or business.</p>
        </div>
      </div>
    </header>

    <main :class="$style.main">
      <div ref="messagesContainer" :class="$style.messages">
        <!-- Welcome message (shown when empty) -->
        <div v-if="messages.length === 0" :class="$style.welcome">
          <div :class="[$style.bubble, $style.bubbleAssistant]">
            <p :class="$style.bubbleContent">Hi! I'm the Aarcade Assistant. I can help with:</p>
            <ul :class="$style.welcomeList">
              <li><strong>Aavegotchi</strong> – gotchis, GHST, Baazaar, staking</li>
              <li><strong>Aarcade games</strong> – Paarcel, Gotchinopoly</li>
              <li><strong>Business</strong> – departments, roadmap, Journey Builder</li>
            </ul>
            <p :class="$style.welcomeHint">Try a question below or type your own:</p>
            <div :class="$style.chips">
              <button
                v-for="q in quickReplies"
                :key="q"
                :class="$style.chip"
                @click="sendQuickReply(q)"
              >
                {{ q }}
              </button>
            </div>
          </div>
        </div>
        <div v-else :class="$style.messageList">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="[$style.messageRow, msg.role === 'user' ? $style.messageRight : $style.messageLeft]"
          >
            <div v-if="msg.role === 'assistant'" :class="$style.msgAvatar">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div
              :class="[
                $style.bubble,
                msg.role === 'user' ? $style.bubbleUser : $style.bubbleAssistant
              ]"
            >
              <p v-if="msg.content === '...'" :class="$style.typing">
                <span></span><span></span><span></span>
              </p>
              <p v-else :class="$style.bubbleContent" v-html="formatReply(msg.content)"></p>
            </div>
          </div>
        </div>
      </div>

      <div :class="$style.inputArea">
        <div :class="$style.sendRow">
          <input
            v-model="messageInput"
            type="text"
            placeholder="Ask about Aavegotchi, games, or business..."
            :class="$style.input"
            :disabled="sending"
            @keydown="handleKeydown"
          />
          <button
            :class="$style.sendBtn"
            :disabled="!messageInput.trim() || sending"
            @click="sendMessage"
          >
            <svg v-if="!sending" :class="$style.sendIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <svg v-else :class="[$style.sendIcon, $style.spin]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const messages = ref([]);
const messageInput = ref('');
const sending = ref(false);
const messagesContainer = ref(null);

const quickReplies = [
  'What is a gotchi?',
  'How do I play Paarcel?',
  'Gotchinopoly roadmap',
  'List all topics',
];

function sendQuickReply(q) {
  messageInput.value = q;
  sendMessage();
}

function formatReply(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function handleKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

async function sendMessage() {
  const content = messageInput.value.trim();
  if (!content || sending.value) return;

  messageInput.value = '';
  sending.value = true;

  messages.value.push({ role: 'user', content });
  messages.value.push({ role: 'assistant', content: '...' });
  nextTick(() => scrollToBottom());

  try {
    const res = await fetch('/api/worker-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: content }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    const reply = data.reply || '';

    const last = messages.value[messages.value.length - 1];
    if (last?.role === 'assistant') last.content = reply;
  } catch (err) {
    const last = messages.value[messages.value.length - 1];
    if (last?.role === 'assistant') last.content = err?.message || 'Failed to get a response. Please try again.';
  } finally {
    sending.value = false;
    nextTick(() => scrollToBottom());
  }
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}
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
  padding: 1rem 1.25rem;
  border-bottom: 2px solid rgba(139, 87, 255, 0.4);
}

.headerInner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 42rem;
  margin: 0 auto;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(139, 87, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar svg {
  width: 22px;
  height: 22px;
  color: #A78BFA;
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
  display: flex;
  flex-direction: column;
  max-width: 42rem;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.welcome {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.welcomeList {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.welcomeList li {
  margin-bottom: 0.25rem;
}

.welcomeHint {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.75rem 0 0.5rem 0;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.chip {
  padding: 0.5rem 0.9rem;
  background: rgba(109, 24, 248, 0.4);
  border: 1px solid rgba(139, 87, 255, 0.6);
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.chip:hover {
  background: rgba(109, 24, 248, 0.6);
  border-color: rgba(139, 87, 255, 0.9);
}

.msgAvatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(139, 87, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-end;
}

.msgAvatar svg {
  width: 14px;
  height: 14px;
  color: #A78BFA;
}

.typing {
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0.25rem 0;
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: bounce 1.4s ease-in-out infinite both;
}

.typing span:nth-child(1) { animation-delay: 0s; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.messageList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.messageRow {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.messageLeft {
  justify-content: flex-start;
}

.messageRight {
  justify-content: flex-end;
}

.bubble {
  max-width: 85%;
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
}

.bubbleUser {
  background-color: #6d18f8;
  color: white;
  border: 2px solid #250750;
}

.bubbleAssistant {
  background-color: rgba(139, 87, 255, 0.25);
  color: white;
  border: 1px solid rgba(139, 87, 255, 0.5);
}

.bubbleContent {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.bubbleContent :deep(strong) {
  color: #A78BFA;
}

.inputArea {
  border-top: 2px solid rgba(139, 87, 255, 0.4);
  padding: 1rem 0;
}

.sendRow {
  display: flex;
  gap: 0.75rem;
}

.input {
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid #8B57FF;
  border-radius: 10px;
  color: white;
  font-size: 0.95rem;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input:focus {
  outline: none;
  border-color: #A78BFA;
}

.sendBtn {
  padding: 0.75rem 1.25rem;
  background-color: #6d18f8;
  border: 2px solid #250750;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sendBtn:hover:not(:disabled) {
  background-color: #5B31B4;
}

.sendBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sendIcon {
  width: 1.25rem;
  height: 1.25rem;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
