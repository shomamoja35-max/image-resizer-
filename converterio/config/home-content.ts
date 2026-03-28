export const homeContent = {
  hero: {
    title: "Professional Online Image Processing Suite",
    subtitle:
      "Fast, secure, and high-quality tools to resize, compress, and convert images instantly in your browser.",
    trustBadge: "Trusted by 1M+ Users Worldwide",
    primaryCta: "Get started free",
  },
  howItWorks: [
    {
      step: "01",
      title: "Upload Images",
      desc: "Select files from your computer, Dropbox, or Google Drive.",
    },
    {
      step: "02",
      title: "Configure Settings",
      desc: "Choose your target dimensions, format, or quality level.",
    },
    {
      step: "03",
      title: "Download Result",
      desc: "Get your optimized images instantly as a single file or ZIP.",
    },
  ],
  features: [
    {
      title: "Privacy First",
      description: "Files are processed in-browser and never stored on our servers.",
      icon: "ShieldCheck" as const,
    },
    {
      title: "Batch Support",
      description: "Process hundreds of images at once with no speed drops.",
      icon: "Layers" as const,
    },
    {
      title: "Smart Compression",
      description: "Reduce file sizes by up to 90% while keeping pixel clarity.",
      icon: "Zap" as const,
    },
  ],
  services: [
    {
      name: "Image Resizer",
      desc: "Change dimensions for social media or web.",
      slug: "image-resizer",
    },
    {
      name: "Compressor",
      desc: "Reduce file size without losing quality.",
      slug: "image-compressor",
    },
    {
      name: "Format Converter",
      desc: "Convert between JPG, PNG, WebP, and HEIC.",
      slug: "image-converter",
    },
    {
      name: "Crop Tool",
      desc: "Perfectly frame your photos in seconds.",
      slug: "crop-image",
    },
  ],
  about: {
    heading: "Why Choose Converterio?",
    content:
      "Converterio is a powerful, free online image processing suite designed for speed and privacy. We provide professional-grade tools like Image Resizing, Compression, and Conversion directly in your browser, ensuring your files never stay on our servers.",
  },
  stats: [
    { value: "1M+", label: "Users worldwide" },
    { value: "90%", label: "Smaller files possible" },
    { value: "50+", label: "Images per batch" },
    { value: "0", label: "Permanent file storage" },
  ],
  faqs: [
    {
      q: "Is it safe to upload my photos?",
      a: "Yes. Processing happens in your browser. We never store your data.",
    },
    {
      q: "Does it support bulk conversion?",
      a: "Absolutely. You can upload and process up to 50 images at once.",
    },
    {
      q: "What formats are supported?",
      a: "We support JPG, PNG, WebP, GIF, AVIF, and HEIC.",
    },
  ],
  cta: {
    title: "Ready to optimize your images?",
    buttonText: "Start Resizing Now",
  },
} as const;
