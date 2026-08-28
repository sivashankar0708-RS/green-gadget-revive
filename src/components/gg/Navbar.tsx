import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Sell Device", href: "#sell" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Refurbished Store", href: "#store" },
  { label: "Eco Impact", href: "#eco-impact" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-2" : "py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5" aria-label="GreenGadget home">
          <span className="grid size-10 place-items-center rounded-2xl bg-eco-gradient shadow-eco-glow">
            <Leaf className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Green<span className="text-eco-gradient">Gadget</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="hero" size="lg" className="hidden sm:inline-flex" asChild>
            <a href="#sell">Get Started</a>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-4 mt-3 rounded-3xl p-3 lg:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <Button variant="hero" className="w-full" size="lg" asChild>
                <a href="#sell" onClick={() => setOpen(false)}>
                  Get Started
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
