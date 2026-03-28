"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";

const OUTPUT_FORMATS = ["jpeg", "png", "webp", "avif"];

type Props = {
  title: string;
  subtitle: string;
  convertLabel: string;
  defaultFormat?: string;
  /** Match landing hero layout: large dropzone, optional title hidden when hero is above */
  variant?: "default" | "landing";
  hideTitle?: boolean;
  /** Warm dark homepage palette (#0c0a08 background pages) */
  tone?: "default" | "espresso";
  /** When false, fills parent (e.g. tool page card) instead of max-w-3xl */
  constrainWidth?: boolean;
};

export function ConverterWorkbench({
  title,
  subtitle,
  convertLabel,
  defaultFormat = "jpeg",
  variant = "default",
  hideTitle = false,
  tone = "default",
  constrainWidth = true,
}: Props) {
  const inputId = useId();
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
    if (!files.length) return null;
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

  const espresso = tone === "espresso";
  const sectionPad = variant === "landing" ? "py-8 md:py-12" : "py-8 md:py-10";
  const widthClass = constrainWidth ? "max-w-3xl" : "max-w-full";
  /** Narrow column on homepage; full width inside tool page card */
  const shellClass = espresso
    ? `mx-auto w-full ${widthClass} px-4 py-6 sm:px-6 md:py-8 lg:px-8`
    : `mx-auto w-full ${widthClass} px-4 sm:px-6 lg:px-8 ${sectionPad}`;
  const titleClass = espresso
    ? variant === "landing"
      ? "text-3xl font-bold tracking-tight text-[#ede0d4] md:text-4xl"
      : "text-2xl font-bold tracking-tight text-[#ede0d4] md:text-3xl"
    : variant === "landing"
      ? "text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
      : "text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl";

  return (
    <section className={shellClass}>
      <div className="w-full min-w-0">
          {!hideTitle ? (
            <div className={variant === "landing" ? "text-center" : ""}>
              <h1 className={titleClass}>{title}</h1>
              <p
                className={`mt-2 text-base ${espresso ? "text-[#ede0d4]/75" : "text-gray-600 dark:text-gray-400"} ${variant === "landing" ? "mx-auto max-w-2xl" : ""}`}
              >
                {subtitle}
              </p>
            </div>
          ) : null}

          <div className={`space-y-6 ${hideTitle ? "mt-0" : "mt-8"}`}>
            <div
              className="space-y-4"
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
              <label
                htmlFor={inputId}
                className={
                  espresso
                    ? "flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#555] bg-[#141210] p-8 text-center transition hover:border-[#4caf84]/60 md:min-h-[260px] md:p-10"
                    : "flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/80 p-8 text-center transition hover:border-blue-300 hover:bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/60 md:min-h-[280px] md:p-12"
                }
              >
                <span
                  className={
                    espresso
                      ? "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1f1c18] ring-1 ring-white/10"
                      : "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue-100 dark:bg-gray-900 dark:ring-blue-900/50"
                  }
                >
                  <svg
                    className={espresso ? "h-8 w-8 text-[#4caf84]" : "h-8 w-8 text-blue-500 dark:text-blue-400"}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <span
                  className={
                    espresso
                      ? "inline-flex items-center gap-2 rounded-lg border border-[#4caf84]/50 bg-[#1f1c18] px-5 py-2.5 text-sm font-semibold text-[#ede0d4] transition hover:bg-[#2a2620]"
                      : "inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-blue-950/50"
                  }
                >
                  Select Images
                  <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>

                <span className={espresso ? "mt-2 text-sm text-[#ede0d4]/75" : "mt-2 text-sm text-gray-600 dark:text-gray-400"}>
                  or drag and drop images here
                </span>
                {selectedLabel ? (
                  <span className={espresso ? "mt-2 text-sm font-medium text-[#4caf84]" : "mt-2 text-sm font-medium text-blue-700 dark:text-blue-400"}>
                    {selectedLabel}
                  </span>
                ) : null}
                <p className={espresso ? "mt-3 text-xs text-[#ede0d4]/50" : "mt-3 text-xs text-gray-500 dark:text-gray-500"}>
                  Max file size 20MB. All files are secure.
                </p>

                <input
                  id={inputId}
                  name="files"
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelection(e.target.files)}
                />
              </label>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  className={
                    espresso
                      ? "w-full flex-1 rounded-lg border border-white/15 bg-[#0c0a08] px-3 py-2.5 text-sm text-[#ede0d4] placeholder:text-[#ede0d4]/40 focus:border-[#4caf84]/60 focus:outline-none focus:ring-1 focus:ring-[#4caf84]/40"
                      : "w-full flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  }
                  placeholder="Paste image URL"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                />
                <button
                  type="button"
                  className={
                    espresso
                      ? "rounded-lg border border-white/15 bg-[#1f1c18] px-4 py-2.5 text-sm font-semibold text-[#ede0d4] transition hover:bg-[#2a2620]"
                      : "rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  }
                  onClick={handleUrlUpload}
                >
                  Add URL
                </button>
              </div>
            </div>

            <div
              className={
                espresso
                  ? "rounded-xl border border-white/10 bg-[#141210] p-5 md:p-6"
                  : "rounded-xl border border-gray-200 bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:ring-gray-800 md:p-6"
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">
                  <span className={espresso ? "mb-1 block font-medium text-[#ede0d4]/85" : "mb-1 block font-medium text-gray-700 dark:text-gray-300"}>
                    Width
                  </span>
                  <input
                    type="number"
                    placeholder="auto"
                    className={
                      espresso
                        ? "w-full rounded-lg border border-white/15 bg-[#0c0a08] px-3 py-2 text-[#ede0d4] focus:border-[#4caf84]/60 focus:outline-none focus:ring-1 focus:ring-[#4caf84]/30"
                        : "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
                    }
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </label>
                <label className="text-sm">
                  <span className={espresso ? "mb-1 block font-medium text-[#ede0d4]/85" : "mb-1 block font-medium text-gray-700 dark:text-gray-300"}>
                    Height
                  </span>
                  <input
                    type="number"
                    placeholder="auto"
                    className={
                      espresso
                        ? "w-full rounded-lg border border-white/15 bg-[#0c0a08] px-3 py-2 text-[#ede0d4] focus:border-[#4caf84]/60 focus:outline-none focus:ring-1 focus:ring-[#4caf84]/30"
                        : "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
                    }
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </label>
              </div>

              <label className={espresso ? "mt-4 flex items-center gap-2 text-sm text-[#ede0d4]/85" : "mt-4 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"}>
                <input
                  type="checkbox"
                  className={
                    espresso
                      ? "h-4 w-4 rounded border-white/25 bg-[#0c0a08] text-[#4caf84] focus:ring-[#4caf84]"
                      : "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-950"
                  }
                  checked={maintainRatio}
                  onChange={(e) => setMaintainRatio(e.target.checked)}
                />
                Maintain aspect ratio
              </label>

              <div className="mt-4">
                <p className={espresso ? "mb-1 text-sm font-medium text-[#ede0d4]/85" : "mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"}>
                  Compression ({quality}%)
                </p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className={espresso ? "h-2 w-full cursor-pointer accent-[#4caf84]" : "h-2 w-full cursor-pointer accent-blue-600"}
                />
              </div>

              <div className="mt-4">
                <p className={espresso ? "mb-1 text-sm font-medium text-[#ede0d4]/85" : "mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"}>
                  Convert to
                </p>
                <select
                  className={
                    espresso
                      ? "w-full rounded-lg border border-white/15 bg-[#0c0a08] px-3 py-2.5 text-[#ede0d4] focus:border-[#4caf84]/60 focus:outline-none focus:ring-1 focus:ring-[#4caf84]/30"
                      : "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
                  }
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

              <label className={espresso ? "mt-4 flex items-center gap-2 text-sm text-[#ede0d4]/85" : "mt-4 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"}>
                <input
                  type="checkbox"
                  className={
                    espresso
                      ? "h-4 w-4 rounded border-white/25 bg-[#0c0a08] text-[#4caf84] focus:ring-[#4caf84]"
                      : "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-950"
                  }
                  checked={stripMetadata}
                  onChange={(e) => setStripMetadata(e.target.checked)}
                />
                Remove metadata
              </label>

              <button
                type="button"
                className={
                  espresso
                    ? "mt-4 w-full rounded-lg bg-[#4caf84] px-4 py-3 text-sm font-semibold text-[#0c0a08] transition hover:bg-[#3d9a72] disabled:opacity-60"
                    : "mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                }
                onClick={handleConvert}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : convertLabel}
              </button>

              {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
              {downloadUrl ? (
                <div className="mt-6 space-y-2">
                  <a
                    className={
                      espresso
                        ? "block w-full rounded-lg border border-white/15 bg-[#1f1c18] px-4 py-2.5 text-center text-sm font-semibold text-[#ede0d4] transition hover:bg-[#2a2620]"
                        : "block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
                    }
                    href={downloadUrl}
                    download={resultName}
                  >
                    Download {resultName}
                  </a>
                  <p className={espresso ? "text-xs text-[#ede0d4]/50" : "text-xs text-gray-500 dark:text-gray-400"}>
                    Before: {(originalSizeBytes / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : null}
            </div>

            {(beforePreviewUrls.length > 0 || (downloadUrl && !resultName.endsWith(".zip"))) && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className={espresso ? "rounded-xl border border-white/10 bg-[#141210] p-4" : "rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"}>
                  <p className={espresso ? "mb-2 text-sm font-semibold text-[#ede0d4]" : "mb-2 text-sm font-semibold text-gray-900 dark:text-white"}>
                    Before
                  </p>
                  {beforePreviewUrls[0] ? (
                    <Image
                      src={beforePreviewUrls[0]}
                      alt="Before preview"
                      width={640}
                      height={360}
                      className="h-auto w-full rounded-lg object-contain"
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className={espresso ? "rounded-xl border border-white/10 bg-[#141210] p-4" : "rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"}>
                  <p className={espresso ? "mb-2 text-sm font-semibold text-[#ede0d4]" : "mb-2 text-sm font-semibold text-gray-900 dark:text-white"}>
                    After
                  </p>
                  {downloadUrl && !resultName.endsWith(".zip") ? (
                    <Image
                      src={downloadUrl}
                      alt="After preview"
                      width={640}
                      height={360}
                      className="h-auto w-full rounded-lg object-contain"
                      unoptimized
                    />
                  ) : (
                    <p className={espresso ? "text-sm text-[#ede0d4]/50" : "text-sm text-gray-500 dark:text-gray-400"}>
                      Convert an image to preview the result.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
      </div>
    </section>
  );
}
