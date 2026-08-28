import { toast } from "sonner";
import { FileCheck2, Lock, ScanSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Lock,
    title: "Secure Data Wipe",
    text: "Every device is erased using NIST 800-88 compliant software before refurbishment.",
  },
  {
    icon: ScanSearch,
    title: "Device Inspection",
    text: "Hardware diagnostics are done in a CCTV-monitored lab by trained technicians.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check",
    text: "A 42-point checklist verifies display, battery, ports, camera and network health.",
  },
  {
    icon: FileCheck2,
    title: "Digital Receipt",
    text: "You receive a data-wipe certificate and payment receipt on email and WhatsApp.",
  },
];

export function DataSecurity() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Data security"
          title={
            <>
              Your Data. <span className="text-eco-gradient">Your Privacy.</span>
            </>
          }
          subtitle="Before any device is refurbished or recycled, it goes through a documented, certified data-destruction process."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/15">
                  <Icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="hero"
            size="xl"
            onClick={() =>
              toast.info("Data safety at GreenGadget", {
                description:
                  "We factory reset, overwrite storage three times and issue a signed erasure certificate for every device.",
              })
            }
          >
            Learn About Data Safety
          </Button>
        </div>
      </div>
    </section>
  );
}
