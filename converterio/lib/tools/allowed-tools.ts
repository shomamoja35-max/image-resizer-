/**
 * Single source of truth for /[locale]/[tool] routes.
 * Keep in sync with header nav links and sitemap.
 */
export const ALLOWED_TOOL_SLUGS = [
  // Resize
  "image-resizer",
  "bulk-image-converter",
  "resize-png",
  "resize-jpg",
  "resize-webp",
  // Crop
  "crop-image",
  "crop-png",
  "crop-webp",
  "crop-jpg",
  // Compress
  "image-compressor",
  "compress-jpeg",
  "png-compressor",
  "gif-compressor",
  // Convert (nav + format pages)
  "image-converter",
  "svg-converter",
  "png-converter",
  "jpg-converter",
  "gif-converter",
  "heic-to-jpg",
  "webp-to-png",
  "webp-to-jpg",
  "png-to-jpg",
  "png-to-svg",
  "pdf-to-png",
  // Other tools
  "rotate-image",
  "flip-image",
  "jpg-to-png",
  "png-to-webp",
  "avif-to-jpg",
] as const;

export type AllowedToolSlug = (typeof ALLOWED_TOOL_SLUGS)[number];

export const allowedToolsSet = new Set<string>(ALLOWED_TOOL_SLUGS);
