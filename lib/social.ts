/**
 * แก้ href เป็นลิงก์โปรไฟล์จริงของคุณ
 * ใส่ href ว่าง "" หรือลบรายการออก ถ้าไม่ต้องการแสดงช่องทางนั้น
 */
export type SocialNetwork = "facebook" | "x" | "github" | "youtube" | "instagram" | "rss";

export type SocialLink = {
  network: SocialNetwork;
  href: string;
  /** ข้อความสำหรับ screen reader */
  label: string;
};

const allSocialLinks: SocialLink[] = [
  { network: "facebook", href: "https://www.facebook.com/", label: "Facebook" },
  { network: "x", href: "https://twitter.com/", label: "X (Twitter)" },
  { network: "github", href: "https://github.com/", label: "GitHub" },
  { network: "youtube", href: "https://www.youtube.com/", label: "YouTube" },
  { network: "instagram", href: "https://www.instagram.com/", label: "Instagram" },
  { network: "rss", href: "https://www.satiter.com/feeds/posts/default", label: "RSS" },
];

export const socialLinks: SocialLink[] = allSocialLinks.filter((item) => item.href.trim().length > 0);
