#!/usr/bin/env node
/**
 * Converts public/hero-video.mov to public/hero-video.mp4 (H.264) for Chrome.
 * Run: npm run convert-hero-video
 */
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const movPath = path.join(root, "public", "hero-video.mov");
const mp4Path = path.join(root, "public", "hero-video.mp4");

async function main() {
  if (!fs.existsSync(movPath)) {
    console.warn("hero-video.mov not found in public/, skipping conversion.");
    process.exit(0);
  }

  let ffmpegPath;
  try {
    const pkg = await import("@ffmpeg-installer/ffmpeg");
    ffmpegPath = pkg.path ?? pkg.default?.path;
  } catch (e) {
    console.error("Install @ffmpeg-installer/ffmpeg: npm install -D @ffmpeg-installer/ffmpeg");
    process.exit(1);
  }
  if (!ffmpegPath) {
    console.error("Could not get ffmpeg path from @ffmpeg-installer/ffmpeg");
    process.exit(1);
  }

  const exec = promisify(execFile);
  const args = [
    "-i", movPath,
    "-c:v", "libx264",
    "-c:a", "aac",
    "-movflags", "+faststart",
    "-y",
    mp4Path,
  ];

  try {
    await exec(ffmpegPath, args);
    console.log("Created public/hero-video.mp4 for Chrome.");
  } catch (err) {
    console.error("Conversion failed:", err.message);
    process.exit(1);
  }
}

main();
