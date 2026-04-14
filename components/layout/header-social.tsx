import { socialLinks } from "@/lib/social";

import { SocialIcon } from "./social-icons";

export function HeaderSocial() {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <ul className="site-social" aria-label="โซเชียลมีเดีย">
      {socialLinks.map(({ network, href, label }) => (
        <li key={`${network}-${href}`}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <SocialIcon network={network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
