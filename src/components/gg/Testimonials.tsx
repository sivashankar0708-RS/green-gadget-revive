import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  {
    name: "Ananya Iyer",
    city: "Chennai",
    rating: 5,
    text: "Sold my 4-year-old iPhone in 20 minutes. The quoted ₹18,400 was exactly what I received after inspection. Pickup agent was on time and very professional.",
  },
  {
    name: "Rahul Mehta",
    city: "Pune",
    rating: 5,
    text: "I had three dead laptops lying at home. GreenGadget picked them up for free and sent a data-wipe certificate for each. Genuinely impressed with the transparency.",
  },
  {
    name: "Fatima Khan",
    city: "Hyderabad",
    rating: 4,
    text: "Bought a refurbished MacBook Air M1 at almost half price. It arrived looking brand new with a 12-month warranty. Battery health was even better than promised.",
  },
  {
    name: "Vikram Sethi",
    city: "Delhi NCR",
    rating: 5,
    text: "Our college e-waste drive collected 60 devices and GreenGadget handled the entire pickup and reporting. The impact dashboard was great for our presentation.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Customer reviews"
          title={
            <>
              Loved by <span className="text-eco-gradient">7,000+ customers</span>
            </>
          }
          subtitle="Real experiences from people who turned their old gadgets into cash."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < r.rating ? "size-4 fill-current" : "size-4 opacity-25"}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-eco-gradient font-semibold text-primary-foreground">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.city}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
