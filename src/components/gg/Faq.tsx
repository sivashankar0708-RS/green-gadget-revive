import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "How is my device value calculated?",
    a: "We combine the current market resale price of your exact model with its age, working condition, screen and battery health, and the accessories you still have. The estimator shows this price instantly; our agent confirms it after a physical inspection.",
  },
  {
    q: "Do you accept damaged devices?",
    a: "Yes. Cracked screens, dead batteries and even completely non-working devices are accepted. Damaged units are quoted lower and are usually sent for component harvesting and certified recycling instead of resale.",
  },
  {
    q: "How does pickup work?",
    a: "Choose a date and a three-hour slot. A verified GreenGadget agent arrives at your address with a tamper-proof bag, inspects the device in front of you and completes the paperwork on the spot. Pickup is always free.",
  },
  {
    q: "When will I receive payment?",
    a: "Payment is initiated immediately after the on-spot inspection is approved. UPI transfers usually reflect within minutes, and bank transfers land within 24 working hours.",
  },
  {
    q: "What happens to my old device?",
    a: "Devices that can be repaired are refurbished, quality-checked and resold with warranty in our store. Devices beyond repair go to CPCB-authorised recyclers where metals and plastics are recovered safely.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. Every device is wiped using NIST 800-88 compliant erasure before refurbishment, and you receive a signed data-wipe certificate by email. We also recommend logging out of your accounts and removing SIM and memory cards before pickup.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-eco-gradient">answered</span>
            </>
          }
        />
        <Accordion type="single" collapsible className="glass mt-10 rounded-[2rem] px-6 py-2">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left font-display text-base hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
