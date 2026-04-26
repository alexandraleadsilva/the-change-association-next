# The Change Association - Project Handoff

> Use this document to onboard a new Claude session or any developer onto this project.
> Last updated: 2026-04-26

---

## What Is This?

A full Next.js website for **The Change Association (TCA)**, a change management professional body founded by Alexandra da Silva. The site includes a knowledge hub, interactive web-based tools, a visual dashboard, passwordless authentication, and database persistence. It is live at **thechangeassociation.com**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router, Turbopack) |
| Hosting | Vercel |
| Database | Vercel Postgres (Neon) |
| Auth | Passwordless OTP via Resend + JWT sessions (jose) |
| Email sender | noreply@thechangeassociation.com (via Resend) |
| Business email | general@thechangeassociation.com (Google Workspace) |
| DNS | Squarespace |
| Domain | thechangeassociation.com |
| Repo | github.com/alexandraleadsilva/the-change-association-next |

---

## Accounts & Services

| Service | Account / Details |
|---|---|
| **GitHub** | alexandraleadsilva - hosts the repo |
| **Vercel** | Linked to the GitHub account above - hosts the site and Postgres database |
| **Google Workspace** | general@thechangeassociation.com - business email |
| **Resend** | Sends transactional emails from noreply@thechangeassociation.com (OTP codes) |
| **Google Search Console** | Registered for thechangeassociation.com - SEO monitoring and indexing |
| **Squarespace** | DNS management for thechangeassociation.com domain |

---

## Environment Variables (Vercel)

| Variable | Purpose |
|---|---|
| `POSTGRES_URL` (+ related) | Vercel Postgres connection (auto-set by Vercel integration) |
| `AUTH_SECRET` | JWT signing secret for sessions |
| `RESEND_API_KEY` | Resend API key for sending OTP emails |

---

## Project Structure

```
app/
  layout.tsx              Root layout
  page.tsx                Homepage
  globals.css             All global CSS
  about/                  About TCA page
  contact/                Contact form
  knowledge/              Knowledge hub index + 31 article routes
  tools/                  Tools index + 11 interactive tool routes
  change-bites/           14 short-form popup articles
  dashboard/              Visual dashboard (dynamic import, ssr:false)
    page.tsx              Thin wrapper with dynamic import
    DashboardContent.tsx  Actual dashboard component
    layout.tsx            Metadata only
  api/
    auth/send-code/       Sends OTP email, saves to Google Sheet
    auth/verify-code/     Verifies OTP from DB, creates JWT cookie
    auth/session/         Returns current session state
    auth/logout/          Clears session cookie
    tools/                GET/POST/DELETE tool data
    projects/             Returns distinct project names
    contact/              Contact form handler
    subscribe/            Newsletter subscribe handler
    setup-db/             Creates DB tables (users, tool_data, otp_codes)
components/
  Nav.tsx                 Navigation with auth state cached in localStorage
  Footer.tsx              Site footer
  AuthModal.tsx           Email input -> OTP code flow
  SignInPrompt.tsx        Callout for non-signed-in users
  ToolLayout.tsx          Two-column layout for tools (sticky left sidebar)
  ProjectSelector.tsx     Shared project dropdown across all tools
  DashboardCharts.tsx     GaugeChart, DonutChart, BarMeter, getColour
  ArticleSchema.tsx       JSON-LD structured data for articles
  ArticleLink.tsx         Cross-linking component for knowledge articles
  ScrollReveal.tsx        Scroll-triggered animations
  ChangeFeed.tsx          News feed component
  SubscribeModal.tsx      Newsletter signup modal
  TCAModelDiagram.tsx     Visual model diagram
  Logo.tsx                SVG logo
  PageTransition.tsx      Page transition wrapper
  SaveIndicator.tsx       (exists but intentionally hidden per user preference)
lib/
  auth.ts                 OTP storage in Postgres, JWT create/verify with jose
  useToolData.ts          Hook: auto-load on mount, auto-save with 1.5s debounce
data/
  feed.ts                 Change Feed entries with real news stories
  demo-tools.ts           getDemoTools() - sample data for dashboard
  demo-dashboard.json     (may be unused, was part of Turbopack debugging)
public/
  img/                    mission.jpg, vision.jpg
  css/                    Minimal
```

---

## The 31 Knowledge Articles

Organised under the TCA Change Model with 5 pillars:

**Direction:** executive-sponsorship, burning-platform, change-charter, defining-success, change-frameworks, leading-vs-managing-change, project-vs-change-success

**Engagement:** stakeholder-strategy, crafting-narrative, communication-planning, building-sponsorship, resistance-management, change-experience

**Enablement:** current-state-assessment, gap-analysis, role-clarity, learning-design, process-design, tools-and-systems, change-impact-assessment

**Execution:** phased-approach, delivery-cadence, governance, multi-site-change, restructure-timing, performance-alignment

**Sustainment:** reinforcement-planning, adoption-metrics, benefits-realisation, culture-integration, continuous-improvement

