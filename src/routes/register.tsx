import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoForm, FormField, Input, SiteFrame } from "@/components/campuskart";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [
    { title: "Join CampusKart | Student sign up" }, { name: "description", content: "Create a sample CampusKart student account." },
    { property: "og:title", content: "Join CampusKart | Student sign up" }, { property: "og:description", content: "Create a sample CampusKart student account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: RegisterPage,
});

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  return <SiteFrame><DemoForm title="Join the campus shelf" kicker="Create account" description="Meet your new favorite student marketplace." submitLabel="Create sample account" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
    <FormField label="Your name"><Input autoComplete="name" placeholder="e.g. Sam Lee" required /></FormField>
    <FormField label="Student email"><Input type="email" autoComplete="email" placeholder="you@college.edu" required /></FormField>
    <FormField label="Phone number"><Input type="tel" autoComplete="tel" placeholder="Your phone number" /></FormField>
    <FormField label="Password"><Input type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required /></FormField>
    {submitted && <p className="form-success" role="status">Demo only — account details are not saved.</p>}
  </DemoForm>}><p className="form-hint text-center">Already part of the shelf? <Link className="text-link" to="/login">Sign in</Link></p></SiteFrame>;
}