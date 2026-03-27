import { NextResponse } from "next/server";

import { processBatchImages } from "@/lib/image/process-batch";
import { processSingleImage } from "@/lib/image/process-single";
import { createZip } from "@/lib/image/zip";
import { validateFile } from "@/lib/image/validate";
import { outputFormats, type OutputFormat } from "@/lib/image/formats";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
    }

    files.forEach(validateFile);

    const formatValue = String(formData.get("format") ?? "jpeg");
    const outputFormat = outputFormats.includes(formatValue as OutputFormat)
      ? (formatValue as OutputFormat)
      : "jpeg";

    const width = Number(formData.get("width") ?? 0) || undefined;
    const height = Number(formData.get("height") ?? 0) || undefined;
    const quality = Number(formData.get("quality") ?? 80);
    const stripMetadata = String(formData.get("stripMetadata") ?? "true") !== "false";

    if (files.length === 1) {
      const input = Buffer.from(await files[0].arrayBuffer());
      const result = await processSingleImage(input, {
        width,
        height,
        quality,
        outputFormat,
        stripMetadata,
      });

      const ext = outputFormat === "jpeg" ? "jpg" : outputFormat;
      return new NextResponse(result, {
        status: 200,
        headers: {
          "Content-Type": `image/${outputFormat}`,
          "Content-Disposition": `attachment; filename="converted.${ext}"`,
        },
      });
    }

    const batchInput = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        input: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const processed = await processBatchImages(batchInput, {
      width,
      height,
      quality,
      outputFormat,
      stripMetadata,
    });

    const zipBuffer = await createZip(processed);
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="converted-images.zip"',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to convert image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
