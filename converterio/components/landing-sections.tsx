export function LandingAdStrip() {
  return (
    <div className="container-shell py-3">
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-2.5 text-sm text-emerald-900">
        <span className="font-medium">Unlock faster batch processing and larger files.</span>
        <button
          type="button"
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Perfect quality",
    desc: "Smart resizing and compression that keeps detail where it matters.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Lightning fast",
    desc: "Process images in the browser and server pipeline without long waits.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Easy to use",
    desc: "Drag and drop, paste, or add a URL—no account required.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Works anywhere",
    desc: "Use Converterio on desktop or mobile in any modern browser.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Privacy guaranteed",
    desc: "Files are processed securely and not stored permanently.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "It's free",
    desc: "Core tools stay free with no watermark on your downloads.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function LandingFeatures() {
  return (
    <section className="border-t border-gray-100 bg-slate-50 py-16 dark:border-gray-800 dark:bg-gray-900/50 md:py-20">
      <div className="container-shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                {f.icon}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingHowTo() {
  return (
    <section className="bg-white py-16 dark:bg-gray-950 md:py-20">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 p-8 ring-1 ring-blue-100 dark:from-blue-950/40 dark:to-sky-950/40 dark:ring-blue-900/50">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
            <svg className="h-16 w-16 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            How to resize an image?
          </h2>
          <ol className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Upload your images</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Drag and drop files, use Select Images, paste from clipboard, or add a URL.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Set size and format</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Enter width and height, adjust quality, and pick JPG, PNG, WebP, or AVIF.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Download</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Click convert and save your optimized image or ZIP for multiple files.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export function LandingPromo() {
  return (
    <section className="border-t border-gray-100 bg-sky-50 py-16 dark:border-gray-800 dark:bg-sky-950/30 md:py-20">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Meet more ways to work with media
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            We are building additional tools for screenshots, quick edits, and sharing—stay tuned for new releases on the blog.
          </p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Learn more
          </button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-950 dark:to-blue-950" />
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">Preview placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
