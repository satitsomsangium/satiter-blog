/** ต้นทางเว็บแบบไม่มี slash ท้าย — ตั้งใน `.env` เป็น `NEXT_PUBLIC_SITE_URL=https://โดเมนของคุณ` */
export function getSiteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "";
}

/** URL แบบเต็มของหน้าโพสต์ สำหรับปุ่มแชร์ (Facebook ฯลฯ ต้องเป็น absolute URL) */
export function getCanonicalPostUrl(slug: string): string {
  const origin = getSiteOrigin();
  if (!origin) {
    return "";
  }
  return `${origin}/posts/${slug}`;
}
