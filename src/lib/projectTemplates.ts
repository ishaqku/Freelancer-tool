export interface ProjectTemplate {
  id: string;
  category: string;
  name: string;
  description: string;
  complexity: "simple" | "moderate" | "complex";
  estimatedHours: { min: number; max: number };
  hourlyRateMultiplier: number;
  scopeItems: string[];
  revisionRounds: number;
  deliverables: string[];
  commonAddOns: { name: string; hours: number; price: number }[];
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "landing-page",
    category: "web-dev",
    name: "Landing Page",
    description: "Single-page marketing website",
    complexity: "simple",
    estimatedHours: { min: 10, max: 20 },
    hourlyRateMultiplier: 1.0,
    scopeItems: [
      "Hero section with CTA",
      "3-4 content sections",
      "Contact form",
      "Mobile responsive",
      "Basic SEO setup"
    ],
    revisionRounds: 2,
    deliverables: ["Source code", "Deployment guide", "1 week support"],
    commonAddOns: [
      { name: "CMS Integration", hours: 5, price: 0 },
      { name: "Animation/Effects", hours: 3, price: 0 },
      { name: "Multilingual", hours: 4, price: 0 },
      { name: "Analytics Setup", hours: 2, price: 0 }
    ]
  },
  {
    id: "ecommerce-shopify",
    category: "web-dev",
    name: "E-commerce Website (Shopify)",
    description: "Full online store on Shopify",
    complexity: "moderate",
    estimatedHours: { min: 40, max: 80 },
    hourlyRateMultiplier: 1.1,
    scopeItems: [
      "10-20 product setup",
      "Payment gateway integration",
      "Shipping configuration",
      "Custom theme adjustments",
      "Mobile optimization",
      "Basic SEO",
      "Analytics setup"
    ],
    revisionRounds: 3,
    deliverables: ["Functional store", "Admin training", "2 weeks support"],
    commonAddOns: [
      { name: "Additional 20 products", hours: 5, price: 0 },
      { name: "Custom app integration", hours: 8, price: 0 },
      { name: "Email marketing setup", hours: 4, price: 0 },
      { name: "Speed optimization", hours: 6, price: 0 }
    ]
  },
  {
    id: "mobile-app-mvp",
    category: "mobile-dev",
    name: "Mobile App MVP",
    description: "Minimum viable product for iOS/Android",
    complexity: "complex",
    estimatedHours: { min: 120, max: 200 },
    hourlyRateMultiplier: 1.2,
    scopeItems: [
      "User authentication",
      "Core feature development",
      "Database design",
      "API integration",
      "Push notifications",
      "App store submission",
      "Basic analytics"
    ],
    revisionRounds: 3,
    deliverables: ["Source code", "App binaries", "Documentation", "1 month support"],
    commonAddOns: [
      { name: "Admin dashboard", hours: 40, price: 0 },
      { name: "Payment integration", hours: 20, price: 0 },
      { name: "Offline mode", hours: 25, price: 0 }
    ]
  },
  {
    id: "brand-identity",
    category: "design",
    name: "Brand Identity Package",
    description: "Logo, colors, typography, brand guidelines",
    complexity: "moderate",
    estimatedHours: { min: 30, max: 60 },
    hourlyRateMultiplier: 1.1,
    scopeItems: [
      "Logo design (3 concepts)",
      "Color palette",
      "Typography selection",
      "Brand guidelines document",
      "Business card design",
      "Social media templates"
    ],
    revisionRounds: 3,
    deliverables: ["Source files", "Brand guidelines PDF", "Export package"],
    commonAddOns: [
      { name: "Packaging design", hours: 15, price: 0 },
      { name: "Brand strategy doc", hours: 10, price: 0 }
    ]
  },
  {
    id: "seo-audit",
    category: "marketing",
    name: "Technical SEO Audit",
    description: "Comprehensive website analysis",
    complexity: "moderate",
    estimatedHours: { min: 15, max: 25 },
    hourlyRateMultiplier: 1.1,
    scopeItems: [
      "Site speed analysis",
      "Crawlability check",
      "Keyword gap analysis",
      "Backlink profile review",
      "Competitor analysis"
    ],
    revisionRounds: 1,
    deliverables: ["Audit PDF Report", "Actionable Checklist", "1hr Consultation"],
    commonAddOns: [
      { name: "Implementation support", hours: 10, price: 0 },
      { name: "Ongoing monthly tracking", hours: 4, price: 0 }
    ]
  }
];
