"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  DATA: Emotional Journey Stages                                     */
/* ------------------------------------------------------------------ */

interface JourneyStage {
  id: string;
  num: string;
  name: string;
  timeframe: string;
  colour: string;
  feeling: string;
  internalVoice: string;
  whatPeopleDo: string;
  whatLeadersShouldDo: string[];
  commonMistake: string;
}

const journeyStages: JourneyStage[] = [
  {
    id: "anticipation",
    num: "01",
    name: "Anticipation",
    timeframe: "Before the announcement",
    colour: "#B8860B",
    feeling: "Anxiety mixed with curiosity. People sense something is coming before anyone tells them. Rumours circulate. Quiet conversations happen in corridors and group chats. The emotional experience has already begun even though the change has not been announced.",
    internalVoice: "Something is happening. Nobody is telling us anything, but I can feel it. Should I be worried?",
    whatPeopleDo: "People watch leadership behaviour more closely than usual. They read into calendar invitations, closed-door meetings, and shifts in tone. They begin speculating with trusted colleagues. Some start updating their CVs, not because they want to leave, but because uncertainty feels safer when you have options.",
    whatLeadersShouldDo: [
      "Acknowledge that people can sense something is coming, even if you cannot share details yet. Silence in this stage is not neutral. It is anxiety-producing.",
      "Give a timeline for when information will be shared. People can tolerate uncertainty far better when they know when the uncertainty will end.",
      "Be visible. When leaders disappear into strategy sessions, people assume the worst. Being present and available, even without answers, reduces fear.",
    ],
    commonMistake: "Assuming that because nothing has been announced, the emotional journey has not started. By the time most organisations communicate the change, people have already been through weeks of anxiety. You are already behind.",
  },
  {
    id: "shock",
    num: "02",
    name: "Shock",
    timeframe: "The first 48 hours",
    colour: "#8B0000",
    feeling: "Disorientation. Even when people expected the change, the reality of hearing it confirmed produces a jolt. The brain is processing threat. People hear the words but do not fully absorb them. They are running the information through the filter of what it means for them personally.",
    internalVoice: "Wait. This is actually happening. What does this mean for me? For my team? Did they think about us at all?",
    whatPeopleDo: "People go quiet in town halls. They nod but are not processing. They immediately seek out trusted colleagues to compare interpretations. They fixate on what was not said rather than what was said. Some people feel relief because the uncertainty is over. Others feel betrayed if they were not consulted.",
    whatLeadersShouldDo: [
      "Do not expect understanding or buy-in in this stage. The goal is not agreement. The goal is to ensure people feel informed and respected.",
      "Repeat the key messages. People will not absorb everything the first time. Plan for multiple touchpoints in the first 48 hours, not just one announcement.",
      "Create space for questions immediately. Not next week. Not after the FAQ is published. Now. People need to feel heard, even if you cannot answer everything.",
      "Name the emotion. Saying 'we know this is a lot to take in' is not weakness. It is the single most trust-building thing a leader can do in this moment.",
    ],
    commonMistake: "Treating the announcement as a communication event rather than an emotional event. The PowerPoint deck is not the experience. The experience is the knot in someone's stomach as they wonder whether their job still exists.",
  },
  {
    id: "resistance",
    num: "03",
    name: "Resistance",
    timeframe: "Weeks 1 to 6",
    colour: "#4A0E0E",
    feeling: "Grief, anger, and self-protection. This is the valley. People are not resisting the change. They are processing the loss of what came before. The old way of working was familiar. It was safe. It was where they felt competent. The new way is unknown, and unknown means vulnerable.",
    internalVoice: "This is not going to work. They do not understand what we actually do. Why are they fixing something that was not broken? I have seen this before and it always fails.",
    whatPeopleDo: "Some people push back openly. Others comply on the surface but disengage underneath. Productivity drops. Side conversations increase. People test whether leadership is serious or whether this will quietly fade. The most talented people, those with the most options, begin considering whether they want to invest in the new reality or leave.",
    whatLeadersShouldDo: [
      "Do not pathologise resistance. It is not a problem to be solved. It is grief to be respected. People who resist are often the ones who cared most about what came before.",
      "Listen more than you explain. In this stage, repeating the business case does not help. People are not asking for more information. They are asking to be seen.",
      "Give people agency where you can. Resistance intensifies when people feel things are being done to them. Involve them in how the change is implemented, even if the what is not negotiable.",
      "Watch for the quiet ones. The loudest resisters are processing openly. The quiet ones may be shutting down. Both need attention.",
    ],
    commonMistake: "Trying to push through resistance faster. Every attempt to accelerate past this stage extends it. People need to grieve before they can explore. There is no shortcut through the valley.",
  },
  {
    id: "exploration",
    num: "04",
    name: "Exploration",
    timeframe: "Months 2 to 4",
    colour: "#2E6B4F",
    feeling: "Cautious optimism. The grief has not disappeared but it has become manageable. People are beginning to see possibilities in the new reality. They are experimenting, testing, trying things. They are still uncertain, but the uncertainty has shifted from threatening to curious.",
    internalVoice: "Okay. This is happening. Maybe I can make this work. Maybe there is something here for me. But I am watching closely, and if they break their promises, I am done.",
    whatPeopleDo: "People start asking constructive questions: how will this work? What skills do I need? Who can I learn from? They experiment with new tools or processes. They form new alliances. They compare the promise of the change with the reality of the change, and if they match, trust builds. If they do not, cynicism hardens.",
    whatLeadersShouldDo: [
      "Celebrate small wins visibly. People in the exploration stage need evidence that the change is working. Not grand announcements. Specific, concrete examples of something going well.",
      "Invest in capability. This is the stage where people discover what they do not know. If the organisation does not provide learning support now, the confidence gap becomes a commitment gap.",
      "Be honest about what is not working. If people are exploring and they encounter problems that leadership will not acknowledge, trust collapses. Honesty about imperfection builds more trust than pretending everything is on track.",
      "Connect people who are further along with those who are still uncertain. Peer influence is more powerful than leadership messaging in this stage.",
    ],
    commonMistake: "Declaring victory. Leaders often see the first signs of adoption and assume the change has landed. It has not. Exploration is fragile. It needs continued investment, continued honesty, and continued support.",
  },
  {
    id: "commitment",
    num: "05",
    name: "Commitment",
    timeframe: "Month 5 onwards",
    colour: "#0A1628",
    feeling: "Ownership. The change is no longer something being done to people. It is something they are part of. They have integrated it into their identity. They have developed new competence. They can see themselves in the future the change has created.",
    internalVoice: "This is how we work now. I can see why we did this. I am good at this. And I helped build it.",
    whatPeopleDo: "People stop talking about the change as something separate from their work. It has become their work. They mentor others. They advocate for the new way. They begin to forget what the old way felt like. Some people never reach this stage, and that is an important signal to pay attention to.",
    whatLeadersShouldDo: [
      "Recognise the journey, not just the outcome. People need to hear that what they went through mattered. That their struggle was seen. That their contribution to getting here is valued.",
      "Capture and share the stories. The most powerful reinforcement of change is not data. It is hearing a colleague say 'I was sceptical, and here is what changed my mind.'",
      "Look back honestly. What did the organisation do well? What did it get wrong? This reflection builds the organisational muscle for the next change.",
      "Watch for those who have not arrived. Not everyone will reach commitment on the same timeline. Some need more support. Some may need a different conversation about their future. Both are acts of care.",
    ],
    commonMistake: "Moving on too quickly. The moment commitment is reached, many organisations are already announcing the next change. People need time to consolidate before they can absorb another transition. Change fatigue is not about the volume of change. It is about never being given time to land.",
  },
];

