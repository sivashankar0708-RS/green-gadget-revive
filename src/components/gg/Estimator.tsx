import { useState } from "react";
import { toast } from "sonner";
import {
  BatteryCharging,
  Calculator,
  Camera,
  CheckCircle2,
  Cpu,
  Smartphone,
  Sparkles,
  ThumbsUp,
  TriangleAlert,
  WrenchIcon,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { inr } from "./data";

const categories = [
  { key: "Smartphone", base: 42000 },
  { key: "Laptop", base: 85000 },
  { key: "Tablet", base: 38000 },
  { key: "Smartwatch", base: 18000 },
  { key: "Desktop", base: 60000 },
  { key: "Other", base: 12000 },
] as const;

const brandFactor: Record<string, number> = {
  Apple: 1.35,
  Samsung: 1.15,
  OnePlus: 1.05,
  Dell: 1.0,
  HP: 0.95,
  Lenovo: 0.95,
  Xiaomi: 0.85,
  Other: 0.75,
};

const conditionCards = [
  {
    key: "Like New",
    factor: 0.62,
    icon: Sparkles,
    desc: "Flawless device, works perfectly, box available.",
  },
  { key: "Good", factor: 0.48, icon: ThumbsUp, desc: "Light usage marks, fully functional." },
  { key: "Fair", factor: 0.34, icon: WrenchIcon, desc: "Visible scratches or dents, works fine." },
  {
    key: "Damaged",
    factor: 0.18,
    icon: TriangleAlert,
    desc: "Cracked screen or body damage, partly usable.",
  },
  { key: "Not Working", factor: 0.08, icon: XCircle, desc: "Dead device, recycled for parts." },
] as const;

const screenOptions = [
  { key: "Flawless", factor: 1 },
  { key: "Minor scratches", factor: 0.92 },
  { key: "Deep scratches", factor: 0.8 },
  { key: "Cracked", factor: 0.55 },
];

const batteryOptions = [
  { key: "Above 90% health", factor: 1 },
  { key: "80-90% health", factor: 0.93 },
  { key: "Below 80% health", factor: 0.85 },
  { key: "Needs replacement", factor: 0.7 },
];

const accessoryOptions = ["Original box", "Charger", "Earphones", "Bill / Invoice", "Warranty card"];

const currentYear = 2026;
const years = Array.from({ length: 12 }, (_, i) => String(currentYear - i));

export function Estimator({ onEstimate }: { onEstimate: (v: number, device: string) => void }) {
  const [category, setCategory] = useState("Smartphone");
  const [brand, setBrand] = useState("Apple");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2023");
  const [condition, setCondition] = useState<string>("Good");
  const [screen, setScreen] = useState(screenOptions[0]!.key);
  const [battery, setBattery] = useState(batteryOptions[0]!.key);
  const [accessories, setAccessories] = useState<string[]>(["Charger"]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const toggleAccessory = (a: string) =>
    setAccessories((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const calculate = () => {
    if (!model.trim()) {
      toast.error("Please enter your device model", {
        description: "For example: iPhone 13, MacBook Air M1.",
      });
      return;
    }
    const base = categories.find((c) => c.key === category)?.base ?? 12000;
    const cond = conditionCards.find((c) => c.key === condition)?.factor ?? 0.4;
    const scr = screenOptions.find((s) => s.key === screen)?.factor ?? 1;
    const bat = batteryOptions.find((b) => b.key === battery)?.factor ?? 1;
    const age = Math.max(0, currentYear - Number(year));
    const ageFactor = Math.max(0.28, Math.pow(0.84, age));
    const accessoryBonus = 1 + accessories.length * 0.02;
    const photoBonus = photos.length > 0 ? 1.02 : 1;

    const raw =
      base *
      (brandFactor[brand] ?? 0.8) *
      cond *
      scr *
      bat *
      ageFactor *
      accessoryBonus *
      photoBonus;
    const value = Math.max(300, Math.round(raw / 100) * 100);

    setResult(value);
    onEstimate(value, `${brand} ${model.trim()} (${category})`);
    toast.success("Estimated value ready!", {
      description: `${inr(value)} for your ${brand} ${model.trim()}.`,
    });
  };

  return (
    <section id="sell" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sell your device"
          title={
            <>
              Instant <span className="text-eco-gradient">Value Estimator</span>
            </>
          }
          subtitle="Answer a few quick questions and get a transparent buyback price in seconds."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Device Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.key} value={c.key}>
                        {c.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Brand</Label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(brandFactor).map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={model}
                  maxLength={60}
                  placeholder="e.g. iPhone 13 128GB"
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Purchase Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Screen Condition</Label>
                <Select value={screen} onValueChange={setScreen}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {screenOptions.map((s) => (
                      <SelectItem key={s.key} value={s.key}>
                        {s.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Battery Condition</Label>
                <Select value={battery} onValueChange={setBattery}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {batteryOptions.map((b) => (
                      <SelectItem key={b.key} value={b.key}>
                        {b.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-7">
              <Label className="mb-3 block">Working Condition</Label>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {conditionCards.map((c) => {
                  const Icon = c.icon;
                  const active = condition === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCondition(c.key)}
                      aria-pressed={active}
                      className={cn(
                        "group rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1",
                        active
                          ? "border-primary bg-primary/10 shadow-eco-glow"
                          : "border-border bg-card/50 hover:border-primary/50",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <p className="mt-3 font-display text-sm font-semibold">{c.key}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <Label className="mb-3 block">Accessories Available</Label>
                <div className="flex flex-wrap gap-2">
                  {accessoryOptions.map((a) => {
                    const active = accessories.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleAccessory(a)}
                        aria-pressed={active}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                          active
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50",
                        )}
                      >
                        {active && <CheckCircle2 className="size-3.5" />}
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor="photos" className="mb-3 block">
                  Device Photos
                </Label>
                <label
                  htmlFor="photos"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/40 px-4 py-6 text-center transition-colors hover:border-primary/60"
                >
                  <Camera className="size-5 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {photos.length > 0
                      ? `${photos.length} photo(s) added: ${photos.join(", ")}`
                      : "Upload clear photos of the front, back and screen"}
                  </span>
                </label>
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) =>
                    setPhotos(Array.from(e.target.files ?? []).map((f) => f.name).slice(0, 4))
                  }
                />
              </div>
            </div>

            <Button variant="hero" size="xl" className="mt-8 w-full" onClick={calculate}>
              <Calculator /> Calculate Estimated Value
            </Button>
          </div>

          <aside className="glass flex flex-col justify-between rounded-[2rem] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Smartphone className="size-5" />
                <span className="text-xs font-semibold tracking-widest uppercase">
                  Your quote
                </span>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Estimated Buyback Value</p>
              <p className="font-display text-4xl font-bold text-eco-gradient sm:text-5xl">
                {result === null ? "₹ —" : inr(result)}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Final value will be confirmed after physical inspection.
              </p>

              <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Cpu className="mt-0.5 size-4 shrink-0 text-primary" />
                  Price engine uses model, age, screen and battery health.
                </li>
                <li className="flex items-start gap-2">
                  <BatteryCharging className="mt-0.5 size-4 shrink-0 text-primary" />
                  Accessories and original box increase your payout.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  Free pickup, instant UPI or bank transfer.
                </li>
              </ul>
            </div>

            <Button variant="glass" size="lg" className="mt-8 w-full" asChild>
              <a href="#pickup">Book Free Pickup</a>
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
