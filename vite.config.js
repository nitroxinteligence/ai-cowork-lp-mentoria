import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function readLegacySupabaseCredentials(root) {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return {};

  const lines = fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const valueAfter = (label) => {
    const index = lines.findIndex((line) => line.toLowerCase().includes(label));
    return index >= 0 ? lines[index + 1]?.replace(/^`+|`+$/g, '') : undefined;
  };

  return {
    VITE_SUPABASE_URL: valueAfter('project url'),
    VITE_SUPABASE_PUBLISHABLE_KEY: valueAfter('publishable key'),
  };
}

export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root, '');
  const legacy = readLegacySupabaseCredentials(root);
  const supabaseUrl = env.VITE_SUPABASE_URL || legacy.VITE_SUPABASE_URL || '';
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY
    || env.VITE_SUPABASE_ANON_KEY
    || legacy.VITE_SUPABASE_PUBLISHABLE_KEY
    || '';

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(publishableKey),
    },
  };
});
