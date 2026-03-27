export const inputFormats = ["jpeg", "jpg", "png", "webp", "avif", "gif"] as const;
export const outputFormats = ["jpeg", "png", "webp", "avif"] as const;

export type OutputFormat = (typeof outputFormats)[number];
