// Simple script to copy essential files to the dist directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the favicon.ico is copied to the root of the dist directory
try {
  fs.copyFileSync(
    path.resolve(__dirname, 'public', 'favicon.ico'),
    path.resolve(__dirname, 'dist', 'favicon.ico')
  );
  console.log('✓ favicon.ico copied to dist root');
} catch (error) {
  console.error('Error copying favicon.ico:', error);
}
