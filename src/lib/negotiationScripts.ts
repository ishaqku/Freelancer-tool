type Tone = "professional" | "friendly" | "firm" | "confident" | "humble";

export interface ScriptTemplate {
  id: string;
  tone: Tone;
  template: string;
  useCase: string;
}

export const negotiationScripts: ScriptTemplate[] = [
  {
    id: "professional-standard",
    tone: "professional",
    useCase: "Standard client email",
    template: `Hi [Client Name],

Thank you for considering me for this project.

Based on my [experience] years of experience in [skill], and current market rates for [skill] specialists in [clientCountry], my rate of $[rate]/hr reflects the value and expertise I bring to your project.

This rate includes:
• [experience] years of specialized [skill] experience
• Direct communication (no agency overhead)
• Quality assurance and testing
• Regular progress updates
• Post-delivery support

For context, the typical market range for this skill level in [clientCountry] is $[marketMin]-$[marketMax]/hr.

I'm happy to discuss the project scope and see if there's flexibility to align with your budget while delivering the results you need.

Best regards,
[Your Name]`
  },
  {
    id: "friendly-startup",
    tone: "friendly",
    useCase: "Startup client, budget constraints",
    template: `Hey [Client Name]!

Excited about [project name] - sounds like a great product.

I know startups operate lean, so I want to be transparent about pricing. My standard rate is $[rate]/hr, which covers my living costs in [userCountry] plus the quality you expect.

For startups, I can offer:
• Slightly reduced rate for the first 3 months
• Or: Fixed project scope to control costs
• Or: Equity + reduced cash component (if you're open to it)

Let's chat about what works best for both of us!

Cheers,
[Your Name]`
  },
  {
    id: "firm-enterprise",
    tone: "firm",
    useCase: "Enterprise client, trying to negotiate down",
    template: `Dear [Client Name],

I appreciate your interest in working together.

My rate of $[rate]/hr is firm for the following reasons:

1. It is highly competitive for the [clientCountry] market average for [skill] developers with [experience] years experience.
2. It accounts for the complexity and responsibility this project requires.
3. It ensures I can dedicate focused, high-quality time to your project without overbooking.

I understand budget constraints, and I'm happy to:
• Phase the project to spread costs
• Reduce scope to fit your budget
• Recommend a junior developer if budget is fixed

However, my rate reflects the value I deliver, and I don't compromise on quality by rushing or discounting.

Let me know how you'd like to proceed.

Regards,
[Your Name]`
  },
  {
    id: "confident-expert",
    tone: "confident",
    useCase: "When client questions why so expensive",
    template: `[Client Name],

Great question about pricing - let me break it down:

My $[rate]/hr isn't just "coding time." It includes:

✓ Technical Expertise
• [experience] years solving complex [skill] problems
• Deep knowledge of industry standards
• Architecture decisions that save you money down the line

✓ Efficiency
• I complete tasks much faster than junior developers
• Fewer bugs = less rework = lower total cost
• Proven patterns = faster delivery

✓ Business Value
• I ask the right questions upfront (saves scope creep)
• I write maintainable code (saves hiring costs later)

Sometimes "expensive" hourly is the cheapest option overall.

Ready to discuss your project?

Best,
[Your Name]`
  },
  {
    id: "humble-first-client",
    tone: "humble",
    useCase: "Building portfolio",
    template: `Hi [Client Name],

I'm very interested in helping you with [project name].

While standard market rates for [skill] in [clientCountry] are $[marketMin]-$[marketMax]/hr, I am currently building my portfolio as an independent freelancer. 

My working rate is $[rate]/hr. At this rate, you get my full dedication and high-quality work, while I get the opportunity to build a long-term professional relationship.

I'd love to hear more about your specific needs and timeline.

Thanks,
[Your Name]`
  }
];
