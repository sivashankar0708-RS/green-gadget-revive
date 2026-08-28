import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "./SectionHeading";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Please add a subject").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Facebook, label: "Facebook" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Errors] = issue.message;
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    toast.success("Message sent!", { description: "Our team replies within one business day." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="circuit-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Talk to the <span className="text-eco-gradient">GreenGadget team</span>
            </>
          }
          subtitle="Questions about pricing, bulk pickups or campus e-waste drives? We are happy to help."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <div className="glass rounded-3xl p-6">
              <a href="mailto:support@greengadget.in" className="flex items-center gap-4 group">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                  <Mail className="size-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium group-hover:text-primary">support@greengadget.in</p>
                </div>
              </a>
              <a href="tel:+919876543210" className="mt-5 flex items-center gap-4 group">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                  <Phone className="size-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium group-hover:text-primary">+91 98765 43210</p>
                </div>
              </a>
              <div className="mt-5 flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                  <MapPin className="size-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Business address</p>
                  <p className="text-sm font-medium">
                    2nd Floor, TechHub Tower, Anna Salai, Chennai 600002
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      aria-label={s.label}
                      onClick={() => toast.info(`GreenGadget on ${s.label}`, { description: "@greengadget.in" })}
                      className="grid size-10 place-items-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass relative flex h-56 items-center justify-center overflow-hidden rounded-3xl">
              <div className="circuit-pattern absolute inset-0" aria-hidden="true" />
              <div className="relative text-center">
                <MapPin className="mx-auto size-7 text-primary" />
                <p className="mt-2 text-sm font-medium">GreenGadget HQ · Chennai</p>
                <p className="text-xs text-muted-foreground">Interactive map placeholder</p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="glass grid gap-5 rounded-[2rem] p-6 sm:grid-cols-2 sm:p-8">
            <div className="grid gap-2">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="c-subject">Subject</Label>
              <Input id="c-subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="Bulk pickup for our office" />
              {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" rows={5} maxLength={1000} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us how we can help…" />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="xl" className="sm:col-span-2">
              <Send /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
