import type { LucideIcon } from "lucide-react";
import {
  FileOutput,
  ImagePlus,
  Layers,
  MousePointer2,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

export type StepBlock = {
  step: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};
export type FeatureBlock = { Icon: LucideIcon; title: string; body: string };

export function getToolPageSections(displayTitle: string) {
  const tl = displayTitle.toLowerCase();
  return {
    extract: {
      label: "Overview",
      heading: `What is ${displayTitle}?`,
      body: `Converterio’s ${tl} workflow runs in your browser with no signup. Upload JPG, PNG, or WEBP, set dimensions and quality, then download fast. Processing is ephemeral—we don’t keep your files. Perfect for social posts, storefronts, and quick batch prep.`,
    },
    /** Primary walkthrough: mouse → zap (power) → shield (trust) per master layout brief */
    steps: [
      {
        step: "01",
        Icon: MousePointer2,
        title: "Step 1 — Upload & point",
        body: "Drag and drop files, use your file picker, or paste an image URL. Add several images at once and download a ZIP when you batch.",
      },
      {
        step: "02",
        Icon: Zap,
        title: "Step 2 — Tune with precision",
        body: "Resize with exact pixels or keep aspect ratio locked. Tune compression, strip metadata when needed, and pick JPEG, PNG, WebP, or AVIF.",
      },
      {
        step: "03",
        Icon: Shield,
        title: "Step 3 — Convert & download safely",
        body: "Click convert to generate your output, preview when available, then save a single file or archive—right from the tool.",
      },
    ] satisfies StepBlock[],
    features: [
      {
        Icon: Shield,
        title: "Privacy-minded flow",
        body: "Built for minimal retention: upload, transform, and download without long-lived storage of your images.",
      },
      {
        Icon: Zap,
        title: "Crisp, lighter files",
        body: "Balance clarity and weight with quality controls suited to web, email, and social delivery.",
      },
      {
        Icon: Layers,
        title: "Batch-friendly",
        body: "Handle multiple assets in one session and retrieve an organized ZIP of results.",
      },
      {
        Icon: ImagePlus,
        title: "Format flexibility",
        body: "Move between common web formats so every channel gets the right codec and transparency rules.",
      },
      {
        Icon: FileOutput,
        title: "Metadata control",
        body: "Remove EXIF when you need cleaner shares and smaller payloads.",
      },
      {
        Icon: Sparkles,
        title: "Simple, focused UI",
        body: "One panel for upload, URL fetch, sliders, and export—no clutter between you and the job.",
      },
    ] satisfies FeatureBlock[],
  };
}
