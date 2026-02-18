import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="section-padding min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">About</p>
        <h1 className="font-display text-4xl font-bold mb-6">About Me</h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Content coming soon — we'll fill this page out together with your background,
          skills, experience, and what drives your research work.
        </p>
      </div>
    </section>
  </Layout>
);

export default About;
