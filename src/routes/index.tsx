import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/gg/Navbar";
import { Hero } from "@/components/gg/Hero";
import { Estimator } from "@/components/gg/Estimator";
import { HowItWorks } from "@/components/gg/HowItWorks";
import { Booking } from "@/components/gg/Booking";
import { Store } from "@/components/gg/Store";
import { EcoImpact } from "@/components/gg/EcoImpact";
import { Journey } from "@/components/gg/Journey";
import { DataSecurity } from "@/components/gg/DataSecurity";
import { Rewards } from "@/components/gg/Rewards";
import { Testimonials } from "@/components/gg/Testimonials";
import { Faq } from "@/components/gg/Faq";
import { Contact } from "@/components/gg/Contact";
import { Footer } from "@/components/gg/Footer";

const title = "GreenGadget | Sell Old Gadgets, Buy Certified Refurbished";
const description =
  "Sell smartphones, laptops and tablets at the best buyback price. Free doorstep pickup, certified data wipe, instant payment and refurbished devices up to 60% off.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [estimate, setEstimate] = useState<number | null>(null);
  const [device, setDevice] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Estimator
          onEstimate={(v, d) => {
            setEstimate(v);
            setDevice(d);
          }}
        />
        <HowItWorks />
        <Booking estimate={estimate} device={device} />
        <Store />
        <EcoImpact />
        <Journey />
        <DataSecurity />
        <Rewards />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
