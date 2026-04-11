import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SubscribeModal } from "@/components/SubscribeModal";

export default function Home() {
  return (
    <>
      <Nav />

      <section className="home-grid">
        <div className="hero-bar left"></div>
        <div className="hero-bar right"></div>
        <div className="home-left">
          <div className="hero-left">
            <h1 className="hero-quote">&ldquo;Defining the<br />Future of<br />Change<br />Management&rdquo;</h1>
          </div>
          <div className="split-l">
            <span className="email-heading">Get Exclusive Change Management Tips</span>
            <SubscribeModal />
          </div>
        </div>
        <div className="home-right">
          <div className="hero-right">
            <h2>Why do so many change initiatives fail even when organisations follow the right frameworks?</h2>
            <p>Most organisations invest heavily in change methodologies, tools, and structured approaches, yet outcomes still fall short. The issue is rarely the framework itself. It is how well it is translated into real behaviour, alignment, and understanding across the organisation. There is often a missing layer between knowing the process and enabling true adoption.</p>
            <Link href="/knowledge" className="btn">Explore Topics</Link>
          </div>
          <div className="split-r">
            <div className="article-item">
              <h3>Are you actually leading change or just managing tasks through a change plan?</h3>
              <p>Change plans can create a sense of control, but control is not the same as leadership. Many professionals find themselves focused on activities, timelines, and deliverables without fully engaging with how people are experiencing the change. Real leadership goes beyond execution. It shapes understanding, belief, and commitment.</p>
              <Link href="/change-bites" className="btn">Read More</Link>
            </div>
            <div className="article-item">
              <h3>Why does change fail when people understand the process but not the experience?</h3>
              <p>Even when communication is clear and processes are well defined, change can still struggle to take hold. Understanding what needs to happen is not the same as experiencing what it feels like to change. Without addressing the human side of transition, clarity alone is not enough to drive lasting adoption.</p>
              <Link href="/change-bites" className="btn">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
