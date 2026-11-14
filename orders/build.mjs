import { runEsBuildBuilder } from '@softarc/native-federation-esbuild';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const isDev = process.argv.includes('--dev');
const PORT = 4203;

const federation = await runEsBuildBuilder('federation.config.js', {
  outputPath: 'dist',
  entryPoints: ['src/bootstrap.tsx'],
  dev: isDev,
  watch: isDev,
});

const MIME = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.html': 'text/html',
  '.map': 'application/json',
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let path = join('dist', url.pathname);
    if (url.pathname === '/' || !existsSync(path)) {
      path = join('dist', 'remoteEntry.json');
    }
    const content = await readFile(path);
    const ext = extname(path);
    res.writeHead(200, {
      'content-type': MIME[ext] ?? 'application/octet-stream',
      'access-control-allow-origin': '*',
    });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});


server.listen(PORT, () => {
  console.log(`orders dev server running at http://localhost:${PORT}`);
});

if (!isDev) {
  await federation.close();
  server.close();
}
