export interface ContractClause {
  id: string;
  category: "payment" | "scope" | "ip" | "termination" | "liability" | "confidentiality" | "revisions" | "support";
  title: string;
  description: string;
  template: string;
  variables: { name: string; placeholder: string; required: boolean }[];
  popularity: number;
  rating: number;
  tags: string[];
}

export const contractClauses: ContractClause[] = [
  {
    id: "payment-50-50",
    category: "payment",
    title: "50/50 Payment Split",
    description: "Standard upfront and delivery payment",
    template: `Payment Terms:
1. A non-refundable deposit of {{depositPercent}}% (\${{depositAmount}}) is due upon contract signing.
2. The remaining {{remainingPercent}}% (\${{remainingAmount}}) is due upon project completion.
3. All invoices are payable within {{paymentDays}} days of receipt.
4. Late payments incur a fee of {{lateFee}}% per month on the outstanding balance.
5. Work may be paused if payment is more than {{pauseDays}} days overdue.`,
    variables: [
      { name: "depositPercent", placeholder: "50", required: true },
      { name: "depositAmount", placeholder: "calculated", required: true },
      { name: "remainingPercent", placeholder: "50", required: true },
      { name: "remainingAmount", placeholder: "calculated", required: true },
      { name: "paymentDays", placeholder: "14", required: false },
      { name: "lateFee", placeholder: "2", required: false },
      { name: "pauseDays", placeholder: "7", required: false }
    ],
    popularity: 2341,
    rating: 4.8,
    tags: ["beginner-friendly", "standard", "fixed-price"]
  },
  {
    id: "payment-milestone",
    category: "payment",
    title: "Milestone-Based Payments",
    description: "For large projects, pay at each milestone",
    template: `Milestone Payments:
1. Project divided into {{milestoneCount}} milestones as defined in Schedule A.
2. Payment of \${{milestoneAmount}} due at completion of each milestone.
3. Each milestone requires client approval within {{approvalDays}} days.
4. Unapproved milestones after {{approvalDays}} days are considered approved.
5. Final payment due before source code/handover.`,
    variables: [
      { name: "milestoneCount", placeholder: "3", required: true },
      { name: "milestoneAmount", placeholder: "calculated", required: true },
      { name: "approvalDays", placeholder: "5", required: false }
    ],
    popularity: 1856,
    rating: 4.7,
    tags: ["large-projects", "risk-management", "enterprise"]
  },
  {
    id: "scope-revisions",
    category: "revisions",
    title: "Revision Rounds Limit",
    description: "Prevent endless revision cycles",
    template: `Revisions Policy:
1. Project includes {{revisionRounds}} rounds of revisions.
2. Each round must be requested within {{requestDays}} days of delivery.
3. Revisions must be consolidated into a single list per round.
4. Changes outside original scope (as defined in Appendix A) will be quoted separately.
5. Additional revisions billed at \${{overtimeRate}}/hour.`,
    variables: [
      { name: "revisionRounds", placeholder: "3", required: true },
      { name: "requestDays", placeholder: "7", required: false },
      { name: "overtimeRate", placeholder: "hourly rate", required: true }
    ],
    popularity: 2103,
    rating: 4.9,
    tags: ["scope-protection", "essential", "all-projects"]
  },
  {
    id: "ip-transfer",
    category: "ip",
    title: "IP Transfer on Full Payment",
    description: "Protect your work until paid",
    template: `Intellectual Property:
1. Contractor retains all rights to work product until full payment is received.
2. Upon full payment, all rights, title, and interest transfer to Client.
3. Contractor retains the right to use the work in their portfolio.
4. Contractor retains rights to reusable components, frameworks, and methodologies.
5. Third-party assets (fonts, images, plugins) remain subject to their original licenses.`,
    variables: [],
    popularity: 1567,
    rating: 4.6,
    tags: ["protection", "standard", "recommended"]
  },
  {
    id: "termination-30-day",
    category: "termination",
    title: "30-Day Termination Notice",
    description: "Fair termination for both parties",
    template: `Termination:
1. Either party may terminate with {{noticeDays}} days written notice.
2. Upon termination, Client pays for all completed work pro-rata.
3. Work-in-progress delivered as-is if payment made for time spent.
4. Deposit is non-refundable if Client terminates after work begins.
5. Contractor may terminate immediately if payment is {{overdueDays}} days late.`,
    variables: [
      { name: "noticeDays", placeholder: "30", required: true },
      { name: "overdueDays", placeholder: "14", required: false }
    ],
    popularity: 1432,
    rating: 4.5,
    tags: ["safety", "professional", "long-term"]
  },
  {
    id: "confidentiality-standard",
    category: "confidentiality",
    title: "Standard Confidentiality",
    description: "Mutual non-disclosure agreement",
    template: `Confidentiality:
1. Both parties agree to keep all project details and proprietary information confidential.
2. Confidential information does not include public knowledge or independently developed data.
3. Obligations survive the termination of this agreement for {{survivalYears}} years.`,
    variables: [
      { name: "survivalYears", placeholder: "3", required: true }
    ],
    popularity: 1290,
    rating: 4.7,
    tags: ["nda", "standard", "trust"]
  }
];
