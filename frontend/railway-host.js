// Railway host management script for Vite
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

// This file will be used to dynamically update vite.config.ts with allowed hosts
const currentHost = process.env.RAILWAY_STATIC_URL || 
                   process.env.RAILWAY_PUBLIC_DOMAIN ||
                   'frontend-production-2660.up.railway.app';

// Write the hostname to a file that will be read by vite.config.ts
try {
  fs.writeFileSync('./railway-host.txt', currentHost);
  console.log(`✅ Railway host ${currentHost} saved for Vite config`);
} catch (error) {
  console.error('Failed to write Railway host:', error);
}

// Just a helper function - not executed
export function getKnownHosts() {
  try {
    if (fs.existsSync('./railway-host.txt')) {
      return fs.readFileSync('./railway-host.txt', 'utf-8').trim();
    }
  } catch (e) {
    // Ignore errors
  }
  return 'frontend-production-2660.up.railway.app';
}
