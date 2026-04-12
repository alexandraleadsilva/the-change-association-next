import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "The Change Association is a professional body committed to leading change in a way that is practical, centred on people, and grounded in real impact.",
  alternates: { canonical: "https://thechangeassociation.com/about" },
};

export default function About() {
  return (
    <>
      <Nav />

      <section className="about-text">
        <ScrollReveal direction="up">
          <p>At The Change Association, we believe change is not a checklist. It is a human experience.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <p>Too often, organisations are given tools, frameworks, and playbooks and are expected to deliver transformation. Yet without a deep understanding of people, how they think, feel, and respond to change, these efforts fall short. Change becomes something to complete rather than something to lead.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <p>We exist to change that.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <p>The Change Association is a body of professionals committed to leading change in a way that is practical, centred on people, and grounded in real impact. Together, we are raising the standard of how change is understood, led, and delivered across organisations.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <p>This is not about applying another framework. It is about building the capability, confidence, and judgement to lead change when it matters most.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <p>Because meaningful change does not happen through process alone. <strong>It happens through people.</strong></p>
        </ScrollReveal>
      </section>

      <hr className="section-divider" />

      <div className="mv-split">
        <div className="mv-image mission-img"></div>
        <div className="mv-content">
          <ScrollReveal direction="right" delay={200}>
            <h2>Mission</h2>
            <p>To equip and certify professionals who lead change that delivers real and lasting impact.</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mv-split">
        <div className="mv-content">
          <ScrollReveal direction="left" delay={200}>
            <h2>Vision</h2>
            <p>To shape the future of change by setting the global standard for human centred and impactful change leadership.</p>
          </ScrollReveal>
        </div>
        <div className="mv-image vision-img"></div>
      </div>

      <Footer showAbout />
    </>
  );
}
