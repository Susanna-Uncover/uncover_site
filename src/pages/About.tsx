import Layout from "@/components/Layout";
import susannaBw from "@/assets/susanna-bw.jpg";
import { Briefcase, GraduationCap, Award, Globe, Mail, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skills = [
  "Python", "SQL", "Tableau", "Power BI",
  "Data Cleaning & Transformation", "Statistical Analysis",
  "Survey Design & Quantitative Analysis", "Qualitative Research Methodologies",
  "Insight Synthesis & Reporting", "Presenting & Storytelling",
  "End-to-end Project Delivery", "Client & Stakeholder Management",
];

const experience = [
  {
    period: "2021 – Present",
    title: "Data Analyst & Insight Consultant",
    company: "Uncover (Independent)",
    bullets: [
      "Delivers data analysis and mixed-methods research projects for agencies and direct clients across healthcare, insurance, finance, and FMCG.",
      "Owns end-to-end project workflows from scoping and data collection through to cleaning, analysis, visualisation, and strategic delivery to senior stakeholders.",
      "Combines commercial research expertise with technical analytics skills using Python, SQL, and visualisation tools (Tableau, Power BI).",
      "Generated £100k+ in follow-up projects through proactive client development.",
    ],
  },
  {
    period: "2018 – 2021",
    title: "Research Manager",
    company: "EssenceMediacom",
    bullets: [
      "Led insight projects for public and commercial sector clients within a major media agency.",
      "Key contributor to new business development, shaping insight narratives and methodology for pitches.",
      "Presented award-winning research on Women's Football at MRG 2019 and MRS & More 2020 conferences.",
      "Championed insight for three successful company pitches, achieving top internal scores for insight quality.",
    ],
  },
  {
    period: "2015 – 2018",
    title: "Associate Consultant",
    company: "C Space",
    bullets: [
      "Delivered mixed-methods research programs across online communities and qualitative projects for AFKLM, The Body Shop, Google, Samsung.",
      "Partnered with senior consultants to translate insight into actionable recommendations shaping product development and brand positioning.",
      "Awarded two internal Impact Awards for research linked to measurable commercial outcomes.",
    ],
  },
  {
    period: "2025 – Present",
    title: "AI Evaluator & Senior Reviewer",
    company: "Scale AI",
    bullets: [
      "Training and evaluating LLMs on advanced programming and analytical problems.",
      "Promoted to Senior Reviewer for the quality and consistency of output.",
    ],
  },
];

const education = [
  {
    period: "2020 – 2023",
    title: "MSc Computer Science with Data Analytics",
    institution: "University of York",
  },
  {
    period: "2010 – 2013",
    title: "BA (Hons) Fashion & Textiles, First Class",
    institution: "University of West London",
  },
];

const certifications = [
  "Microsoft – Power BI Data Analyst",
  "Google – Data Analytics",
  "Tableau – Business Intelligence",
  "UC Davis – Data Viz with Tableau",
  "Google – Creating Business Value with Data and Looker",
  "IBM – RAG and Agentic AI",
  "Google – AI Leadership",
];

const languages = [
  { lang: "English", level: "Fluent" },
  { lang: "Estonian", level: "Fluent" },
  { lang: "Russian", level: "Fluent" },
  { lang: "Spanish", level: "Conversational" },
];

const About = () => (
  <Layout>
    {/* Hero / Intro */}
    <section className="section-padding pt-28 pb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <img
          src={susannaBw}
          alt="Susanna Tatevosyan"
          className="w-56 h-56 md:w-72 md:h-72 rounded-2xl object-cover shrink-0 border border-border"
        />
        <div>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">About Me</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Susanna <span className="text-gradient">Tatevosyan</span>
          </h1>
          <p className="text-primary font-medium mb-4">Data Analyst & Insight Consultant</p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
            Data analyst with hands-on experience in Python, SQL, and visualisation tools (Tableau, Power BI),
            backed by 10+ years translating complex data into actionable business recommendations.
            MSc in Computer Science with Data Analytics. Background in commercial research provides
            a strong foundation in problem framing, stakeholder communication, and delivering insight
            that drives decisions.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:susanna.tatevosyan@uncoverit.co.uk"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={16} /> susanna.tatevosyan@uncoverit.co.uk
            </a>
            <a
              href="https://www.linkedin.com/in/susanna-tatevosyan-b17ab081/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="section-padding py-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Expertise</p>
        <h2 className="font-display text-3xl font-bold mb-6">Key Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm px-4 py-1.5">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>

    {/* Experience Timeline */}
    <section className="section-padding py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase size={24} className="text-primary" />
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-1">Career</p>
            <h2 className="font-display text-3xl font-bold">Professional Experience</h2>
          </div>
        </div>

        <div className="relative border-l-2 border-border ml-4 pl-8 space-y-10">
          {experience.map((job, i) => (
            <div key={i} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">{job.period}</span>
              <h3 className="font-display text-xl font-semibold mt-1">{job.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{job.company}</p>
              <ul className="space-y-2">
                {job.bullets.map((b, j) => (
                  <li key={j} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Education & Certifications */}
    <section className="section-padding py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={24} className="text-primary" />
            <h2 className="font-display text-3xl font-bold">Education</h2>
          </div>
          <div className="relative border-l-2 border-border ml-4 pl-8 space-y-8">
            {education.map((edu, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <span className="text-xs text-primary font-medium tracking-wider uppercase">{edu.period}</span>
                <h3 className="font-display text-lg font-semibold mt-1">{edu.title}</h3>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-primary" />
            <h2 className="font-display text-3xl font-bold">Certifications</h2>
          </div>
          <ul className="space-y-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                <span className="text-primary mt-0.5 shrink-0">✓</span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Languages */}
    <section className="section-padding py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Globe size={24} className="text-primary" />
          <h2 className="font-display text-3xl font-bold">Languages</h2>
        </div>
        <div className="flex flex-wrap gap-6">
          {languages.map((l) => (
            <div key={l.lang} className="text-center">
              <p className="font-display font-semibold text-lg">{l.lang}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">{l.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
