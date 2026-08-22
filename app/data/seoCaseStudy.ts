export type SeoMetric = { value: string; label: string; context: string };
export type SeoCaseStudy = {
  sector: string;
  title: string;
  summary: string;
  work: string[];
  metrics: SeoMetric[];
};

export const seoCaseStudy: SeoCaseStudy = {
  sector: "Software company",
  title: "Turning search visibility into a steady lead source",
  summary: "Our team improved how a software company appeared in search and helped turn that visibility into a consistent source of qualified enquiries.",
  work: ["Improved important website pages", "Fixed search visibility issues", "Built useful content around customer searches"],
  metrics: [
    { value: "3.51K", label: "Clicks", context: "Latest three months" },
    { value: "1.78M", label: "Search appearances", context: "Latest three months" },
    { value: "15.5", label: "Average position", context: "Improved from 23" },
    { value: "3 qualified leads each month", label: "Lead flow", context: "Established through search" },
  ],
};
