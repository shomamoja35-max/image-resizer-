export type NavMenuItem = { slug: string; label: string };

export const resizeMenu: NavMenuItem[] = [
  { slug: "image-resizer", label: "Image Resizer" },
  { slug: "bulk-image-converter", label: "Bulk resize" },
  { slug: "resize-png", label: "Resize PNG" },
  { slug: "resize-jpg", label: "Resize JPG" },
  { slug: "resize-webp", label: "Resize WebP" },
];

export const cropMenu: NavMenuItem[] = [
  { slug: "crop-image", label: "Crop Image" },
  { slug: "crop-png", label: "Crop PNG" },
  { slug: "crop-webp", label: "Crop WebP" },
  { slug: "crop-jpg", label: "Crop JPG" },
];

export const compressMenu: NavMenuItem[] = [
  { slug: "image-compressor", label: "Image Compressor" },
  { slug: "compress-jpeg", label: "Compress JPEG" },
  { slug: "png-compressor", label: "PNG Compressor" },
  { slug: "gif-compressor", label: "GIF Compressor" },
];

export const convertMenu: NavMenuItem[] = [
  { slug: "image-converter", label: "Image Converter" },
  { slug: "svg-converter", label: "SVG Converter" },
  { slug: "png-converter", label: "PNG Converter" },
  { slug: "jpg-converter", label: "JPG Converter" },
  { slug: "gif-converter", label: "GIF Converter" },
  { slug: "heic-to-jpg", label: "HEIC to JPG" },
  { slug: "webp-to-png", label: "WebP to PNG" },
  { slug: "webp-to-jpg", label: "WebP to JPG" },
  { slug: "png-to-jpg", label: "PNG to JPG" },
  { slug: "png-to-svg", label: "PNG to SVG" },
];
