import { socialLinks } from "@/lib/social";

import { SocialIcon } from "./social-icons";

type HeaderSocialProps = {
  className?: string;
};

export function HeaderSocial({ className }: HeaderSocialProps) {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <ul className={["flex flex-wrap items-center justify-end gap-2", className].filter(Boolean).join(" ")} aria-label="โซเชียลมีเดีย">
      {socialLinks.map(({ network, href, label }) => (
        <li key={`${network}-${href}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-blue-600"
          >
            <SocialIcon network={network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
