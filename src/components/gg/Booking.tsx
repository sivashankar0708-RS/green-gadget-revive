import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "./SectionHeading";
import { inr } from "./data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(300),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  pincode: z.string().trim().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  date: z.string().min(1, "Choose a preferred date"),
  slot: z.string().min(1, "Choose a preferred time"),
  device: z.string().trim().min(2, "Enter the device you want to sell").max(120),
});

const slots = ["09:00 AM - 12:00 PM", "12:00 PM - 03:00 PM", "03:00 PM - 06:00 PM", "06:00 PM - 08:00 PM"];

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function Booking({ estimate, device }: { estimate: number | null; device: string }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    date: "",
    slot: "",
    device: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [open, setOpen] = useState(false);
  const [pickupId, setPickupId] = useState("");

  useEffect(() => {
    if (device) setForm((f) => ({ ...f, device }));
  }, [device]);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    const id = `GG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setPickupId(id);
    setOpen(true);
    toast.success("Pickup scheduled", { description: `Your pickup ID is ${id}.` });
  };

  const field = (k: keyof typeof form) =>
    errors[k] ? <p className="text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <section id="pickup" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pickup booking"
          title={
            <>
              Book a <span className="text-eco-gradient">free doorstep pickup</span>
            </>
          }
          subtitle="Our verified agent arrives with a sealed bag, inspects on the spot and pays instantly."
        />

        <form onSubmit={submit} noValidate className="glass mt-12 grid gap-5 rounded-[2rem] p-6 sm:grid-cols-2 sm:p-8">
          <div className="grid gap-2">
            <Label htmlFor="name">Customer Name</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Aditya Sharma" />
            {field("name")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" inputMode="numeric" maxLength={10} value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" />
            {field("mobile")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            {field("email")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="device">Device</Label>
            <Input id="device" value={form.device} onChange={(e) => set("device", e.target.value)} placeholder="Apple iPhone 13 (Smartphone)" />
            {field("device")}
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="address">Pickup Address</Label>
            <Textarea id="address" rows={3} maxLength={300} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Flat 402, Green Residency, Anna Nagar" />
            {field("address")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Chennai" />
            {field("city")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} placeholder="600040" />
            {field("pincode")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            {field("date")}
          </div>
          <div className="grid gap-2">
            <Label>Preferred Time</Label>
            <Select value={form.slot} onValueChange={(v) => set("slot", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field("slot")}
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Estimated Value</Label>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {estimate === null ? "Run the estimator to see your quote" : "Quote from estimator"}
              </span>
              <span className="font-display text-xl font-bold text-eco-gradient">
                {estimate === null ? "₹ —" : inr(estimate)}
              </span>
            </div>
          </div>

          <Button type="submit" variant="hero" size="xl" className="sm:col-span-2">
            <CalendarCheck /> Book Pickup
          </Button>
        </form>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <CheckCircle2 className="size-6 text-primary" /> Pickup Scheduled Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Thanks {form.name.split(" ")[0] || "there"}! Our agent will reach {form.city || "your city"} on{" "}
              {form.date} between {form.slot}.
            </p>
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4">
              <p className="text-xs text-muted-foreground">Your pickup ID</p>
              <p className="font-display text-2xl font-bold text-eco-gradient">{pickupId}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="glass"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard?.writeText(pickupId);
                  toast.success("Pickup ID copied");
                }}
              >
                <Copy /> Copy ID
              </Button>
              <Button variant="hero" className="flex-1" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
