export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedTool?: string;
  relatedArticle?: string;
  views: number;
  helpful: number;
}

export const faqs: FAQ[] = [
  {
    id: "fair-rate",
    category: "pricing",
    question: "How do I know if my freelance rate is fair?",
    answer: "A fair freelance rate should: (1) Cover your living expenses including taxes, (2) Match or exceed market rates for your skill and experience level in your region, (3) Account for non-billable time like admin and learning, (4) Include profit margin for growth. Use our Rate Calculator to get a data-driven recommendation based on your specific situation.",
    relatedTool: "Rate Calculator",
    relatedArticle: "how-to-raise-freelance-rates",
    views: 15420,
    helpful: 1423
  },
  {
    id: "hourly-vs-fixed",
    category: "pricing",
    question: "Should I charge hourly or fixed price?",
    answer: "Hourly is best for: ongoing work, unclear scope, research-heavy projects, or when client requests many changes. Fixed price is best for: well-defined projects, experienced freelancers who can estimate accurately, and clients who prefer budget certainty. Many successful freelancers use both - hourly for maintenance, fixed for projects. Our Project Estimator can help you decide.",
    relatedTool: "Project Estimator",
    relatedArticle: "pricing-models-guide",
    views: 12300,
    helpful: 1156
  },
  {
    id: "first-client-rate",
    category: "getting-started",
    question: "What should I charge for my first freelance project?",
    answer: "For your first project: (1) Calculate your minimum viable rate using our calculator, (2) Research what others charge for similar work, (3) Price at 70-80% of market rate to build portfolio, (4) Never go below your living cost minimum, (5) Increase by 20-30% for each subsequent client. Your first rate sets expectations - it's easier to raise rates with new clients than existing ones.",
    relatedTool: "Rate Calculator",
    relatedArticle: "beginner-pricing-mistakes",
    views: 18900,
    helpful: 2100
  },
  {
    id: "international-client-rate",
    category: "international",
    question: "Should I charge international clients more?",
    answer: "Generally yes - charge based on the client's location market rate, not yours. A US client can afford $75-120/hr for React development, while an Indian client might pay $25-45/hr for the same work. Our Client Location Adjuster shows exact recommended rates for 50+ countries. Key: your rate reflects the value delivered to that market, not your cost of living.",
    relatedTool: "Client Location Adjuster",
    relatedArticle: "international-pricing-guide",
    views: 9800,
    helpful: 876
  },
  {
    id: "tax-freelancer",
    category: "taxes",
    question: "How much should freelancers save for taxes?",
    answer: "Save 25-30% of gross income for taxes as a general rule. However, this varies significantly by country: US freelancers pay 30% (income tax + self-employment tax), UK 20-25%, India 5-30% depending on income bracket. Use our Tax Estimator for country-specific calculations. Set aside money monthly - don't wait until tax season.",
    relatedTool: "Tax Estimator",
    relatedArticle: "tax-guide-remote-workers",
    views: 11200,
    helpful: 1345
  },
  {
    id: "late-payment",
    category: "clients",
    question: "What should I do if a client doesn't pay on time?",
    answer: "Prevention: (1) Get 50% upfront, (2) Use clear payment terms in contract, (3) Invoice promptly, (4) Charge late fees. If late: (1) Send friendly reminder at 3 days past due, (2) Formal follow-up at 7 days, (3) Pause work at 14 days, (4) Final notice at 30 days. Our Contract Clause Library includes payment protection clauses. For chronic late payers, require 100% upfront for future work.",
    relatedTool: "Contract Clause Library",
    relatedArticle: "client-payment-strategies",
    views: 8700,
    helpful: 923
  },
  {
    id: "scope-creep",
    category: "clients",
    question: "How do I handle scope creep without damaging client relationships?",
    answer: "Address scope creep professionally: (1) Reference original scope in contract, (2) Say 'I'd love to help with that - let me quote the additional work', (3) Provide options: add to current project or separate phase, (4) Document everything in writing. Our Project Estimator helps define scope upfront. Include revision limits in your contract - our Contract Clause Library has templates.",
    relatedTool: "Project Estimator",
    relatedArticle: "scope-creep",
    views: 7600,
    helpful: 812
  },
  {
    id: "rate-negotiation",
    category: "pricing",
    question: "How do I negotiate my rate with a client?",
    answer: "Effective rate negotiation: (1) Never apologize for your rate, (2) Anchor high - start 10-20% above your target, (3) Focus on value, not hours, (4) Offer options at different price points, (5) Be willing to walk away. Use our Negotiation Script Generator for specific scenarios. Practice with our Negotiation Simulator before real conversations.",
    relatedTool: "Negotiation Script Generator",
    relatedArticle: "handle-too-expensive",
    views: 14500,
    helpful: 1678
  }
];
