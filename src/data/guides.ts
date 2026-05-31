export interface Guide {
  id: string;
  category: "beginner" | "advanced" | "tool";
  title: string;
  description: string;
  pages: number;
  format: "PDF" | "Online";
  url: string;
  thumbnail: string;
}

export const guides: Guide[] = [
  {
    id: "freelance-pricing-101",
    category: "beginner",
    title: "Freelance Pricing 101",
    description: "Everything you need to know about setting your first rate",
    pages: 12,
    format: "PDF",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80"
  },
  {
    id: "first-1000-month",
    category: "beginner",
    title: "Your First $1,000 Month",
    description: "Action plan for new freelancers",
    pages: 8,
    format: "PDF",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=200&q=80"
  },
  {
    id: "scaling-to-10k",
    category: "advanced",
    title: "Scaling to $10K/Month",
    description: "Systems and strategies for high-earning freelancers",
    pages: 20,
    format: "PDF",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80"
  }
];
