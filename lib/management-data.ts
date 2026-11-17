export type ManagementRow = Record<string, string> & { id: string };

export interface FormField {
  key: string;
  label: string;
  type?: "text" | "url" | "number" | "date" | "time" | "datetime-local" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ManagementConfig {
  title: string;
  description: string;
  actionLabel: string;
  searchPlaceholder: string;
  columns: { key: string; label: string }[];
  filters: { key: string; label: string; options: string[] }[];
  fields: FormField[];
  rows: ManagementRow[];
  stats: { label: string; value: (rows: ManagementRow[]) => string }[];
  getFormValues?: (row: ManagementRow) => Record<string, string>;
  toRow?: (values: Record<string, string>, id: string) => ManagementRow;
}

const countBy = (rows: ManagementRow[], key: string, value: string) =>
  String(rows.filter((row) => row[key] === value).length);

export const hotelsConfig: ManagementConfig = {
  title: "Hotels",
  description: "Browse and manage hotel data collected from various sources.",
  actionLabel: "New Hotel Scrape",
  searchPlaceholder: "Search hotels...",
  columns: [
    { key: "name", label: "Hotel Name" },
    { key: "location", label: "Location" },
    { key: "rating", label: "Rating" },
    { key: "price", label: "Price / Night" },
    { key: "source", label: "Data Source" },
    { key: "lastScraped", label: "Last Scraped" },
  ],
  filters: [
    { key: "location", label: "Location", options: ["Bali", "Jakarta", "Yogyakarta", "Bandung"] },
    { key: "rating", label: "Rating", options: ["5.0", "4.9", "4.8", "4.7", "4.6"] },
    { key: "source", label: "Data Source", options: ["Booking.com", "Agoda", "Tripadvisor", "Hotels.com"] },
  ],
  fields: [
    { key: "name", label: "Hotel Name", required: true },
    { key: "location", label: "Location", required: true },
    { key: "rating", label: "Rating", type: "number", required: true, placeholder: "4.8" },
    { key: "price", label: "Price / Night", required: true, placeholder: "$120" },
    { key: "source", label: "Data Source", required: true },
  ],
  rows: [
    { id: "h1", name: "The Apurva Kempinski Bali", location: "Bali", rating: "4.9", price: "$420", source: "Booking.com", lastScraped: "Today, 09:42" },
    { id: "h2", name: "Four Seasons Resort Bali", location: "Bali", rating: "4.9", price: "$615", source: "Agoda", lastScraped: "Today, 08:15" },
    { id: "h3", name: "Hotel Indonesia Kempinski", location: "Jakarta", rating: "4.8", price: "$185", source: "Tripadvisor", lastScraped: "Yesterday" },
    { id: "h4", name: "Padma Hotel Bandung", location: "Bandung", rating: "4.8", price: "$160", source: "Booking.com", lastScraped: "Yesterday" },
    { id: "h5", name: "The Phoenix Hotel", location: "Yogyakarta", rating: "4.7", price: "$98", source: "Hotels.com", lastScraped: "Nov 15, 2026" },
    { id: "h6", name: "The Ritz-Carlton Bali", location: "Bali", rating: "4.7", price: "$385", source: "Agoda", lastScraped: "Nov 14, 2026" },
  ],
  stats: [
    { label: "Total Hotels", value: (rows) => String(rows.length) },
    { label: "Total Locations", value: (rows) => String(new Set(rows.map((row) => row.location)).size) },
    { label: "Data Sources", value: (rows) => String(new Set(rows.map((row) => row.source)).size) },
    { label: "Recently Updated", value: () => "Today" },
  ],
  toRow: (values, id) => ({ ...values, id, lastScraped: "Just now" }),
};

export const scrapingConfig: ManagementConfig = {
  title: "Scraping",
  description: "Manage your scraping jobs, monitor execution, and configure data extraction.",
  actionLabel: "New Scraping",
  searchPlaceholder: "Search scraping jobs...",
  columns: [
    { key: "name", label: "Job Name" },
    { key: "target", label: "Target URL" },
    { key: "type", label: "Scraping Type" },
    { key: "pages", label: "Pages Collected" },
    { key: "status", label: "Status" },
    { key: "lastRun", label: "Last Run" },
  ],
  filters: [
    { key: "status", label: "Status", options: ["Completed", "Processing", "Failed", "Pending"] },
    { key: "type", label: "Scraping Type", options: ["Hotel Listings", "Reviews", "Travel Data", "Website Content", "Price Comparison"] },
  ],
  fields: [
    { key: "name", label: "Job Name", required: true },
    { key: "target", label: "Target URL", type: "url", required: true, placeholder: "https://example.com" },
    { key: "type", label: "Scraping Type", type: "select", required: true, options: ["Hotel Listings", "Reviews", "Travel Data", "Website Content", "Price Comparison"] },
    { key: "description", label: "Description (optional)", type: "textarea" },
  ],
  rows: [
    { id: "s1", name: "Hotel Listings Scraper", target: "booking.com", type: "Hotel Listings", pages: "1,248", status: "Completed", lastRun: "Today, 09:42" },
    { id: "s2", name: "Hotel Reviews Scraper", target: "tripadvisor.com", type: "Reviews", pages: "856", status: "Processing", lastRun: "Today, 09:16" },
    { id: "s3", name: "Travel Data Extractor", target: "traveloka.com", type: "Travel Data", pages: "430", status: "Failed", lastRun: "Today, 08:50" },
    { id: "s4", name: "Website Content Scraper", target: "indonesia.travel", type: "Website Content", pages: "2,100", status: "Completed", lastRun: "Yesterday" },
    { id: "s5", name: "Price Comparison Scraper", target: "agoda.com", type: "Price Comparison", pages: "670", status: "Pending", lastRun: "Yesterday" },
  ],
  stats: [
    { label: "Total Jobs", value: (rows) => String(rows.length) },
    { label: "Completed", value: (rows) => countBy(rows, "status", "Completed") },
    { label: "Processing", value: (rows) => countBy(rows, "status", "Processing") },
    { label: "Failed", value: (rows) => countBy(rows, "status", "Failed") },
  ],
  toRow: (values, id) => ({ ...values, id, pages: "0", status: "Pending", lastRun: "Not run" }),
};

export const publishingConfig: ManagementConfig = {
  title: "Publishing",
  description: "Manage and monitor your content publishing activities.",
  actionLabel: "Create Post",
  searchPlaceholder: "Search content...",
  columns: [
    { key: "title", label: "Content Title" },
    { key: "platform", label: "Platform" },
    { key: "contentType", label: "Content Type" },
    { key: "publishDate", label: "Publishing Date" },
    { key: "status", label: "Status" },
  ],
  filters: [
    { key: "platform", label: "Platform", options: ["Instagram", "Facebook"] },
    { key: "status", label: "Status", options: ["Published", "Scheduled", "Draft", "Failed"] },
  ],
  fields: [
    { key: "title", label: "Post Title", required: true },
    { key: "description", label: "Content Description", type: "textarea", required: true },
    { key: "platform", label: "Platform", type: "select", required: true, options: ["Instagram", "Facebook"] },
    { key: "publishDate", label: "Publishing Date", type: "datetime-local", required: true },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Scheduled", "Published", "Failed"] },
  ],
  rows: [
    { id: "p1", title: "A weekend in Ubud", platform: "Instagram", contentType: "Photo", publishDate: "Nov 17, 2026 · 10:00", status: "Published" },
    { id: "p2", title: "Our Bali stay guide", platform: "Facebook", contentType: "Article", publishDate: "Nov 18, 2026 · 09:30", status: "Scheduled" },
    { id: "p3", title: "Five stays with a view", platform: "Instagram", contentType: "Carousel", publishDate: "Nov 19, 2026 · 12:00", status: "Draft" },
    { id: "p4", title: "City break: Jakarta", platform: "Facebook", contentType: "Photo", publishDate: "Nov 16, 2026 · 17:00", status: "Failed" },
    { id: "p5", title: "A quiet morning in Bali", platform: "Instagram", contentType: "Reel", publishDate: "Nov 15, 2026 · 08:00", status: "Published" },
  ],
  stats: [
    { label: "Total Posts", value: (rows) => String(rows.length) },
    { label: "Published", value: (rows) => countBy(rows, "status", "Published") },
    { label: "Scheduled", value: (rows) => countBy(rows, "status", "Scheduled") },
    { label: "Drafts", value: (rows) => countBy(rows, "status", "Draft") },
  ],
  getFormValues: (row) => ({ ...row, publishDate: "" }),
  toRow: (values, id) => ({ ...values, id, contentType: "Post", publishDate: values.publishDate ? new Date(values.publishDate).toLocaleString() : "Not set" }),
};

export const schedulesConfig: ManagementConfig = {
  title: "Schedules",
  description: "Configure and monitor your automated scraping and publishing schedules.",
  actionLabel: "Create Schedule",
  searchPlaceholder: "Search schedules...",
  columns: [
    { key: "name", label: "Schedule Name" },
    { key: "taskType", label: "Task Type" },
    { key: "frequency", label: "Frequency" },
    { key: "nextRun", label: "Next Run" },
    { key: "status", label: "Status" },
  ],
  filters: [
    { key: "taskType", label: "Task Type", options: ["Scraping", "Publishing"] },
    { key: "status", label: "Status", options: ["Active", "Paused"] },
  ],
  fields: [
    { key: "name", label: "Schedule Name", required: true },
    { key: "taskType", label: "Task Type", type: "select", required: true, options: ["Scraping", "Publishing"] },
    { key: "frequency", label: "Frequency", type: "select", required: true, options: ["Every Hour", "Daily", "Weekly", "Monthly"] },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "startTime", label: "Start Time", type: "time", required: true },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Paused"] },
  ],
  rows: [
    { id: "c1", name: "Daily Hotel Scraping", taskType: "Scraping", frequency: "Daily", startDate: "2026-11-18", startTime: "09:00", nextRun: "Tomorrow, 09:00", status: "Active" },
    { id: "c2", name: "Weekly Hotel Reviews Update", taskType: "Scraping", frequency: "Weekly", startDate: "2026-11-20", startTime: "10:30", nextRun: "Nov 20, 10:30", status: "Active" },
    { id: "c3", name: "Daily Content Publishing", taskType: "Publishing", frequency: "Daily", startDate: "2026-11-18", startTime: "12:00", nextRun: "Tomorrow, 12:00", status: "Paused" },
    { id: "c4", name: "Monthly Data Collection", taskType: "Scraping", frequency: "Monthly", startDate: "2026-12-01", startTime: "08:00", nextRun: "Dec 1, 08:00", status: "Active" },
  ],
  stats: [
    { label: "Total Schedules", value: (rows) => String(rows.length) },
    { label: "Active", value: (rows) => countBy(rows, "status", "Active") },
    { label: "Upcoming", value: (rows) => String(rows.filter((row) => row.status === "Active").length) },
    { label: "Paused", value: (rows) => countBy(rows, "status", "Paused") },
  ],
  getFormValues: (row) => ({ ...row }),
  toRow: (values, id) => ({ ...values, id, nextRun: `${values.startDate} · ${values.startTime}` }),
};
