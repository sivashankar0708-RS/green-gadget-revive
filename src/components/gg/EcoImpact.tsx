import { Cloud, Leaf, Package, Recycle, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useCountUp, useInView } from "./useCountUp";

const metrics = [
  { icon: Package, value: 25400, suffix: " KG", label: "E-Waste Collected" },
  { icon: Recycle, value: 6200, suffix: "+", label: "Devices Reused" },
  { icon: Leaf, value: 3800, suffix: "+", label: "Devices Recycled" },
  { icon: Cloud, value: 48300, suffix: " KG", label: "CO₂ Emissions Avoided" },
  { icon: Users, value: 7100, suffix: "+", label: "Customers Participated" },
];

const chart = [
  { label: "Smartphones", value: 46 },
  { label: "Laptops", value: 27 },
  { label: "Tablets", value: 13 },
  { label: "Smartwatches", value: 8 },
  { label: "Accessories", value: 6 },
];

function Metric({ icon: Icon, value, suffix, label }: (typeof metrics)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView);
  return (
    <div
      ref={ref}
      className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60"
    >
      <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
        <Icon className="size-5 text-primary" />
      </span>
      <p className="mt-4 font-display text-3xl font-bold text-eco-gradient">
        {Math.round(n).toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function EcoImpact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="eco-impact" className="relative overflow-hidden py-24">
      <div className="circuit-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Eco impact"
          title={
            <>
              Our collective <span className="text-eco-gradient">green dashboard</span>
            </>
          }
          subtitle="By selling one old smartphone through GreenGadget, you help keep electronic waste out of landfills."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div ref={ref} className="glass rounded-[2rem] p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">E-waste collected by category</h3>
            <p className="mt-1 text-sm text-muted-foreground">Share of total weight, last 12 months</p>
            <div className="mt-8 space-y-5">
              {chart.map((c, i) => (
                <div key={c.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{c.label}</span>
                    <span className="text-primary">{c.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-eco-gradient transition-[width] duration-1000 ease-out"
                      style={{ width: inView ? `${c.value}%` : "0%", transitionDelay: `${i * 120}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass flex flex-col justify-center rounded-[2rem] p-8">
            <Leaf className="size-8 text-primary" />
            <p className="mt-5 font-display text-2xl leading-snug font-semibold">
              One recycled smartphone saves about{" "}
              <span className="text-eco-gradient">12 kg of CO₂</span> and recovers gold, copper and
              rare earth metals.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              India generates over 1.7 million tonnes of e-waste every year. GreenGadget partners with
              CPCB-authorised recyclers so nothing ends up in an informal landfill.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
