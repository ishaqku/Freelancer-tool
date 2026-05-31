export interface InvoiceTemplate {
  id: string;
  name: string;
  style: "modern" | "classic" | "minimal" | "creative";
  colors: { primary: string; secondary: string; accent: string };
  layout: "standard" | "sidebar" | "centered";
  font: "inter" | "roboto" | "playfair";
}

export const invoiceTemplates: InvoiceTemplate[] = [
  {
    id: "modern-blue",
    name: "Modern Professional",
    style: "modern",
    colors: { primary: "#2563EB", secondary: "#1E293B", accent: "#10B981" },
    layout: "standard",
    font: "inter"
  },
  {
    id: "classic-navy",
    name: "Classic Corporate",
    style: "classic",
    colors: { primary: "#1E3A5F", secondary: "#4A5568", accent: "#C53030" },
    layout: "sidebar",
    font: "playfair"
  },
  {
    id: "minimal-white",
    name: "Clean Minimal",
    style: "minimal",
    colors: { primary: "#000000", secondary: "#6B7280", accent: "#000000" },
    layout: "centered",
    font: "inter"
  },
  {
    id: "creative-gradient",
    name: "Creative Bold",
    style: "creative",
    colors: { primary: "#7C3AED", secondary: "#EC4899", accent: "#F59E0B" },
    layout: "standard",
    font: "roboto"
  }
];
