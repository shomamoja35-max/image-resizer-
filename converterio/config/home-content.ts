export const homeContent = {
  hero: {
    title: "Free Online Image Resizer, Compressor & Converter",
    subtitle:
      "Resize images by pixel or percentage, compress by quality, and convert between JPG, PNG, and WEBP — all in your browser. No upload, no login, no file size limit.",
  },
  heroBadges: [
    { emoji: "📐", label: "Resize px & %" },
    { emoji: "🗜️", label: "Compress" },
    { emoji: "🔄", label: "Convert" },
    { emoji: "🔒", label: "No Upload" },
    { emoji: "🆓", label: "Free" },
  ],
  howItWorks: [
    {
      step: "01",
      title: "Upload Image",
      desc: "Drag & drop or upload JPG, PNG, or WEBP.",
    },
    {
      step: "02",
      title: "Set Size & options",
      desc: "Choose pixels or percentage, quality, and output format.",
    },
    {
      step: "03",
      title: "Download",
      desc: "Download instantly after processing — no login required.",
    },
  ],
  features: [
    {
      title: "Privacy First",
      description:
        "Images are processed using browser APIs and never leave your device. No server upload — everything runs locally in your browser.",
      icon: "ShieldCheck" as const,
    },
    {
      title: "Batch friendly",
      description:
        "No file size limit. Work through multiple files in one session and keep quality under control with presets for web, social, and email.",
      icon: "Layers" as const,
    },
    {
      title: "Smart compression",
      description:
        "Use quality between 75%–85% to cut size by up to 70% without visible loss. Adjust from 1% to 100% whenever you need.",
      icon: "Zap" as const,
    },
  ],
  services: [
    {
      name: "Image Resizer",
      desc: "Set width and height or scale by percentage for web and social.",
      slug: "image-resizer",
    },
    {
      name: "Compressor",
      desc: "Shrink files with the quality slider — web, social, and email presets.",
      slug: "image-compressor",
    },
    {
      name: "Format Converter",
      desc: "Convert between JPG, PNG, and WEBP — smaller WEBP files in one click.",
      slug: "image-converter",
    },
    {
      name: "Crop Tool",
      desc: "Frame photos precisely before export.",
      slug: "crop-image",
    },
  ],
  about: {
    heading: "Why Choose Converterio?",
    content:
      "Converterio is a free, fast image toolkit built for privacy: resize by pixel or percentage, compress with clear quality control, and convert JPG, PNG, and WEBP without uploading your files. No account, no watermark — just your browser and your images.",
  },
  stats: [
    { value: "1M+", label: "Users worldwide" },
    { value: "90%", label: "Smaller files possible" },
    { value: "50+", label: "Images per batch" },
    { value: "0", label: "Permanent file storage" },
  ],
  faqs: [
    { q: "Is there a file size limit?", a: "No — unlimited file size." },
    { q: "What formats are supported?", a: "JPG, PNG, WEBP." },
    { q: "Is there a watermark?", a: "No watermark is added." },
    {
      q: "Pixel vs Percentage?",
      a: "Pixels = exact size, Percentage = proportional scaling.",
    },
    {
      q: "Does Converterio upload my images to a server?",
      a: "No — everything runs locally in your browser. Images are processed with browser APIs and never leave your device.",
    },
    {
      q: "How do I convert JPG to WEBP?",
      a: "Upload your image, choose WEBP, and download a smaller file instantly. WEBP often reduces size by 25–34% compared to JPG.",
    },
  ],
  cta: {
    title: "Ready to resize, compress, or convert?",
    buttonText: "Open Image Resizer",
  },
  sectionTitles: {
    howItWorks: "How it works",
    ourTools: "Our tools",
    ourToolsSubtitle: "Everything you need to prepare images for the web or social media.",
    faq: "Frequently asked questions",
  },
} as const;
