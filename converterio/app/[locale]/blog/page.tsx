import Link from "next/link";

import { blogPosts } from "@/lib/blog/posts";

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2 text-slate-600">Practical guides for image optimization and SEO.</p>
      <div className="mt-6 space-y-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            className="block rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50"
            href={`/${locale}/blog/${post.slug}`}
          >
            {post.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
