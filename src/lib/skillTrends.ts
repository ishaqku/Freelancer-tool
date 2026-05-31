export interface SkillPath {
  currentSkill: string;
  paths: {
    targetSkill: string;
    timeToLearn: string;
    difficulty: "easy" | "moderate" | "hard";
    currentRate: { min: number; max: number };
    targetRate: { min: number; max: number };
    incomeIncrease: number; 
    demandTrend: "rising" | "stable" | "falling";
    resources: { name: string; type: "free" | "paid"; url: string }[];
    prerequisites: string[];
  }[];
}

export const skillUpgradePaths: Record<string, SkillPath> = {
  "wordpress": {
    currentSkill: "WordPress Development",
    paths: [
      {
        targetSkill: "Shopify Development",
        timeToLearn: "1-2 months",
        difficulty: "easy",
        currentRate: { min: 20, max: 50 },
        targetRate: { min: 35, max: 75 },
        incomeIncrease: 60,
        demandTrend: "rising",
        prerequisites: ["Basic JavaScript", "Liquid templating"],
        resources: [
          { name: "Shopify Partner Academy", type: "free", url: "#" },
          { name: "Shopify Devs YouTube", type: "free", url: "#" }
        ]
      },
      {
        targetSkill: "React.js Development",
        timeToLearn: "3-4 months",
        difficulty: "moderate",
        currentRate: { min: 20, max: 50 },
        targetRate: { min: 45, max: 95 },
        incomeIncrease: 110,
        demandTrend: "rising",
        prerequisites: ["JavaScript ES6+", "HTML/CSS mastery"],
        resources: [
          { name: "freeCodeCamp React", type: "free", url: "#" },
          { name: "React Official Docs", type: "free", url: "#" }
        ]
      }
    ]
  },
  "content-writing": {
    currentSkill: "Content Writing",
    paths: [
      {
        targetSkill: "SEO Content Strategy",
        timeToLearn: "2-3 months",
        difficulty: "moderate",
        currentRate: { min: 15, max: 40 },
        targetRate: { min: 35, max: 70 },
        incomeIncrease: 100,
        demandTrend: "rising",
        prerequisites: ["Content writing experience", "Basic SEO knowledge"],
        resources: [
          { name: "Ahrefs Blogging Course", type: "free", url: "#" },
          { name: "Moz SEO Guide", type: "free", url: "#" }
        ]
      },
      {
        targetSkill: "Technical Writing",
        timeToLearn: "3-4 months",
        difficulty: "moderate",
        currentRate: { min: 15, max: 40 },
        targetRate: { min: 40, max: 85 },
        incomeIncrease: 120,
        demandTrend: "rising",
        prerequisites: ["Strong writing", "Ability to learn tech quickly"],
        resources: [
          { name: "Google Technical Writing", type: "free", url: "#" }
        ]
      }
    ]
  },
  "ui-design": {
     currentSkill: "UI Design",
     paths: [
       {
         targetSkill: "Product Design (UX/UI)",
         timeToLearn: "4-6 months",
         difficulty: "moderate",
         currentRate: { min: 30, max: 70 },
         targetRate: { min: 45, max: 90 },
         incomeIncrease: 40,
         demandTrend: "rising",
         prerequisites: ["Figma mastery", "Basic UI concepts"],
         resources: [
           { name: "Google UX Design Certificate", type: "paid", url: "#" },
           { name: "Nielsen Norman Group", type: "free", url: "#" }
         ]
       }
     ]
  },
  "react-nextjs": {
     currentSkill: "React.js / Next.js",
     paths: [
       {
         targetSkill: "Full-Stack (Node/Postgres)",
         timeToLearn: "3-6 months",
         difficulty: "hard",
         currentRate: { min: 35, max: 85 },
         targetRate: { min: 55, max: 120 },
         incomeIncrease: 50,
         demandTrend: "rising",
         prerequisites: ["React ecosystem", "API concepts"],
         resources: [
           { name: "Full Stack Open", type: "free", url: "#" }
         ]
       }
     ]
  }
};
