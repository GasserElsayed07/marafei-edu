import fs from "node:fs";
import path from "node:path";

const LOGO_CANDIDATES = [
  "marafei-logo.svg",
  "marafei-logo.png",
  "marafei-logo.webp",
  "marafei-logo.jpg",
  "MarafeiEducationPlatform/loading/HTMLImage_9BAE0718_BB45_09D4_41D4_C9CD14F144F7.jpg",
] as const;

/** Public URL path when a Marafei logo asset exists under `public/`, otherwise null. */
export function getMarafeiLogoSrc(): string | null {
  const publicDir = path.join(process.cwd(), "public");

  for (const relative of LOGO_CANDIDATES) {
    if (fs.existsSync(path.join(publicDir, ...relative.split("/")))) {
      return `/${relative}`;
    }
  }

  return null;
}