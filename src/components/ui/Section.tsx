import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`border-t border-line-soft ${className}`}>
      <div
        className={
          "wrap " +
          (tight ? "py-[34px]" : "py-[88px] max-[720px]:py-14")
        }
      >
        {children}
      </div>
    </section>
  );
}
