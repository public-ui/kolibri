import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(join(packageRoot, 'dist', 'render'), { recursive: true });
await copyFile(join(packageRoot, 'src', 'render', 'harness.html'), join(packageRoot, 'dist', 'render', 'harness.html'));
