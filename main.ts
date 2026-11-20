// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the video, not this program: the agent finds a GTA 6 moment,
// cuts it into a vertical clip, the clip goes up on YouTube as a public Short
// with the bounty's line and the play code in its description, and VIDEO.json
// names that video. All this program does is hand VIDEO.json to the gate.
//
// It reads VIDEO.json from the repository, checks the address inside it is a
// real YouTube video address (a Shorts link or a watch link, never the
// starter's placeholder), and writes it to the output directory. If the
// address is missing, malformed or still the placeholder, it fails loudly
// instead of handing the gate a video that does not exist.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoPath = join(botDir, 'VIDEO.json');

let raw: string;
try {
  raw = readFileSync(videoPath, 'utf8');
} catch (err) {
  console.error(`Could not read VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string' || url.length === 0) {
  console.error('VIDEO.json has no "url" string; put the published Short address in it.');
  process.exit(1);
}

if (url.includes('<id>') || url.includes('placeholder')) {
  console.error('VIDEO.json still holds the starter placeholder; replace it with the real Short address.');
  process.exit(1);
}

let host: string;
try {
  host = new URL(url).hostname;
} catch {
  console.error(`VIDEO.json "url" is not a valid address: ${url}`);
  process.exit(1);
}

const isYouTube =
  host === 'www.youtube.com' ||
  host === 'youtube.com' ||
  host === 'youtu.be' ||
  host === 'm.youtube.com';
if (!isYouTube) {
  console.error(`VIDEO.json "url" is not a YouTube address: ${url}`);
  process.exit(1);
}

// The address must point at a video, not at a channel, playlist or home page:
// a Shorts link (/shorts/<id>), a watch link (?v=<id>) or a short youtu.be link.
const parsedUrl = new URL(url);
const pointsAtVideo =
  parsedUrl.pathname.startsWith('/shorts/') ||
  parsedUrl.searchParams.has('v') ||
  host === 'youtu.be';
if (!pointsAtVideo) {
  console.error(`VIDEO.json "url" does not point at a video: ${url}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'VIDEO.json'), JSON.stringify({ url }) + '\n', 'utf8');
console.log(`Entry video: ${url}`);
