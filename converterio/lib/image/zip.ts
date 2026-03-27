import JSZip from "jszip";

export async function createZip(
  files: Array<{ filename: string; data: Buffer }>
): Promise<Buffer> {
  const zip = new JSZip();
  files.forEach((item) => zip.file(item.filename, item.data));
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
