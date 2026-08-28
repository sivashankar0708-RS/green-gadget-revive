import { BadgeIndianRupee, ClipboardList, Recycle, Truck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useInView } from "./useCountUp";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell Us About Your Device",
    text: "Share the category, model, age and condition in under a minute.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Get an Estimated Price",
    text: "Our pricing engine gives you a transparent, market-linked quote instantly.",
  },
  {
    icon: Truck,
    title: "Book Free Pickup",
    text: "Choose a date and slot. Our verified agent collects from your doorstep.",
  },
  {
    icon: Recycle,
    title: "Get Paid & Recycle Responsibly",
    text: "Payment lands in your UPI or bank within 24 hours of inspection.",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative overflow-hidden py-24">
      <div className="circuit-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Four steps from clutter to <span className="text-eco-gradient">cash</span>
            </>
          }
          subtitle="A fully tracked journey, from your doorstep to a certified recycling facility."
        />

        <div ref={ref} className="relative mt-14">
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-eco-gradient opacity-40 lg:block" />
          <ol className="grid gap-6 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className={cn(
                    "glass relative rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 hover:border-primary/60",
                    inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="animate-pulse-ring grid size-16 place-items-center rounded-2xl bg-eco-gradient">
                    <Icon className="size-7 text-primary-foreground" />
                  </span>
                  <span className="absolute top-6 right-6 font-display text-4xl font-bold text-primary/20">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
