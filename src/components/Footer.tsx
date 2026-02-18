import { Mail, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border section-padding py-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} UncoverIt. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="mailto:susanna.tatevosyan@uncoverit.co.uk" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={18} />
        </a>
        <a href="https://www.linkedin.com/in/susanna-tatevosyan-b17ab081/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
