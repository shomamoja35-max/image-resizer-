import { notFound } from "next/navigation";

const content: Record<string, { title: string; body: string }> = {
  "png-vs-jpg": {
    title: "PNG vs JPG",
    body: "PNG preserves detail and transparency, while JPG offers smaller size for photos.",
  },
  "best-image-format-for-web": {
    title: "Best image format for web",
    body: "WebP and AVIF usually provide better compression for modern websites.",
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = content[slug];
  if (!post) notFound();

  return (
    <article className="container-shell py-10">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="mt-4 leading-8 text-slate-700">{post.body}</p>
    </article>
  );
}
