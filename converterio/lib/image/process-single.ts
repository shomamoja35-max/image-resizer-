import sharp from "sharp";

import type { OutputFormat } from "@/lib/image/formats";

export type ProcessOptions = {
  width?: number;
  height?: number;
  quality?: number;
  outputFormat: OutputFormat;
  stripMetadata?: boolean;
};

export async function processSingleImage(input: Buffer, options: ProcessOptions) {
  let pipeline = sharp(input, { animated: true });

  if (options.width || options.height) {
    pipeline = pipeline.resize({
      width: options.width,
      height: options.height,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Sharp strips metadata by default. Re-attach only when explicitly requested.
  if (options.stripMetadata === false) {
    pipeline = pipeline.withMetadata();
  }

  switch (options.outputFormat) {
    case "jpeg":
      pipeline = pipeline.jpeg({ quality: options.quality ?? 80 });
      break;
    case "png":
      pipeline = pipeline.png({ quality: options.quality ?? 80 });
      break;
    case "webp":
      pipeline = pipeline.webp({ quality: options.quality ?? 80 });
      break;
    case "avif":
      pipeline = pipeline.avif({ quality: options.quality ?? 65 });
      break;
  }

  return pipeline.toBuffer();
}
