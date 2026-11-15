import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HeartHandshake, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, PageHeading, SiteFrame, Textarea } from "@/components/campuskart";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About CampusKart | Campus marketplace" }, { name: "description", content: "A class project concept for sharing useful second-hand items around campus." },
    { property: "og:title", content: "About CampusKart | Campus marketplace" }, { property: "og:description", content: "A class project concept for sharing useful second-hand items around campus." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AboutPage,
});

function AboutPage() {
  const [sent, setSent] = useState(false);
  const send = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <SiteFrame><div className="content-wrap"><PageHeading kicker="The idea behind the shelf" title="Good things go further together." description="CampusKart is a student marketplace concept built around one simple thought: what one student is done with could be just what another needs." />
    <div className="about-grid"><div className="about-copy"><p>From well-loved course books to everyday gadgets, CampusKart helps students pass useful things along and find essentials without starting from scratch.</p><p>Every listing comes with a condition note and a student seller, making it easier to find a good match and arrange a friendly campus hand-off.</p><div className="category-grid mt-6"><div className="category-tile"><div><strong>Learn</strong><span>Books, notes & guides</span></div><BookOpen /></div><div className="category-tile"><div><strong>Connect</strong><span>Student to student</span></div><HeartHandshake /></div><div className="category-tile"><div><strong>Reuse</strong><span>Tech & study gear</span></div><Laptop /></div></div></div>
      <div><p className="eyebrow">Say hello</p><h2 className="section-title mb-5">Contact the team</h2><form className="form-stack" onSubmit={send}><FormField label="Your name"><Input required placeholder="Name" /></FormField><FormField label="Email"><Input type="email" required placeholder="you@college.edu" /></FormField><FormField label="Message"><Textarea rows={4} required placeholder="What would you like to share?" /></FormField><Button type="submit">Send a demo message<ArrowRight size={16} /></Button>{sent && <p className="form-success" role="status">Thanks for reaching out. This demo does not send messages.</p>}</form></div>
    </div>
  </div></SiteFrame>;
}