import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SubscribeModal } from "@/components/SubscribeModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ChangeFeed } from "@/components/ChangeFeed";

export default function Home() {
  return (
    <>
      <Nav />

      <section className="home-grid">
        <div className="hero-bar left"></div>
        <div className="hero-bar right"></div>
        <div className="home-left">
          <ScrollReveal direction="left" className="hero-left">
            <h1 className="hero-quote">&ldquo;Defining the<br />Future of<br />Change<br />Management&rdquo;</h1>
          </ScrollReveal>

          <div className="home-cards">
            <ScrollReveal direction="up" delay={100}>
              <Link href="/knowledge" className="home-card">
                <span className="home-card-label">Knowledge Hub</span>
                <span className="home-card-title">The TCA Change Model</span>
                <span className="home-card-desc">A five-pillar framework for leading change that lasts. Explore Direction, Engagement, Enablement, Execution, and Sustainment.</span>
                <span className="home-card-link">Explore the model &rarr;</span>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <Link href="/change-bites" className="home-card">
                <span className="home-card-label">Change Bites</span>
                <span className="home-card-title">Sharp thinking on change</span>
                <span className="home-card-desc">Short, direct articles on the questions change professionals are actually asking.</span>
                <span className="home-card-link">Read articles &rarr;</span>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <Link href="/contact" className="home-card">
                <span className="home-card-label">Get Involved</span>
                <span className="home-card-title">Join the conversation</span>
                <span className="home-card-desc">Interested in certifications, contributing to the knowledge hub, or partnering with us? Get in touch.</span>
                <span className="home-card-link">Contact us &rarr;</span>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={400} className="split-l">
            <span className="email-heading">Get Exclusive Change Management Tips</span>
            <SubscribeModal />
          </ScrollReveal>
        </div>
        <div className="home-right">
          <ChangeFeed limit={5} />
        </div>
      </section>

      <Footer />
    </>
  );
}
