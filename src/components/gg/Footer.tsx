import { Leaf } from "lucide-react";
import { toast } from "sonner";

const links = [
  { label: "Sell Device", href: "#sell" },
  { label: "Buy Refurbished", href: "#store" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const legal = ["Privacy Policy", "Terms"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-hero-gradient">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-eco-gradient shadow-eco-glow">
              <Leaf className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-bold">
              Green<span className="text-eco-gradient">Gadget</span>
            </span>
          </div>
          <p className="mt-4 font-display text-lg text-eco-gradient">Recycle. Refurbish. Reuse.</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            India&apos;s trusted e-waste buyback and refurbishment platform. Free pickup in 40+ cities,
            certified data wipe and instant payouts.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase">Legal</h3>
          <ul className="mt-4 space-y-2.5">
            {legal.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => toast.info(l, { description: "Full policy document coming soon." })}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 GreenGadget. All Rights Reserved.
      </div>
    </footer>
  );
}