/* ------------------------------------------------------------------ */
/*  DATA: Topic Sections (expandable)                                  */
/* ------------------------------------------------------------------ */

interface TopicItem {
  text: string;
  detail: string;
}

interface TopicSection {
  id: string;
  num: string;
  title: string;
  introduction: string;
  items: TopicItem[];
}

const topicSections: TopicSection[] = [
  {
    id: "why-change-fails",
    num: "01",
    title: "Why change fails when people understand the process but not the experience",
    introduction: "Most change programmes are designed around process: the milestones, the workstreams, the governance structures, and the training calendars. These are necessary. But they address only the visible half of the change. The invisible half is the experience: the fear of being incompetent in a new role, the grief of losing a team that took years to build, the exhaustion of holding uncertainty for months without resolution. When we design only for process and ignore experience, we create a gap. That gap is where change fails.",
    items: [
      {
        text: "Process tells people what is changing. Experience tells them what it feels like to change.",
        detail: "A project plan can tell someone that their role will evolve by Q3. But it cannot tell them what it feels like to sit in a meeting and realise they no longer understand the language being used. It cannot tell them what it feels like to go home and explain to their partner that their job might look different soon, but they do not know how. The experience of change is lived in the body, in the stomach, in the conversations people have when the door is closed. If we do not design for that, we are designing for a version of change that only exists on paper.",
      },
      {
        text: "Compliance is not commitment. People can follow a process while being emotionally disengaged.",
        detail: "Organisations often measure adoption through usage metrics, training completion rates, and process adherence. And those numbers can look healthy even when people are deeply disengaged. Someone can log into the new system every day and still feel alienated by the change. Someone can attend every workshop and still believe the change is a mistake. The gap between behavioural compliance and emotional commitment is where productivity quietly erodes, where innovation quietly dies, and where your best people quietly start looking for the door.",
      },
      {
        text: "The process-experience gap is largest for the people with the least power and the most at stake.",
        detail: "Senior leaders experience change as a decision they made. Middle managers experience it as a translation challenge. Frontline staff experience it as something that happened to them. The further you are from the decision, the larger the gap between what the process tells you and what the experience feels like. This is why change can look successful from the top and feel catastrophic from the bottom. And it is why the people who are most affected are often the last to be heard.",
      },
      {
        text: "Process assumes rationality. Experience is emotional, and that is not a weakness.",
        detail: "Change management methodologies are built on a rational model: diagnose, plan, communicate, train, reinforce. This is logical and necessary. But human beings do not process change rationally. They process it emotionally first. Fear arrives before analysis. Loss arrives before opportunity. Resistance arrives before understanding. When organisations treat emotion as irrational noise to be managed, they miss the signal. The emotional response is the truest data you have about how the change is actually landing.",
      },
      {
        text: "When the experience is ignored, people create their own narrative, and it is usually worse than reality.",
        detail: "In the absence of emotional acknowledgement, people fill the void with worst-case assumptions. If leadership does not name the difficulty, people assume it is being hidden. If no one acknowledges the loss, people assume no one cares. The stories people tell themselves in the silence are almost always more frightening than the truth. This is why experience-aware change management is not soft or optional. It is the difference between an organisation that moves through change together and one that fragments under the weight of unspoken fear.",
      },
    ],
  },
  {
    id: "emotional-journey",
    num: "02",
    title: "What the emotional journey of change actually looks like for the people going through it",
    introduction: "William Bridges described it as a transition: an ending, a neutral zone, and a new beginning. Elisabeth Kubler-Ross mapped the stages of grief that apply equally to organisational loss. Both models describe something true: change is not a single event. It is a journey with predictable emotional stages, and people move through them at different speeds. Our interpretation at TCA builds on this foundation but centres the experience on what people actually feel, not what theory says they should feel. The emotional journey map below is designed for leaders who want to meet their people where they are, not where the project plan says they should be.",
    items: [
      {
        text: "People do not move through the stages in a straight line. They loop, they regress, and they stall.",
        detail: "The emotional journey is not a conveyor belt. Someone can reach the exploration stage and then regress to resistance after a setback. Someone can oscillate between shock and anticipation for weeks. The stages are real, but the movement between them is messy and nonlinear. Leaders who expect linear progression will be frustrated. Leaders who expect human complexity will be prepared.",
      },
      {
        text: "Different people enter the journey at different times, and this creates friction between groups.",
        detail: "A senior leader who has been processing the change for six months is already in the exploration or commitment stage. They announce the change to a frontline team who is just entering shock. The leader cannot understand why people are not excited. The team cannot understand why the leader seems impatient. This timing gap is one of the most common and damaging dynamics in change. Both sides are responding appropriately for where they are in the journey. Neither can see the other's stage.",
      },
      {
        text: "The valley of resistance is where the real work happens. It is also where most organisations lose people.",
        detail: "The resistance stage is uncomfortable for everyone. Leaders want to move past it. Employees want to move past it. But resistance is where beliefs are being renegotiated, where identity is being reformed, and where the emotional foundation for commitment is being built. Organisations that try to rush through the valley, with more communications, more training, more pressure, often push people deeper into disengagement rather than pulling them through.",
      },
      {
        text: "One bad experience can reset someone's entire emotional journey back to the beginning.",
        detail: "A broken promise, a dismissive response from a manager, a change to the plan that was not communicated, discovering something through the grapevine rather than through the proper channels. Any of these can take someone who was cautiously exploring the new reality and send them back to shock or resistance. Trust is not built in announcements. It is built in hundreds of small moments. And it can be destroyed in one.",
      },
      {
        text: "Reaching commitment is not permanent. It needs to be sustained.",
        detail: "People who have committed to the new way of working can be pulled back into resistance if the organisation does not honour the deal. If the promised support does not materialise, if the values espoused during the change are contradicted by leadership behaviour, if another change arrives before this one has landed, commitment can dissolve. Reaching the end of the journey is not the end. It is the beginning of a new responsibility: to maintain what was built.",
      },
    ],
  },
  {
    id: "touchpoint-design",
    num: "03",
    title: "How to design change touchpoints that build trust instead of eroding it",
    introduction: "Every change programme has touchpoints: the moments when the organisation makes contact with the people going through the change. The first announcement. The first training session. The first day on the new system. The first time something goes wrong. Each of these moments is a trust decision. The organisation either builds trust or erodes it, and there is no neutral ground. Most touchpoints are designed for information transfer. The most effective touchpoints are designed for trust.",
    items: [
      {
        text: "Trust is built in the moments that matter, not in the volume of communication.",
        detail: "Organisations often respond to low trust by increasing communication: more emails, more town halls, more FAQs, more intranet updates. But the problem is rarely the volume. It is the quality of the moments that count. One honest conversation with a manager who says 'I do not have all the answers, but I am here and I will find out' builds more trust than twenty carefully crafted emails. Trust is not a communication problem. It is a relationship problem, and relationships are built in specific moments.",
      },
      {
        text: "The gap between what the organisation says and what people experience is where trust dies.",
        detail: "When the town hall says 'your voice matters' but no one follows up on the questions that were asked. When the email says 'we are committed to supporting you' but the training budget has been cut. When the CEO says 'we are in this together' but the leadership team's bonuses are untouched. People do not evaluate trust based on words. They evaluate it based on the gap between words and actions. Every touchpoint is a test of that gap.",
      },
      {
        text: "The most powerful touchpoints are the unscripted ones.",
        detail: "The touchpoints that build the most trust are often the ones that were not planned: a leader who stays after the town hall to talk with people one-on-one, a manager who calls someone who has been quiet to check in, a senior sponsor who publicly changes their mind based on frontline feedback. These moments matter more than any communication plan because they cannot be faked. They reveal what the organisation actually values, not what it says it values.",
      },
      {
        text: "Every touchpoint should answer the question: does this make people feel more seen or less seen?",
        detail: "This is the simplest and most powerful design test for any change touchpoint. After this interaction, will people feel that the organisation understands their experience? Or will they feel like a number in a rollout plan? A touchpoint that makes people feel seen builds trust even when the news is difficult. A touchpoint that makes people feel invisible erodes trust even when the news is positive. The content matters less than the experience of being acknowledged.",
      },
      {
        text: "Trust accumulated slowly can be spent quickly, but only if it was real to begin with.",
        detail: "There will be moments when things go wrong. A timeline slips. A promise cannot be kept. A decision has to change. In those moments, the organisation draws on the trust it has built. If the trust was real, if it was built through genuine honesty and consistent follow-through, people will extend grace. If the trust was performative, if it was built through polished communications that masked a different reality, the first setback will reveal the gap. Trust is not a reserve you build for emergencies. It is the quality of the relationship you build every day.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  DATA: Touchpoint Trust Cards                                       */
/* ------------------------------------------------------------------ */

interface TouchpointCard {
  id: string;
  moment: string;
  timeframe: string;
  buildsTrust: string[];
  erodesTrust: string[];
  keyPrinciple: string;
}

const touchpointCards: TouchpointCard[] = [
  {
    id: "announcement",
    moment: "The First Announcement",
    timeframe: "Day 1",
    buildsTrust: [
      "Delivering the message through a leader people know and trust, not a corporate communications team.",
      "Acknowledging the emotional impact directly: 'We know this is a lot to absorb, and we know some of you will feel anxious.'",
      "Being honest about what is not yet decided. Saying 'we do not have all the answers yet, and we will share them as soon as we do' builds more trust than pretending certainty.",
      "Creating immediate space for questions, even if the answer to most of them is 'we are still working on that'.",
    ],
    erodesTrust: [
      "Sending an email before having a conversation. If people learn about the change from their inbox rather than from a human being, trust starts at a deficit.",
      "Using corporate language that distances leadership from the human impact: 'workforce optimisation', 'synergy realisation', 'resource rebalancing'.",
      "Focusing exclusively on the business rationale without acknowledging what people are feeling.",
      "Preventing managers from talking to their teams until the official messaging is approved. By the time the message is polished, the rumour mill has filled the void.",
    ],
    keyPrinciple: "The first announcement sets the emotional tone for the entire change. People will not remember the slides. They will remember how they felt when they heard the news and whether anyone seemed to care.",
  },
  {
    id: "first-day",
    moment: "The First Day of Change",
    timeframe: "Go-live or restructure day",
    buildsTrust: [
      "Having leaders and managers visible and available, not in meetings. This is the day to walk the floor, not run the programme.",
      "Providing practical support at the point of need. Not a link to an intranet page. A real person who can help when the new system does not work or the new process is confusing.",
      "Acknowledging publicly that the first day will be messy and that is expected. Normalising imperfection reduces anxiety.",
      "Checking in with individuals, not just teams. A personal message from a manager makes people feel seen in a way that a group email never will.",
    ],
    erodesTrust: [
      "Being absent. If the leadership team is in a programme review meeting on go-live day while frontline staff are struggling, the message is unmistakable: the plan matters more than the people.",
      "Expecting competence on day one. If people feel judged for struggling with something new, they will stop trying and start hiding.",
      "Celebrating the launch while people are still processing the loss. Tone-deaf celebrations in the middle of genuine difficulty create resentment.",
      "Responding to problems with 'that should not be happening' instead of 'thank you for telling us, we will fix it'.",
    ],
    keyPrinciple: "The first day of change is not a milestone to celebrate. It is a vulnerability to honour. People are doing something new and unfamiliar, and they need to know that struggling is safe.",
  },
  {
    id: "first-month",
    moment: "The First Month",
    timeframe: "Weeks 2 to 4",
    buildsTrust: [
      "Following up on commitments made during the announcement. If you said you would share more information by a certain date, share it. If the date has slipped, explain why.",
      "Creating structured opportunities for feedback that actually lead to visible action. Not a survey that disappears into a dashboard. A conversation that leads to a change people can see.",
      "Sharing early wins honestly, including what was harder than expected. People trust leaders who share the full picture, not just the positive version.",
      "Equipping managers to have one-on-one conversations about how each person is doing, not just whether they have completed their training modules.",
    ],
    erodesTrust: [
      "Going quiet. The announcement was high-energy. The first day had support. Then silence. The organisation has moved on to the next priority, but the people in the change have not. The silence says: you are on your own now.",
      "Ignoring feedback. People were asked for their input, they gave it honestly, and nothing visibly changed. This teaches people that feedback is performative.",
      "Measuring adoption without measuring experience. Tracking system logins while ignoring whether people feel supported or capable tells people what the organisation actually cares about.",
      "Punishing the early struggles. If the first month's performance dip is met with pressure rather than patience, people learn that the organisation's commitment to supporting them was rhetoric, not reality.",
    ],
    keyPrinciple: "The first month is when the organisation's words are tested against its actions. Every promise made during the announcement is now being silently audited by every person going through the change.",
  },
  {
    id: "first-setback",
    moment: "The First Setback",
    timeframe: "Whenever it happens",
    buildsTrust: [
      "Acknowledging the setback openly and promptly. Not minimising it. Not spinning it. Naming it for what it is.",
      "Taking responsibility where the organisation got it wrong, rather than blaming external factors or the people going through the change.",
      "Explaining what will change as a result. A setback that leads to visible learning and adjustment builds more trust than a change that went perfectly but learned nothing.",
      "Checking in on the people most affected. A setback is not just a programme issue. It is an emotional event for the people who trusted the plan and saw it falter.",
    ],
    erodesTrust: [
      "Pretending it did not happen. People noticed. They are watching. If leadership does not acknowledge the setback, people conclude that either leadership does not see it (incompetence) or does not care (indifference). Both destroy trust.",
      "Blaming the people. 'Adoption is slower than expected' often translates to 'we designed this poorly but we are measuring you, not us.' People can feel the difference between accountability and blame.",
      "Doubling down instead of adapting. When the response to a setback is more pressure, more communication, and more of the same approach, people lose faith that leadership is listening.",
      "Using the setback to justify reducing support. 'We need to be more efficient' after a setback often means cutting the very resources people were relying on. This is when trust collapse accelerates.",
    ],
    keyPrinciple: "The first setback is the most important touchpoint of the entire change. It is the moment when the organisation reveals whether its commitment to supporting people was genuine or performative. Handle it well, and trust deepens. Handle it poorly, and recovery may not be possible.",
  },
  {
    id: "three-months",
    moment: "Three Months In",
    timeframe: "The quiet crucible",
    buildsTrust: [
      "Revisiting the original narrative honestly. What did the organisation promise? What has it delivered? Where has it fallen short? This conversation, had openly, builds profound trust.",
      "Recognising the effort, not just the outcomes. People have been through an emotional journey. Acknowledging that journey publicly, 'this has been harder than we expected, and you have shown real resilience', costs nothing and means everything.",
      "Adjusting the plan based on what has been learned. Demonstrating that the organisation has listened, adapted, and improved based on people's real experience.",
      "Having honest conversations with those who are still struggling. Not everyone will be in the same place at three months. Some people need more support. Some may need a different conversation about their future. Both are acts of care.",
    ],
    erodesTrust: [
      "Declaring victory and moving on. If the organisation announces the next change initiative while people are still processing this one, the message is clear: your experience does not matter, only the portfolio timeline does.",
      "Removing support structures prematurely. The training team moves to the next project. The change champions are disbanded. The extra check-ins stop. People who still needed support learn that the organisation's patience has a budget line.",
      "Ignoring the people who left or disengaged. If talented people departed during the change and no one acknowledges it, the people who stayed wonder whether anyone would notice if they left too.",
      "Measuring only the business outcomes without measuring the human cost. If the change delivered its business case but left people exhausted, distrustful, and disengaged, it was not a success. It was an extraction.",
    ],
    keyPrinciple: "Three months in is where the organisation either consolidates trust or reveals that its commitment was temporary. The quiet moments after the intensity fades are where the real culture is built.",
  },
];

/* ------------------------------------------------------------------ */
/*  DATA: Enterprise Case Studies                                      */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Microsoft",
    headline: "Nadella did not just change Microsoft's strategy. He changed how change felt inside Microsoft.",
    hook: "He started by asking 130,000 people to be vulnerable. Then he went first.",
    dimension: "Emotional Journey",
    body: [
      "When Satya Nadella became CEO of Microsoft in 2014, the company was mired in what employees called a 'know-it-all' culture. Stack ranking had pitted employees against each other. Divisions operated as fiefdoms. The emotional experience of working at Microsoft was defined by fear: fear of being ranked, fear of being wrong, fear of losing.",
      "Nadella understood that changing Microsoft's strategy from Windows-centric to cloud-first was only the visible half of the transformation. The invisible half was the emotional experience. People needed to feel safe enough to learn, to fail, and to collaborate across the boundaries that had defined their careers.",
      "He introduced the language of 'growth mindset', drawn from Carol Dweck's research, and made it personal. He shared his own story of learning empathy through raising a son with cerebral palsy. He did not ask people to be vulnerable. He went first. He modelled the emotional journey he was asking 130,000 people to take.",
      "The results were structural and emotional. Stack ranking was eliminated. Performance reviews shifted from competitive to collaborative. Cross-team collaboration went from punished to rewarded. Microsoft's market capitalisation grew from $300 billion to over $3 trillion. But the deeper achievement was that the emotional experience of working at Microsoft changed. People felt safe enough to learn, and that safety became the foundation for everything else.",
    ],
    lesson: "Nadella demonstrates that transforming the emotional experience of change requires a leader who is willing to be emotionally honest first. Strategy provides direction. But the emotional safety to pursue it is what makes change real for the people living through it.",
    source: "https://hbr.org/2023/10/satya-nadellas-growth-mindset",
    sourceLabel: "Harvard Business Review",
  },
  {
    label: "Ford",
    headline: "Ford's EV transition revealed what happens when the experience gap meets industrial-scale change",
    hook: "The strategy was clear. The factory floor experience was anything but.",
    dimension: "Touchpoint Design",
    body: [
      "Ford's transition to electric vehicles under CEO Jim Farley, beginning in earnest in 2022 with the creation of Ford Model e, represented one of the most ambitious change programmes in manufacturing history. The strategic narrative was compelling: Ford would split into two entities, Ford Blue for internal combustion and Ford Model e for electric vehicles, to compete with Tesla and new EV entrants.",
      "The process was well-designed from a strategic perspective. The business case was clear. The market signals were undeniable. But on the factory floor and in the engineering divisions, the emotional experience was profoundly different from the boardroom narrative. Engineers who had spent decades perfecting internal combustion technology were told their expertise was part of the old world. Manufacturing workers at ICE plants watched investment flow to new EV facilities and wondered about their future.",
      "Ford encountered the experience gap at scale. The first announcement was strategically sound but emotionally incomplete. Workers at legacy plants reported feeling like 'the ones being left behind'. The touchpoint design focused on information transfer but missed the emotional reality: grief, identity loss, and uncertainty about whether decades of expertise still mattered.",
      "Ford has since invested significantly in retraining programmes, including partnerships with community colleges and the UAW to reskill workers for EV manufacturing. But the early experience gap, the distance between the strategy's clarity and the workers' emotional reality, created trust deficits that required sustained, deliberate effort to repair.",
    ],
    lesson: "Ford's EV transition illustrates that even the most strategically necessary change can fail at the human level if the emotional experience is not designed alongside the process. The factory floor does not experience strategy. It experiences touchpoints. And those touchpoints either build trust or erode it.",
    source: "https://www.reuters.com/business/autos-transportation/ford-professionalise-ev-unit-with-silicon-valley-talent-2023-03-02/",
    sourceLabel: "Reuters",
  },
  {
    label: "Unilever",
    headline: "Unilever's organisational redesign put experience at the centre and let people shape the change",
    hook: "They did not just communicate the new structure. They co-designed the emotional journey.",
    dimension: "Experience-Led Change",
    body: [
      "In 2022, Unilever undertook a significant organisational restructure, moving from a matrix structure to five distinct business groups, each with end-to-end responsibility. The change affected thousands of roles across dozens of countries. A restructure of this scale, touching reporting lines, decision rights, career paths, and team composition, is among the most emotionally intense changes an organisation can undertake.",
      "Under CEO Alan Jope and continued by Hein Schumacher, Unilever's approach to the restructure was notable for its attention to the human experience. Rather than designing the change centrally and cascading it down, Unilever invested in extensive co-creation with affected teams. People were not just told about the new structure. They were involved in shaping how it would work in practice, particularly at the team level where the daily experience of work lives.",
      "Unilever also invested in emotional support infrastructure: trained change champions embedded in every business group, manager coaching focused on having honest conversations about uncertainty, and a deliberate slowdown of the timeline when feedback indicated that people needed more time to process. The organisation chose pace over speed, recognising that sustainable change required emotional readiness, not just structural readiness.",
      "The restructure was not without difficulty. Role uncertainty persisted longer than planned in some regions. Some experienced leaders departed during the transition. But Unilever's willingness to treat the emotional experience as a design constraint, not an afterthought, meant that trust remained largely intact even through the most difficult moments.",
    ],
    lesson: "Unilever demonstrates that experience-led change is not about avoiding difficulty. It is about designing the difficulty with the same rigour applied to the strategy. When people are co-designers of their own change experience, they bring resilience that no communication plan can create.",
    source: "https://www.unilever.com/news/press-and-media/press-releases/2022/unilever-announces-new-organisational-structure/",
    sourceLabel: "Unilever",
  },
];

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

function ExpandableItems({ items }: { items: TopicItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li key={i} className="detail-list-item" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
          <div className="detail-list-item-head">
            {item.text}
            <span className={`detail-list-item-toggle${openIndex === i ? " open" : ""}`}>&rsaquo;</span>
          </div>
          {openIndex === i && (
            <div className="detail-list-item-body">{item.detail}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ChangeExperience() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [activeTouchpoint, setActiveTouchpoint] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "emotional", label: "We have mapped the emotional journey of the change, not just the project timeline" },
    { key: "acknowledged", label: "Leadership has publicly acknowledged the emotional difficulty of the change" },
    { key: "loss", label: "We have named what people are losing, not just what they are gaining" },
    { key: "timing", label: "We recognise that different groups are at different stages and have adjusted our approach accordingly" },
    { key: "touchpoints", label: "Our key touchpoints are designed for trust, not just information transfer" },
    { key: "managers", label: "Managers have been equipped to have honest, empathetic conversations with their teams" },
    { key: "feedback", label: "We have created genuine feedback loops where people's experience visibly shapes decisions" },
    { key: "setback", label: "We have a plan for how to handle the first setback that prioritises honesty over spin" },
    { key: "pace", label: "We are willing to slow down the timeline if the emotional readiness is not there" },
    { key: "sustained", label: "Our support structures will remain in place long enough for people to reach commitment, not just compliance" },
    { key: "measured", label: "We are measuring the human experience of the change, not just the business outcomes" },
    { key: "stories", label: "We are capturing and sharing the real stories of people's journeys through the change" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Engagement &middot; Change Experience</span>
          <h1 className="article-title">The change experience: why understanding the process is not enough</h1>
          <p className="article-intro">Change does not fail because people do not understand what is happening. It fails because no one acknowledged what it felt like. Every change programme has a process: the plan, the milestones, the communications calendar. But every change programme also has an experience: the fear of becoming incompetent, the grief of losing a team, the slow erosion of trust when promises do not match reality. This article is about the experience. It is about what change actually feels like for the people going through it, and how to design every touchpoint so that it builds trust instead of breaking it.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ============================================================ */}
      {/*  TOPIC 01: WHY CHANGE FAILS                                  */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">{topicSections[0].title}</h2>
          <p className="article-section-desc">{topicSections[0].introduction}</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandableItems items={topicSections[0].items} />
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  TOPIC 02: THE EMOTIONAL JOURNEY MAP                         */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">{topicSections[1].title}</h2>
          <p className="article-section-desc">{topicSections[1].introduction}</p>
        </ScrollReveal>

        {/* Visual Journey Timeline */}
        <ScrollReveal direction="up" delay={100}>
          <div style={{
            position: "relative",
            padding: "40px 0 24px",
          }}>
            {/* The journey line */}
            <div style={{
              position: "absolute",
              top: "60px",
              left: "24px",
              right: "24px",
              height: "4px",
              background: "linear-gradient(90deg, var(--gold) 0%, #8B0000 25%, #4A0E0E 45%, #2E6B4F 70%, var(--navy) 100%)",
              borderRadius: "2px",
              zIndex: 0,
            }} />

            {/* Valley curve SVG */}
            <div style={{
              position: "relative",
              width: "100%",
              height: "180px",
              marginBottom: "12px",
            }}>
              <svg
                viewBox="0 0 1000 180"
                preserveAspectRatio="none"
                style={{ width: "100%", height: "100%", overflow: "visible" }}
              >
                {/* The emotional curve */}
                <path
                  d="M 0 40 C 100 40, 150 30, 200 50 C 250 70, 280 140, 350 155 C 420 170, 480 165, 500 150 C 550 120, 620 70, 700 50 C 780 30, 850 20, 1000 15"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Labels on the curve */}
                <text x="50" y="30" fill="var(--gold)" fontSize="12" fontFamily="var(--ui)" fontWeight="600" textAnchor="middle" opacity="0.8">Anticipation</text>
                <text x="210" y="44" fill="#8B0000" fontSize="12" fontFamily="var(--ui)" fontWeight="600" textAnchor="middle" opacity="0.8">Shock</text>
                <text x="400" y="178" fill="#4A0E0E" fontSize="12" fontFamily="var(--ui)" fontWeight="600" textAnchor="middle" opacity="0.8">Resistance</text>
                <text x="660" y="44" fill="#2E6B4F" fontSize="12" fontFamily="var(--ui)" fontWeight="600" textAnchor="middle" opacity="0.8">Exploration</text>
                <text x="920" y="12" fill="var(--navy)" fontSize="12" fontFamily="var(--ui)" fontWeight="600" textAnchor="middle" opacity="0.8">Commitment</text>

                {/* Dots on the curve at each stage */}
                <circle cx="50" cy="40" r="6" fill="var(--gold)" />
                <circle cx="210" cy="52" r="6" fill="#8B0000" />
                <circle cx="400" cy="160" r="6" fill="#4A0E0E" />
                <circle cx="660" cy="50" r="6" fill="#2E6B4F" />
                <circle cx="920" cy="17" r="6" fill="var(--navy)" />

                {/* Valley label */}
                <text x="400" y="148" fill="#4A0E0E" fontSize="10" fontFamily="var(--ui)" fontWeight="500" textAnchor="middle" opacity="0.5">The Valley</text>
              </svg>
            </div>

            <p style={{
              fontFamily: "var(--ui)",
              fontSize: "12px",
              color: "var(--mid)",
              textAlign: "center",
              marginBottom: "32px",
              fontStyle: "italic",
            }}>
              The emotional journey of change. Based on Bridges&rsquo; Transition Model and the Kubler-Ross curve, adapted by TCA to centre the lived experience of the people going through the change.
            </p>

            {/* Stage cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {journeyStages.map((stage, i) => (
                <ScrollReveal key={stage.id} direction="up" delay={i * 80}>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: activeStage === stage.id ? "var(--navy)" : "var(--offwhite)",
                      color: activeStage === stage.id ? "#fff" : "var(--navy)",
                      border: "1px solid",
                      borderColor: activeStage === stage.id ? "var(--navy)" : "var(--border)",
                      borderRadius: "8px",
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: activeStage === stage.id ? "16px" : 0 }}>
                      <span style={{
                        display: "inline-block",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: stage.colour,
                        color: "#fff",
                        fontFamily: "var(--ui)",
                        fontSize: "13px",
                        fontWeight: 700,
                        lineHeight: "36px",
                        textAlign: "center",
                        flexShrink: 0,
                      }}>{stage.num}</span>
                      <div style={{ flex: 1 }}>
                        <span style={{
                          fontFamily: "var(--heading)",
                          fontSize: "18px",
                          fontWeight: 700,
                          display: "block",
                        }}>{stage.name}</span>
                        <span style={{
                          fontFamily: "var(--ui)",
                          fontSize: "12px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          opacity: 0.6,
                        }}>{stage.timeframe}</span>
                      </div>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "20px",
                        fontWeight: 300,
                        transform: activeStage === stage.id ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        opacity: 0.5,
                      }}>&rsaquo;</span>
                    </div>

                    {activeStage === stage.id && (
                      <div style={{ paddingLeft: "52px" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ marginBottom: "20px" }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "8px",
                          }}>What people feel</span>
                          <p style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            opacity: 0.9,
                          }}>{stage.feeling}</p>
                        </div>

                        <div style={{
                          background: activeStage === stage.id ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
                          borderRadius: "6px",
                          padding: "16px 20px",
                          marginBottom: "20px",
                          fontStyle: "italic",
                        }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "8px",
                            fontStyle: "normal",
                          }}>The internal voice</span>
                          <p style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            opacity: 0.85,
                          }}>&ldquo;{stage.internalVoice}&rdquo;</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "8px",
                          }}>What people do</span>
                          <p style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            opacity: 0.9,
                          }}>{stage.whatPeopleDo}</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "8px",
                          }}>What leaders should do</span>
                          <ul style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            paddingLeft: "20px",
                            opacity: 0.9,
                          }}>
                            {stage.whatLeadersShouldDo.map((action, ai) => (
                              <li key={ai} style={{ marginBottom: "8px" }}>{action}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{
                          background: "rgba(139,0,0,0.12)",
                          borderRadius: "6px",
                          padding: "16px 20px",
                          borderLeft: "3px solid rgba(139,0,0,0.4)",
                        }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "#8B0000",
                            display: "block",
                            marginBottom: "8px",
                          }}>Common mistake</span>
                          <p style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            color: activeStage === stage.id ? "rgba(255,255,255,0.85)" : "var(--navy)",
                          }}>{stage.commonMistake}</p>
                        </div>
                      </div>
                    )}
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Expandable detail items for Topic 02 */}
        <ScrollReveal direction="up" delay={100}>
          <div style={{ marginTop: "32px" }}>
            <h3 style={{
              fontFamily: "var(--heading)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--navy)",
              marginBottom: "16px",
            }}>Key principles of the emotional journey</h3>
            <ExpandableItems items={topicSections[1].items} />
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  TOPIC 03: TOUCHPOINT TRUST DESIGN                           */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">{topicSections[2].title}</h2>
          <p className="article-section-desc">{topicSections[2].introduction}</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandableItems items={topicSections[2].items} />
        </ScrollReveal>

        {/* Touchpoint Trust Cards */}
        <ScrollReveal direction="up" delay={100}>
          <div style={{ marginTop: "40px" }}>
            <h3 style={{
              fontFamily: "var(--heading)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--navy)",
              marginBottom: "8px",
            }}>The five moments that define trust</h3>
            <p style={{
              fontFamily: "var(--body)",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "var(--mid)",
              marginBottom: "24px",
            }}>Click any touchpoint to see what builds trust and what erodes it at each critical moment.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {touchpointCards.map((tp, i) => (
                <ScrollReveal key={tp.id} direction="up" delay={i * 60}>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: activeTouchpoint === tp.id ? "var(--offwhite)" : "#fff",
                      border: "1px solid",
                      borderColor: activeTouchpoint === tp.id ? "var(--gold)" : "var(--border)",
                      borderRadius: "8px",
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onClick={() => setActiveTouchpoint(activeTouchpoint === tp.id ? null : tp.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{
                          fontFamily: "var(--heading)",
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "var(--navy)",
                          display: "block",
                        }}>{tp.moment}</span>
                        <span style={{
                          fontFamily: "var(--ui)",
                          fontSize: "12px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color: "var(--gold)",
                        }}>{tp.timeframe}</span>
                      </div>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "20px",
                        fontWeight: 300,
                        color: "var(--mid)",
                        transform: activeTouchpoint === tp.id ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}>&rsaquo;</span>
                    </div>

                    {activeTouchpoint === tp.id && (
                      <div style={{ marginTop: "20px" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                          <div style={{
                            background: "rgba(46,107,79,0.06)",
                            borderRadius: "6px",
                            padding: "16px 20px",
                            borderTop: "3px solid #2E6B4F",
                          }}>
                            <span style={{
                              fontFamily: "var(--ui)",
                              fontSize: "11px",
                              fontWeight: 600,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase" as const,
                              color: "#2E6B4F",
                              display: "block",
                              marginBottom: "12px",
                            }}>Builds trust</span>
                            <ul style={{
                              fontFamily: "var(--body)",
                              fontSize: "14px",
                              lineHeight: 1.7,
                              margin: 0,
                              paddingLeft: "18px",
                              color: "var(--navy)",
                            }}>
                              {tp.buildsTrust.map((item, bi) => (
                                <li key={bi} style={{ marginBottom: "10px" }}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div style={{
                            background: "rgba(139,0,0,0.04)",
                            borderRadius: "6px",
                            padding: "16px 20px",
                            borderTop: "3px solid #8B0000",
                          }}>
                            <span style={{
                              fontFamily: "var(--ui)",
                              fontSize: "11px",
                              fontWeight: 600,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase" as const,
                              color: "#8B0000",
                              display: "block",
                              marginBottom: "12px",
                            }}>Erodes trust</span>
                            <ul style={{
                              fontFamily: "var(--body)",
                              fontSize: "14px",
                              lineHeight: 1.7,
                              margin: 0,
                              paddingLeft: "18px",
                              color: "var(--navy)",
                            }}>
                              {tp.erodesTrust.map((item, ei) => (
                                <li key={ei} style={{ marginBottom: "10px" }}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div style={{
                          background: "var(--navy)",
                          color: "#fff",
                          borderRadius: "6px",
                          padding: "16px 20px",
                        }}>
                          <span style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "8px",
                          }}>Key principle</span>
                          <p style={{
                            fontFamily: "var(--body)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            margin: 0,
                            opacity: 0.9,
                          }}>{tp.keyPrinciple}</p>
                        </div>
                      </div>
                    )}
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  SELF-CHECK CHECKLIST                                        */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Change Experience-Aware?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your change programme is designed for the human experience, not just the project plan. Be honest. The items you leave unchecked are the ones that will determine how people remember this change.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="self-check">
            {checkItems.map((item) => (
              <label key={item.key} className="check-item">
                <input
                  type="checkbox"
                  checked={!!checklist[item.key]}
                  onChange={() =>
                    setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                  }
                />
                <span className="check-box"></span>
                <span className="check-label">{item.label}</span>
              </label>
            ))}

            <div className="check-result">
              <div className="check-bar">
                <div className="check-bar-fill" style={{ width: `${(checkedCount / checkItems.length) * 100}%` }}></div>
              </div>
              <p className="check-score">
                {checkedCount} of {checkItems.length} complete
                {checkedCount === checkItems.length && (
                  <span className="check-complete"> &mdash; Your change programme is designed for the human experience. This is rare, and it matters.</span>
                )}
                {checkedCount >= 9 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. The gaps you see are the ones that will matter most in the difficult moments. Close them before they close you.</span>
                )}
                {checkedCount >= 6 && checkedCount < 9 && (
                  <span className="check-partial"> &mdash; You are aware of the experience dimension but have not fully designed for it. The process is likely solid. The experience needs more deliberate attention.</span>
                )}
                {checkedCount >= 3 && checkedCount < 6 && (
                  <span className="check-partial"> &mdash; Significant gaps in experience design. Your change programme may deliver its business outcomes but leave people feeling unseen and unsupported. That has consequences for the next change.</span>
                )}
                {checkedCount > 0 && checkedCount < 3 && (
                  <span className="check-partial"> &mdash; Your change programme is designed primarily for process. The human experience is largely unaddressed. People will comply, but they will not commit. And they will remember how this felt.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Engagement</strong>, the second pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ============================================================ */}
      {/*  SIDEBAR: Enterprise Examples                                */}
      {/* ============================================================ */}
      <aside className="article-sidebar">
        <div className="sidebar-sticky">
          <span className="case-sidebar-heading">Enterprise Examples</span>
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={i} direction="right" delay={i * 120}>
              <button className="case-teaser" onClick={() => setActiveCaseStudy(i)}>
                <span className="case-teaser-label">{cs.dimension}</span>
                <span className="case-teaser-headline">{cs.headline}</span>
                <span className="case-teaser-hook">{cs.hook}</span>
                <span className="case-teaser-read">Read the full story &rarr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </aside>
      </div>

      {/* ============================================================ */}
      {/*  CASE STUDY MODAL                                            */}
      {/* ============================================================ */}
      {activeCaseStudy !== null && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setActiveCaseStudy(null)}>
          <div className="modal case-study-modal">
            <button className="modal-close" onClick={() => setActiveCaseStudy(null)}>&times;</button>
            <span className="case-study-label">{caseStudies[activeCaseStudy].label}</span>
            <span className="case-study-dimension">{caseStudies[activeCaseStudy].dimension}</span>
            <h2 className="case-study-modal-title">{caseStudies[activeCaseStudy].headline}</h2>
            {caseStudies[activeCaseStudy].body.map((p, i) => (
              <p key={i} className="case-study-modal-body">{p}</p>
            ))}
            <div className="case-study-lesson">
              <span className="case-study-lesson-label">The lesson</span>
              <p>{caseStudies[activeCaseStudy].lesson}</p>
            </div>
            <a href={caseStudies[activeCaseStudy].source} target="_blank" rel="noopener noreferrer" className="case-study-source">
              Source: {caseStudies[activeCaseStudy].sourceLabel} &rarr;
            </a>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
