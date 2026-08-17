const STORAGE_KEY = 'ai-cowork:lead-application:v1';
const SAVE_DELAY_MS = 350;
const listeners = new Set();

let debounceTimer;
let syncChain = Promise.resolve();
let syncLifecycleCount = 0;
let syncState = {
  error: null,
  savedAt: null,
  status: 'idle',
};

function emitSyncState(nextState) {
  syncState = { ...syncState, ...nextState };
  listeners.forEach((listener) => listener(syncState));
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function createEditToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function createDraft() {
  return {
    currentStep: 0,
    editToken: createEditToken(),
    id: crypto.randomUUID(),
    values: {},
  };
}

function isValidDraft(value) {
  return Boolean(
    value
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.editToken === 'string'
    && value.editToken.length >= 32
    && Number.isInteger(value.currentStep)
    && value.currentStep >= 0
    && value.currentStep <= 2
    && value.values
    && typeof value.values === 'object'
    && !Array.isArray(value.values),
  );
}

function readStoredDraft() {
  if (!isBrowser()) return null;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return isValidDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredDraft(draft) {
  if (!isBrowser()) return false;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch {
    emitSyncState({
      error: 'Este navegador bloqueou o armazenamento local do rascunho.',
      status: 'error',
    });
    return false;
  }
}

function removeStoredDraft(draftId) {
  if (!isBrowser()) return;

  const current = readStoredDraft();
  if (current?.id === draftId) window.localStorage.removeItem(STORAGE_KEY);
}

function isOnline() {
  return !isBrowser() || window.navigator.onLine;
}

function toSyncError(error) {
  const message = error?.message || 'Não foi possível sincronizar o rascunho.';
  const details = error?.details ? ` ${error.details}` : '';
  return new Error(`${message}${details}`.trim());
}

async function sendDraft(draft, submit) {
  const { isSupabaseConfigured, supabase } = await import('./supabase');

  if (!isSupabaseConfigured || !supabase) {
    throw new Error('A conexão com o Supabase não está configurada.');
  }

  if (!isOnline()) {
    emitSyncState({ error: null, status: 'offline' });
    throw new Error('Sem conexão com a internet. O rascunho continua salvo neste dispositivo.');
  }

  emitSyncState({ error: null, status: submit ? 'submitting' : 'syncing' });

  const { data, error } = await supabase.rpc('save_lead_application', {
    p_current_step: draft.currentStep,
    p_edit_token: draft.editToken,
    p_id: draft.id,
    p_submit: submit,
    p_values: draft.values,
  });

  if (error) throw toSyncError(error);

  const result = Array.isArray(data) ? data[0] : data;
  emitSyncState({
    error: null,
    savedAt: result?.saved_at || new Date().toISOString(),
    status: submit ? 'submitted' : 'saved',
  });

  return result;
}

function enqueueSync(draft, submit = false) {
  const task = syncChain
    .catch(() => undefined)
    .then(() => sendDraft(draft, submit));

  syncChain = task.catch((error) => {
    if (isOnline()) {
      emitSyncState({ error: error.message, status: 'error' });
    }
  });

  return task;
}

function scheduleSync(draft) {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    void enqueueSync(draft).catch(() => undefined);
  }, SAVE_DELAY_MS);
}

export function getOrCreateLeadDraft() {
  const stored = readStoredDraft();
  if (stored) return { draft: stored, restored: true };

  const draft = createDraft();
  writeStoredDraft(draft);
  emitSyncState({ error: null, savedAt: null, status: 'idle' });
  return { draft, restored: false };
}

export function persistLeadDraft(draft) {
  writeStoredDraft(draft);
  emitSyncState({
    error: null,
    status: isOnline() ? 'syncing' : 'offline',
  });

  if (isOnline()) scheduleSync(draft);
  return draft;
}

export function flushLeadDraft(draft = readStoredDraft()) {
  if (!draft) return Promise.resolve();
  window.clearTimeout(debounceTimer);
  return enqueueSync(draft);
}

export async function submitLeadApplication(draft) {
  writeStoredDraft(draft);
  window.clearTimeout(debounceTimer);
  const result = await enqueueSync(draft, true);
  removeStoredDraft(draft.id);
  return result;
}

export function subscribeToLeadDraftSync(listener) {
  listeners.add(listener);
  listener(syncState);
  return () => listeners.delete(listener);
}

export function startLeadDraftSync() {
  if (!isBrowser()) return () => {};

  syncLifecycleCount += 1;
  if (syncLifecycleCount > 1) {
    return () => {
      syncLifecycleCount -= 1;
    };
  }

  const handleOnline = () => {
    const draft = readStoredDraft();
    if (draft) void flushLeadDraft(draft).catch(() => undefined);
  };
  const handleOffline = () => emitSyncState({ error: null, status: 'offline' });

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  const draft = readStoredDraft();
  if (draft && isOnline()) scheduleSync(draft);

  return () => {
    syncLifecycleCount -= 1;
    if (syncLifecycleCount > 0) return;
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