Each article has:
- `layout.tsx` with metadata + ArticleSchema (JSON-LD)
- `page.tsx` with progressive disclosure interactive content

---

## The 11 Interactive Tools

All tools use `ToolLayout` (two-column with sticky sidebar) + `useToolData` hook for auto-save/load + `ProjectSelector` for shared projects.

1. **Readiness Assessment** - Score 5 dimensions (People, Process, Culture, Capability, Systems) on a 1-5 scale
2. **Stakeholder Map** - Add stakeholders with position (champion/supporter/neutral/resistant/blocker)
3. **Charter Builder** - 7 sections (Strategic Context, Case for Change, Scope, Approach, Governance, Success Criteria, Risks)
4. **Communication Planner** - Entries with status (complete/in-progress/planned)
5. **Sponsor Roadmap** - 5 phases (Direction, Engagement, Enablement, Execution, Sustainment) with actions
6. **Resistance Tracker** - Signals with severity (high/medium/low) and status
7. **Benefits Register** - Benefits with status (on-track/at-risk/not-started)
8. **Adoption Scorecard** - 5 stages (Awareness, Understanding, Trial, Adoption, Proficiency) scored 0-5
9. **Culture Tracker** - 5 indicators scored as not-yet/emerging/established/embedded
10. **Impact Matrix** - Impact groups
11. **Training Matrix** - Training items

---

## Dashboard

Located at `/dashboard`. Uses dynamic import with `ssr: false` to avoid a Turbopack minification bug.

**Layout:**
- Row 1 (full width): Readiness gauge + dimension bar meters
- Row 2 (3 cols): Stakeholder donut | Charter gauge | Communication donut
- Row 3 (3 cols): Sponsor phase tracker | Resistance donut | Benefits donut
- Row 4 (2 cols): Adoption bar meters | Culture bar meters

**Two modes:**
- Not signed in: Shows sample data with sign-in banner
- Signed in: Shows real data from user's tools

**Critical note:** The dashboard had persistent issues with Turbopack's minifier causing `ReferenceError: Cannot access 'XX' before initialization`. The fix was: (1) dynamic import with ssr:false in page.tsx, (2) chart components extracted to DashboardCharts.tsx, (3) no complex object literals at module level. Do not refactor these patterns without testing the production build.

---

## Authentication Flow

1. User enters email in AuthModal
2. `/api/auth/send-code` generates 6-digit OTP, stores in `otp_codes` table (Postgres), sends via Resend
3. User enters code
4. `/api/auth/verify-code` checks against DB, creates JWT session cookie (httpOnly, 30 days)
5. Nav.tsx caches auth state in localStorage to prevent flash on navigation

**Important:** OTP codes are stored in Postgres, NOT in-memory. In-memory storage failed on Vercel serverless because each request can hit a different instance.

---

## Google Sheets Integration

Email signups are also saved to a Google Sheet via Google Apps Script webhook. The webhook URL is in the send-code API route.

---

## SEO Setup

- `app/sitemap.ts` - Programmatic sitemap covering all pages
- `app/robots.ts` - Robots.txt
- `ArticleSchema.tsx` - JSON-LD structured data on every knowledge article
- Site is registered in Google Search Console
- Currently 35 pages discovered but not yet indexed (normal for new site, use URL Inspection tool to request indexing)

---

## Key Conventions & User Preferences

- Use "program" not "programme" everywhere
- No dashes in content
- No emojis anywhere
- SaveIndicator should not be visible to users
- SignInPrompt should appear on every tool page navigation
- ProjectSelector is shared across all tools
- All inline styles (no CSS modules or Tailwind)
- CSS variables defined in globals.css: --navy, --cream, --gold, --border, --text-dark, --text-mid, --serif, --ui
- Font stack: DM Serif Display (--serif), DM Sans (--ui)

---

## Deployment

```bash
cd /Users/alexandradsilva/the-change-association-next
git add <files>
git commit -m "message"
git push
vercel --prod --force
```

The `--force` flag skips build cache, which is sometimes needed after complex changes.

---

## Database Tables

Created via `/api/setup-db`:
- `users` - email, created_at
- `tool_data` - user_id, tool_type, data (JSONB), updated_at
- `otp_codes` - email, code, expires_at

---

## Future Plans

- Subscription/membership model for gating knowledge content
- Certification program
- Potentially more tools beyond the current 11
- Content gating: some knowledge articles behind membership paywall

---

## Common Gotchas

1. **Turbopack minification bug**: Don't put complex nested objects at module level in dashboard components. Use dynamic import with ssr:false.
2. **OTP first-code-invalid**: Was caused by in-memory OTP storage on serverless. Fixed by using Postgres. Don't revert.
3. **Auth flash on navigation**: Solved by caching in localStorage. The `mounted` state guard in Nav.tsx prevents hydration mismatch.
4. **Build from correct directory**: Always run commands from `/Users/alexandradsilva/the-change-association-next`.
5. **Git push auth**: If push fails, may need `gh auth refresh -s workflow`.
