import { ArrowRight, Recycle, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-devices.jpg";
import { useCountUp, useInView } from "./useCountUp";

const stats = [
  { value: 10000, suffix: "K+", label: "Devices Recycled", divide: 1000 },
  { value: 7000, suffix: "K+", label: "Happy Customers", divide: 1000 },
  { value: 25000, suffix: "K+ KG", label: "E-Waste Diverted", divide: 1000 },
];

function Stat({ value, suffix, label, divide }: (typeof stats)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value / divide, inView);
  return (
    <div ref={ref} className="glass rounded-3xl px-5 py-4">
      <p className="font-display text-3xl font-bold text-eco-gradient">
        {Math.round(n)}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 sm:pt-40">
      <div className="circuit-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            <Recycle className="size-3.5" /> India&apos;s e-waste buyback platform
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Give Your Old Gadgets a <span className="text-eco-gradient">New Life.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Sell your unused electronics, earn money, and help build a cleaner digital future.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#sell">
                Sell My Gadget <ArrowRight />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#store">Explore Refurbished Devices</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Free doorstep pickup
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> Certified data wipe
            </span>
            <span className="inline-flex items-center gap-2">
              <Recycle className="size-4 text-primary" /> CPCB-aligned recycling
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-eco-gradient opacity-20 blur-3xl" />
          <img
            src={heroImage}
            alt="Smartphone, laptop and smartwatch floating above a glowing recycling symbol"
            width={1280}
            height={1024}
            className="animate-float relative w-full rounded-[2rem] border border-border object-cover shadow-eco-glow"
          />
          <div className="glass absolute -bottom-6 left-4 rounded-2xl px-5 py-4 sm:left-8">
            <p className="text-xs text-muted-foreground">Average payout in</p>
            <p className="font-display text-xl font-bold text-eco-gradient">24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
