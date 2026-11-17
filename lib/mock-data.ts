export const dashboardStats = {
  totalScraping: 128,
  completed: 96,
  inProgress: 12,
  failed: 20,
};

export const weeklyActivity = [
  { day: "Mon", date: "Nov 10", successful: 18, failed: 2 },
  { day: "Tue", date: "Nov 11", successful: 14, failed: 3 },
  { day: "Wed", date: "Nov 12", successful: 22, failed: 1 },
  { day: "Thu", date: "Nov 13", successful: 16, failed: 4 },
  { day: "Fri", date: "Nov 14", successful: 20, failed: 2 },
  { day: "Sat", date: "Nov 15", successful: 8, failed: 5 },
  { day: "Sun", date: "Nov 16", successful: 6, failed: 3 },
];

export type ScrapingStatus = "completed" | "processing" | "failed" | "pending";

export interface ScrapingJob {
  id: string;
  name: string;
  source: string;
  status: ScrapingStatus;
  pages: number;
  createdAt: string;
}

export const recentScrapingJobs: ScrapingJob[] = [
  {
    id: "1",
    name: "Product Data Scraping",
    source: "expedia.com",
    status: "completed",
    pages: 1240,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    name: "News Article Scraping",
    source: "kayak.com",
    status: "processing",
    pages: 856,
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    name: "Documentation Scraping",
    source: "booking.com",
    status: "failed",
    pages: 430,
    createdAt: "6 hours ago",
  },
  {
    id: "4",
    name: "E-commerce Data Collection",
    source: "hotels.com",
    status: "completed",
    pages: 2100,
    createdAt: "8 hours ago",
  },
  {
    id: "5",
    name: "Blog Content Scraping",
    source: "tripadvisor.com",
    status: "pending",
    pages: 670,
    createdAt: "12 hours ago",
  },
  {
    id: "6",
    name: "Hotel Listings Extract",
    source: "agoda.com",
    status: "completed",
    pages: 1580,
    createdAt: "1 day ago",
  },
  {
    id: "7",
    name: "Travel Blog Aggregation",
    source: "skyscanner.net",
    status: "processing",
    pages: 920,
    createdAt: "1 day ago",
  },
];

export const quickActions = [
  {
    label: "Create New Scraping",
    description: "Set up a new scraping job",
    href: "/scrapping",
    icon: "plus" as const,
  },
  {
    label: "View Scraping History",
    description: "Browse past scraping results",
    href: "/scrapping",
    icon: "history" as const,
  },
  {
    label: "Manage Sources",
    description: "Configure data sources",
    href: "/hotels",
    icon: "settings" as const,
  },
];
