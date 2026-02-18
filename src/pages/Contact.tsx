import Layout from "@/components/Layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <Layout>
      <section className="section-padding pt-28 min-h-[70vh]">
        <div className="max-w-2xl mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold mb-6">Get In Touch</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Interested in working together? I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 mb-10">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can I help you?"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={sending} className="w-full">
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            <a href="mailto:susanna.tatevosyan@uncoverit.co.uk" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail size={18} /> susanna.tatevosyan@uncoverit.co.uk
            </a>
            <a href="https://www.linkedin.com/in/susanna-tatevosyan-b17ab081/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Linkedin size={18} /> LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
