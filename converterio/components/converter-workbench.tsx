"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const OUTPUT_FORMATS = ["jpeg", "png", "webp", "avif"];

type Props = {
  title: string;
  subtitle: string;
  convertLabel: string;
  defaultFormat?: string;
};

export function ConverterWorkbench({
  title,
  subtitle,
  convertLabel,
  defaultFormat = "jpeg",
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [sourceUrl, setSourceUrl] = useState("");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState(defaultFormat);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [resultName, setResultName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);

  const originalSizeBytes = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );
  const beforePreviewUrls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  const selectedLabel = useMemo(() => {
    if (!files.length) return "Drag & drop, click upload, or paste image";
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  }, [files]);

  useEffect(() => {
    return () => {
      beforePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [beforePreviewUrls]);

  useEffect(() => {
    if (!files[0]) {
      setOriginalWidth(null);
      setOriginalHeight(null);
      return;
    }
    const preview = URL.createObjectURL(files[0]);
    const image = new window.Image();
    image.onload = () => {
      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);
      URL.revokeObjectURL(preview);
    };
    image.onerror = () => URL.revokeObjectURL(preview);
    image.src = preview;
  }, [files]);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  function handleFileSelection(next: FileList | null) {
    if (!next) return;
    setFiles(Array.from(next));
    setError("");
  }

  function handleWidthChange(nextWidth: string) {
    setWidth(nextWidth);
    if (!maintainRatio || !originalWidth || !originalHeight || !nextWidth) return;
    const calc = Math.round((Number(nextWidth) * originalHeight) / originalWidth);
    setHeight(String(calc));
  }

  function handleHeightChange(nextHeight: string) {
    setHeight(nextHeight);
    if (!maintainRatio || !originalWidth || !originalHeight || !nextHeight) return;
    const calc = Math.round((Number(nextHeight) * originalWidth) / originalHeight);
    setWidth(String(calc));
  }

  async function handleUrlUpload() {
    if (!sourceUrl.trim()) return;
    try {
      setError("");
      const response = await fetch(sourceUrl.trim());
      if (!response.ok) throw new Error("Unable to fetch image from URL.");
      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) throw new Error("URL did not return an image.");
      const name = sourceUrl.split("/").pop()?.split("?")[0] || "url-image";
      const file = new File([blob], name, { type: blob.type });
      setFiles((prev) => [...prev, file]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed URL upload.";
      setError(message);
    }
  }

  async function handleConvert() {
    if (!files.length) {
      setError("Please upload at least one image.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setResultName("");
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");

    try {
      const body = new FormData();
      files.forEach((file) => body.append("files", file));
      body.append("format", format);
      body.append("quality", String(quality));
      body.append("stripMetadata", String(stripMetadata));
      if (width) body.append("width", width);
      if (height) body.append("height", height);

      const response = await fetch("/api/convert", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Conversion failed.");
      }

      const blob = await response.blob();
      const fileNameHeader = response.headers.get("Content-Disposition");
      const resolvedName =
        fileNameHeader?.match(/filename="?([^"]+)"?/)?.[1] ??
        (files.length > 1 ? "converted-images.zip" : `converted.${format}`);

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setResultName(resolvedName);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className="container-shell py-8 md:py-12">
      <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-slate-600">{subtitle}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div
            className="space-y-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelection(e.dataTransfer.files);
            }}
            onPaste={(e) => {
              const items = Array.from(e.clipboardData.files);
              if (items.length) setFiles((prev) => [...prev, ...items]);
            }}
          >
            <label className="flex min-h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-slate-500">
              {selectedLabel}
              <input
                name="files"
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelection(e.target.files)}
              />
            </label>
            <div className="flex gap-2">
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Paste image URL"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
              />
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                onClick={handleUrlUpload}
              >
                Add URL
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200 p-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm">
                <span className="mb-1 block font-medium">Width</span>
                <input
                  type="number"
                  placeholder="auto"
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium">Height</span>
                <input
                  type="number"
                  placeholder="auto"
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={maintainRatio}
                onChange={(e) => setMaintainRatio(e.target.checked)}
              />
              Maintain aspect ratio
            </label>

            <div>
              <p className="mb-1 text-sm font-medium">Compression ({quality}%)</p>
              <input
                type="range"
                min={0}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Convert to</p>
              <select
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                {OUTPUT_FORMATS.map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={stripMetadata}
                onChange={(e) => setStripMetadata(e.target.checked)}
              />
              Remove metadata
            </label>

            <button
              className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60"
              onClick={handleConvert}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : convertLabel}
            </button>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {downloadUrl ? (
              <div className="space-y-2">
                <a
                  className="block w-full rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium hover:bg-slate-50"
                  href={downloadUrl}
                  download={resultName}
                >
                  Download {resultName}
                </a>
                <p className="text-xs text-slate-500">
                  Before: {(originalSizeBytes / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {(beforePreviewUrls.length > 0 || (downloadUrl && !resultName.endsWith(".zip"))) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="mb-2 text-sm font-medium">Before</p>
              {beforePreviewUrls[0] ? (
                <Image
                  src={beforePreviewUrls[0]}
                  alt="Before preview"
                  width={640}
                  height={360}
                  className="h-auto w-full rounded-md object-contain"
                  unoptimized
                />
              ) : null}
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="mb-2 text-sm font-medium">After</p>
              {downloadUrl && !resultName.endsWith(".zip") ? (
                <Image
                  src={downloadUrl}
                  alt="After preview"
                  width={640}
                  height={360}
                  className="h-auto w-full rounded-md object-contain"
                  unoptimized
                />
              ) : (
                <p className="text-sm text-slate-500">Convert an image to preview the result.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
