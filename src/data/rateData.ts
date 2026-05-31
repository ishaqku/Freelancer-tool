export const countries = [
  { code: "US", name: "United States", currency: "USD", multiplier: 1.0 },
  { code: "CA", name: "Canada", currency: "CAD", multiplier: 0.95 },
  { code: "UK", name: "United Kingdom", currency: "GBP", multiplier: 0.9 },
  { code: "AU", name: "Australia", currency: "AUD", multiplier: 0.9 },
  { code: "DE", name: "Germany", currency: "EUR", multiplier: 0.75 },
  { code: "FR", name: "France", currency: "EUR", multiplier: 0.7 },
  { code: "NL", name: "Netherlands", currency: "EUR", multiplier: 0.75 },
  { code: "PL", name: "Poland", currency: "PLN", multiplier: 0.45 },
  { code: "UA", name: "Ukraine", currency: "UAH", multiplier: 0.35 },
  { code: "RO", name: "Romania", currency: "RON", multiplier: 0.35 },
  { code: "IN", name: "India", currency: "INR", multiplier: 0.25 },
  { code: "PK", name: "Pakistan", currency: "PKR", multiplier: 0.2 },
  { code: "PH", name: "Philippines", currency: "PHP", multiplier: 0.22 },
  { code: "BD", name: "Bangladesh", currency: "BDT", multiplier: 0.18 },
  { code: "NG", name: "Nigeria", currency: "NGN", multiplier: 0.2 },
  { code: "KE", name: "Kenya", currency: "KES", multiplier: 0.18 },
  { code: "ZA", name: "South Africa", currency: "ZAR", multiplier: 0.3 },
  { code: "BR", name: "Brazil", currency: "BRL", multiplier: 0.3 },
  { code: "MX", name: "Mexico", currency: "MXN", multiplier: 0.28 },
  { code: "AR", name: "Argentina", currency: "ARS", multiplier: 0.25 },
  { code: "OTHER", name: "Other", currency: "USD", multiplier: 0.5 },
];

export const skillCategories = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "Code",
    subSkills: [
      { id: "react-nextjs", name: "React.js / Next.js", benchmark: { min: 35, max: 85 } },
      { id: "vue", name: "Vue.js", benchmark: { min: 30, max: 70 } },
      { id: "angular", name: "Angular", benchmark: { min: 35, max: 75 } },
      { id: "wordpress", name: "WordPress", benchmark: { min: 20, max: 50 } },
      { id: "shopify", name: "Shopify", benchmark: { min: 30, max: 65 } },
      { id: "php-laravel", name: "PHP / Laravel", benchmark: { min: 25, max: 60 } },
      { id: "nodejs", name: "Node.js", benchmark: { min: 35, max: 80 } },
      { id: "python-django", name: "Python / Django", benchmark: { min: 40, max: 90 } }
    ]
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    icon: "Smartphone",
    subSkills: [
      { id: "react-native", name: "React Native", benchmark: { min: 40, max: 85 } },
      { id: "flutter", name: "Flutter", benchmark: { min: 35, max: 75 } },
      { id: "ios-swift", name: "iOS / Swift", benchmark: { min: 45, max: 95 } },
      { id: "android-kotlin", name: "Android / Kotlin", benchmark: { min: 40, max: 85 } }
    ]
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    icon: "PenTool",
    subSkills: [
      { id: "ui-design", name: "UI Design", benchmark: { min: 30, max: 70 } },
      { id: "ux-research", name: "UX Research", benchmark: { min: 35, max: 75 } },
      { id: "product-design", name: "Product Design", benchmark: { min: 40, max: 85 } },
      { id: "web-design", name: "Web Design", benchmark: { min: 25, max: 60 } }
    ]
  },
  {
    id: "content",
    name: "Content Writing",
    icon: "FileText",
    subSkills: [
      { id: "copywriting", name: "Copywriting", benchmark: { min: 25, max: 60 } },
      { id: "tech-writing", name: "Technical Writing", benchmark: { min: 35, max: 75 } },
      { id: "seo-writing", name: "SEO Content", benchmark: { min: 20, max: 50 } },
      { id: "blog-writing", name: "Blog Posts", benchmark: { min: 15, max: 40 } }
    ]
  }
];

export const experienceLevels = [
  { id: "0-1", label: "0-1 years", title: "Beginner", multiplier: 0.5, description: "Just starting, building portfolio" },
  { id: "1-3", label: "1-3 years", title: "Intermediate", multiplier: 0.75, description: "Some experience, growing skills" },
  { id: "3-5", label: "3-5 years", title: "Experienced", multiplier: 1.0, description: "Solid experience, independent worker" },
  { id: "5-8", label: "5-8 years", title: "Senior", multiplier: 1.35, description: "Expert level, leads projects" },
  { id: "8+", label: "8+ years", title: "Expert", multiplier: 1.75, description: "Industry veteran, strategic thinker" }
];

export const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "PKR", symbol: "₨" },
  { code: "PHP", symbol: "₱" },
  { code: "NGN", symbol: "₦" },
  { code: "CAD", symbol: "C$" },
  { code: "AUD", symbol: "A$" }
];
