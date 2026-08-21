import type { Content } from "@/content";
import { links } from "@/lib/links";

export function Footer({ copy }: { copy: Content["footer"] }) {
  return (
    <footer className="border-t border-line-soft">
      <div className="wrap flex gap-5 flex-wrap items-center py-[26px] text-[13px] text-tx-4">
        <span>{copy.rights}</span>
        <span className="ml-auto flex gap-5">
          <a href={links.privacy} className="no-underline text-tx-4 hover:text-tx-2">
            {copy.privacy}
          </a>
          <a href={links.terms} className="no-underline text-tx-4 hover:text-tx-2">
            {copy.terms}
          </a>
          <a href={links.email} className="no-underline text-tx-4 hover:text-tx-2">
            {copy.email}
          </a>
        </span>
      </div>
    </footer>
  );
}
