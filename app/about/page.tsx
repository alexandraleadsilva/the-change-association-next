import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | The Change Association",
};

export default function About() {
  return (
    <>
      <Nav />

      <section className="about-text">
        <p>At The Change Association, we believe change is not a checklist. It is a human experience.</p>
        <p>Too often, organisations are given tools, frameworks, and playbooks and are expected to deliver transformation. Yet without a deep understanding of people, how they think, feel, and respond to change, these efforts fall short. Change becomes something to complete rather than something to lead.</p>
        <p>We exist to change that.</p>
        <p>The Change Association is a body of professionals committed to leading change in a way that is practical, centred on people, and grounded in real impact. Together, we are raising the standard of how change is understood, led, and delivered across organisations.</p>
        <p>This is not about applying another framework. It is about building the capability, confidence, and judgement to lead change when it matters most.</p>
        <p>Because meaningful change does not happen through process alone. <strong>It happens through people.</strong></p>
      </section>

      <hr className="section-divider" />

      <div className="mv-split">
        <div className="mv-image workshop">
          <span className="img-placeholder-note">Add workshop photo here</span>
        </div>
        <div className="mv-content">
          <h2>Mission</h2>
          <p>To equip and certify professionals who lead change that delivers real and lasting impact.</p>
        </div>
      </div>

      <div className="mv-split">
        <div className="mv-content vision-text">
          <h2>Vision</h2>
          <p>To shape the future of change by setting the global standard for human centred and impactful change leadership.</p>
        </div>
        <div className="mv-image globe">
          <div className="globe-glow"></div>
        </div>
      </div>

      <Footer showAbout />
    </>
  );
}
