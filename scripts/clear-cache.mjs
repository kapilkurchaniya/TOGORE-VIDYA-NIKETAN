import { rmSync } from 'fs';
import { join } from 'path';

const nextDir = join(process.cwd(), '.next');
try {
  rmSync(nextDir, { recursive: true, force: true });
  console.log('Cleared .next cache directory');
} catch (e) {
  console.log('No .next directory to clear or error:', e.message);
}
