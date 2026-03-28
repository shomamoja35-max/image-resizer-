import type { ReactNode } from "react";
import Link from "next/link";

import { FooterLanguageMenu } from "@/components/footer-language-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { blogPosts } from "@/lib/blog/posts";
import { isLocale, type Locale } from "@/lib/i18n/config";

type Props = {
  locale: string;
};

function LogoMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white shadow-md">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </span>
  );
}

function SocialIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-800/80 text-slate-400 transition hover:bg-slate-700 hover:text-white"
    >
      {children}
    </a>
  );
}

export function SiteFooter({ locale }: Props) {
  const p = `/${locale}`;
  const currentLocale: Locale = isLocale(locale) ? locale : "en";

  const quickLinks: { href: string; label: string }[] = [
    { href: "#pricing", label: "Pricing" },
    { href: `${p}/blog`, label: "Blog" },
    { href: "#faqs", label: "FAQs" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about-us", label: "About Us" },
    { href: "#contact", label: "Contact Us" },
    { href: "/sitemap.xml", label: "Sitemap" },
    { href: "#privacy", label: "Privacy" },
  ];

  const toolLinks: { slug: string; label: string }[] = [
    { slug: "image-resizer", label: "Image Resizer" },
    { slug: "image-compressor", label: "Image Compressor" },
    { slug: "crop-image", label: "Crop Image" },
    { slug: "image-converter", label: "Image Converter" },
    { slug: "pdf-to-png", label: "PDF to PNG" },
    { slug: "png-to-svg", label: "PNG to SVG" },
    { slug: "webp-to-jpg", label: "WebP to JPG" },
    { slug: "png-to-jpg", label: "PNG to JPG" },
    { slug: "jpg-to-png", label: "JPG to PNG" },
    { slug: "bulk-image-converter", label: "Bulk Resize" },
  ];

  return (
    <footer className="mt-auto bg-[#0f172a] text-slate-300">
      <div className="container-shell py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1 — Branding */}
          <div className="space-y-5">
            <Link href={p} className="inline-flex items-center gap-3">
              <LogoMark />
              <span className="text-xl font-semibold tracking-tight text-white">Converterio</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Converterio is a powerful, free online image processing suite designed for speed and privacy. We provide
              professional-grade tools like Image Resizing, Compression, and Conversion directly in your browser, ensuring
              your files never stay on our servers. Whether you are a designer or a casual user, we make image optimization
              simple and accessible for everyone.
            </p>
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-700/60 pt-5">
              <ThemeSwitcher tone="footer" />
              <FooterLanguageMenu currentLocale={currentLocale} tone="footer" />
            </div>
            <div className="flex flex-wrap gap-2">
              <SocialIcon label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Pinterest">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Tools</h3>
            <ul className="space-y-2.5 text-sm">
              {toolLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={`${p}/${item.slug}`} className="text-slate-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Latest blog */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Latest Blog</h3>
            <ul className="space-y-4">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`${p}/blog/${post.slug}`} className="group flex gap-3">
                    <div
                      className={`h-14 w-20 shrink-0 rounded-md ring-1 ring-white/10 ${post.thumbGradient}`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug text-slate-200 transition group-hover:text-white">
                        {post.title}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500">By: Admin</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/80">
        <div className="container-shell py-5 text-center text-sm text-slate-500">
          Copyright © 2026 Converterio. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
