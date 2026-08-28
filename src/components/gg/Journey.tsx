import { useState } from "react";
import {
  ClipboardCheck,
  Eraser,
  Recycle,
  ShoppingBag,
  Truck,
  UserRound,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const stages = [
  {
    key: "Customer",
    icon: UserRound,
    text: "You list the device, get an instant quote and confirm the buyback price online.",
  },
  {
    key: "Pickup",
    icon: Truck,
    text: "A verified GreenGadget agent collects the device in a tamper-proof bag from your doorstep.",
  },
  {
    key: "Inspection",
    icon: ClipboardCheck,
    text: "Our lab runs a 42-point diagnostic on display, battery, board, camera and connectivity.",
  },
  {
    key: "Data Wipe",
    icon: Eraser,
    text: "Certified NIST 800-88 erasure removes all personal data and generates a wipe certificate.",
  },
  {
    key: "Refurbishment",
    icon: Wrench,
    text: "Faulty parts are replaced with quality components, then the device is cleaned and re-tested.",
  },
  {
    key: "Resale / Recycling",
    icon: ShoppingBag,
    text: "Working devices are resold with warranty. Beyond-repair units go to authorised recyclers.",
  },
];

export function Journey() {
  const [active, setActive] = useState(0);
  const Stage = stages[active]!;
  const Icon = Stage.icon;

  return (
    <section id="journey" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Device journey"
          title={
            <>
              Follow your device, <span className="text-eco-gradient">stage by stage</span>
            </>
          }
          subtitle="Tap any stage to see exactly what happens to your gadget after pickup."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stages.map((s, i) => {
            const SIcon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "group relative rounded-3xl border p-5 text-center transition-all duration-300 hover:-translate-y-1",
                  isActive
                    ? "border-primary bg-primary/10 shadow-eco-glow"
                    : "border-border bg-card/40 hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "mx-auto grid size-12 place-items-center rounded-2xl transition-colors",
                    isActive ? "bg-eco-gradient" : "bg-muted",
                  )}
                >
                  <SIcon
                    className={cn("size-5", isActive ? "text-primary-foreground" : "text-primary")}
                  />
                </span>
                <p className="mt-3 text-xs font-semibold">{s.key}</p>
              </button>
            );
          })}
        </div>

        <div className="glass mt-6 flex flex-col items-start gap-5 rounded-[2rem] p-8 sm:flex-row sm:items-center">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-eco-gradient">
            <Icon className="size-6 text-primary-foreground" />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold">
              Stage {active + 1}: {Stage.key}
            </h3>
            <p className="mt-2 text-muted-foreground">{Stage.text}</p>
          </div>
          <Recycle className="ml-auto hidden size-10 text-primary/25 sm:block" />
        </div>
      </div>
    </section>
  );
}
