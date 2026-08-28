import { Gift, Recycle, ShoppingBag, Smartphone, UserPlus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useCountUp, useInView } from "./useCountUp";

const ways = [
  { icon: Smartphone, title: "Sell old devices", points: "+500 pts" },
  { icon: Recycle, title: "Recycle electronics", points: "+250 pts" },
  { icon: UserPlus, title: "Refer friends", points: "+300 pts" },
  { icon: ShoppingBag, title: "Buy refurbished", points: "+200 pts" },
];

const badges = [
  { emoji: "🌱", name: "Eco Starter", need: "500 points", unlocked: true },
  { emoji: "♻️", name: "Green Hero", need: "1,000 points", unlocked: true },
  { emoji: "🌍", name: "Planet Saver", need: "2,500 points", unlocked: false },
];

export function Rewards() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const points = useCountUp(1250, inView);

  return (
    <section id="rewards" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Green points"
          title={
            <>
              GreenGadget <span className="text-eco-gradient">Rewards</span>
            </>
          }
          subtitle="Earn Green Points on every eco-action and redeem them against your next refurbished purchase."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div ref={ref} className="glass rounded-[2rem] p-8 text-center">
            <Gift className="mx-auto size-8 text-primary" />
            <p className="mt-5 text-sm text-muted-foreground">Your Green Points</p>
            <p className="font-display text-5xl font-bold text-eco-gradient">
              {Math.round(points).toLocaleString("en-IN")}
            </p>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-eco-gradient transition-[width] duration-1000"
                style={{ width: inView ? "50%" : "0%" }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              1,250 more points to unlock 🌍 Planet Saver
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`rounded-2xl border p-4 ${b.unlocked ? "border-primary/50 bg-primary/10" : "border-border opacity-50"}`}
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <p className="mt-2 text-xs font-semibold">{b.name}</p>
                  <p className="text-[11px] text-muted-foreground">{b.need}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {ways.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="glass flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/15">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <div className="mt-6">
                    <h3 className="font-display text-base font-semibold">{w.title}</h3>
                    <p className="mt-1 font-display text-lg font-bold text-eco-gradient">
                      {w.points}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
