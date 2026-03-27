import { processSingleImage, type ProcessOptions } from "@/lib/image/process-single";

export async function processBatchImages(
  files: Array<{ name: string; input: Buffer }>,
  options: ProcessOptions
) {
  return Promise.all(
    files.map(async (file, index) => ({
      filename: `${index + 1}-${file.name.split(".")[0]}.${options.outputFormat === "jpeg" ? "jpg" : options.outputFormat}`,
      data: await processSingleImage(file.input, options),
    }))
  );
}
