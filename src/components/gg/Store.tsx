import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { inr, products, type Product } from "./data";

const categories = ["All", "Smartphones", "Laptops", "Tablets", "Smartwatches"] as const;
const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];
const conditions = ["All", "Like New", "Excellent", "Good"];

export function Store() {
  const [category, setCategory] = useState<string>("All");
  const [brand, setBrand] = useState("All");
  const [condition, setCondition] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (brand === "All" || p.brand === brand) &&
          (condition === "All" || p.condition === condition) &&
          p.price <= maxPrice &&
          (p.name + p.brand).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [category, brand, condition, maxPrice, query],
  );

  return (
    <section id="store" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Refurbished store"
          title={
            <>
              Certified devices at <span className="text-eco-gradient">up to 60% off</span>
            </>
          }
          subtitle="Every device passes a 42-point quality check, secure data wipe and comes with warranty."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-all",
                category === c
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="glass mt-6 grid gap-5 rounded-3xl p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                className="pl-9"
                placeholder="Search iPhone, ThinkPad…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Brand</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Max Price: {inr(maxPrice)}</Label>
            <Slider
              value={[maxPrice]}
              min={2000}
              max={60000}
              step={1000}
              onValueChange={(v) => setMaxPrice(v[0] ?? 60000)}
              className="mt-3"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-14 text-center text-muted-foreground">
            No devices match these filters. Try widening your price range.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => {
              const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
              return (
                <article
                  key={p.id}
                  className="glass group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/60"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.brand} ${p.name} refurbished`}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-eco-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {off}% OFF
                    </span>
                    <span className="glass absolute top-3 right-3 rounded-full px-3 py-1 text-xs">
                      {p.condition}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                    <h3 className="font-display text-base font-semibold">{p.name}</h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-display text-xl font-bold text-eco-gradient">
                        {inr(p.price)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {inr(p.mrp)}
                      </span>
                    </div>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-primary" /> {p.warranty} warranty
                    </p>
                    <div className="mt-5 flex gap-2">
                      <Button variant="glass" size="sm" className="flex-1" onClick={() => setDetail(p)}>
                        View Details
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          toast.success("Added to cart", {
                            description: `${p.name} • ${inr(p.price)}`,
                          })
                        }
                      >
                        <ShoppingCart /> Buy Now
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="glass rounded-3xl sm:max-w-lg">
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {detail.brand} {detail.name}
                </DialogTitle>
              </DialogHeader>
              <img
                src={detail.image}
                alt={`${detail.brand} ${detail.name}`}
                loading="lazy"
                width={768}
                height={768}
                className="h-48 w-full rounded-2xl object-cover"
              />
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 text-primary">
                  <Star className="size-4 fill-current" /> 4.6
                </span>
                <span className="text-muted-foreground">· Condition: {detail.condition}</span>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {detail.specs.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
                <li>• Warranty: {detail.warranty} · 7-day replacement</li>
              </ul>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-eco-gradient">
                  {inr(detail.price)}
                </span>
                <span className="text-sm text-muted-foreground line-through">{inr(detail.mrp)}</span>
              </div>
              <Button
                variant="hero"
                size="lg"
                onClick={() => {
                  toast.success("Order placed", { description: `${detail.name} • ${inr(detail.price)}` });
                  setDetail(null);
                }}
              >
                <ShoppingCart /> Buy Now
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
