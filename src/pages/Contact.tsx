import Layout from "@/components/Layout";
import { Mail, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <section className="section-padding pt-28 min-h-[70vh]">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold mb-6">Get In Touch</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Interested in working together? I'd love to hear from you. Reach out
            via email or connect with me on LinkedIn.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:susanna.tatevosyan@uncoverit.co.uk"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
              susanna.tatevosyan@uncoverit.co.uk
            </a>
            <a
              href="https://www.linkedin.com/in/susanna-tatevosyan-b17ab081/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
