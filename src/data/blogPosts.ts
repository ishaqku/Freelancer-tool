export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    bio: string;
    photo: string;
    social: { twitter?: string; linkedin?: string; website?: string };
  };
  publishedAt: string;
  updatedAt: string;
  readTime: number; // minutes
  featured: boolean;
  coverImage: string;
  toc: { id: string; text: string; level: number }[];
  relatedPosts: string[]; // slugs
  relatedTools: string[]; // tool names
  downloads?: { title: string; url: string }[];
  faq?: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-raise-freelance-rates",
    title: "How to Raise Your Freelance Rates Without Losing Clients",
    excerpt: "A step-by-step guide to increasing your rates strategically while maintaining strong client relationships.",
    category: "pricing",
    tags: ["rate-increase", "client-retention", "negotiation", "growth"],
    author: {
      name: "Freelance Expert",
      bio: "Helping freelancers price their work fairly since 2018",
      photo: "https://ui-avatars.com/api/?name=Freelance+Expert&background=0D8ABC&color=fff",
      social: { twitter: "#", linkedin: "#" }
    },
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
    readTime: 8,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    toc: [
      { id: "when-to-raise", text: "When to Raise Your Rates", level: 2 },
      { id: "how-much", text: "How Much to Increase", level: 2 },
      { id: "email-template", text: "The Email Template", level: 2 },
      { id: "handling-pushback", text: "Handling Pushback", level: 2 },
      { id: "if-they-say-no", text: "What If They Say No?", level: 2 },
      { id: "next-steps", text: "Next Steps", level: 2 }
    ],
    relatedPosts: [
      "5-signs-undercharging",
      "negotiate-like-pro",
      "pricing-psychology"
    ],
    relatedTools: ["Rate Calculator", "Negotiation Script Generator"],
    downloads: [
      { title: "Rate Increase Email Templates", url: "#" }
    ],
    content: `
## When to Raise Your Rates

It can be daunting to raise your rates, especially if you fear losing clients. However, the exact right time to raise your rates is before you resent the work and when your pipeline is full. 

If you're booked solid for the next 2-3 months, you have leverage. Start by testing higher rates on new clients.

## How Much to Increase

Most freelancers increase their rates by 10-20% each year simply to account for inflation, increased cost of living, and expanding skill sets. If you've gained a new certification or learned a high-value skill, a jump of 30-50% might be warranted.

Use our **Rate Calculator** to see what your market rate should be.

## The Email Template

Keep it simple and professional:
> "Hi [Client Name],
> It's been great working with you over the past year. I'm writing to let you know that starting [Date 30-60 days out], my rates will be increasing to [New Rate]. 
> I look forward to continuing our successful partnership."

## Handling Pushback

You may receive pushback. That's a normal part of business. Restate your value and optionally offer a slightly discounted transition rate for one month.
      `,
    faq: [
      {
        question: "How often should I raise my rates?",
        answer: "Most successful freelancers review rates every 6-12 months or after completing 3-5 projects."
      },
      {
        question: "What if all my clients say no?",
        answer: "Start with new clients at higher rates. Existing clients can be phased in over 2-3 rate increases."
      }
    ]
  },
  {
    slug: "2024-freelance-rate-report",
    title: "2024 Global Freelance Rate Report: What Developers Really Earn",
    excerpt: "Data from 5,000+ freelancers worldwide. See how your rate compares by country, skill, and experience.",
    category: "pricing",
    tags: ["market-data", "global-rates", "comparison", "research"],
    author: { 
      name: "Research Team", 
      bio: "Data scientists analyzing global freelance markets", 
      photo: "https://ui-avatars.com/api/?name=Research+Team&background=10B981&color=fff", 
      social: {} 
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    readTime: 12,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    toc: [],
    relatedPosts: [],
    relatedTools: ["Rate Comparison Tool", "Client Location Adjuster"],
    content: "Content coming soon..."
  },
  {
    slug: "5-signs-undercharging",
    title: "5 Signs You're Undercharging (And How to Fix It)",
    excerpt: "Most freelancers undercharge without realizing. Here are the warning signs.",
    category: "pricing",
    tags: ["undercharging", "mindset", "pricing", "beginners"],
    author: { 
      name: "Freelance Expert", 
      bio: "Helping freelancers price their work fairly since 2018",
      photo: "https://ui-avatars.com/api/?name=Freelance+Expert&background=0D8ABC&color=fff",
      social: {} 
    },
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    readTime: 5,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    toc: [],
    relatedPosts: ["how-to-raise-freelance-rates"],
    relatedTools: ["Rate Calculator"],
    content: "Content coming soon..."
  }
];
