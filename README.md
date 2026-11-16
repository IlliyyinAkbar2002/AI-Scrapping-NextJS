# AI Agent: Hotel Data Scraping, Content Generation & Auto-Publishing

An intelligent AI agent built with Next.js that automates the entire content pipeline for hotel and travel content. This agent scrapes hotel data from public travel sources, analyzes and generates engaging blog content using AI, and automatically publishes and shares content to social media platforms on a scheduled basis.

## 🎯 Project Overview

This project implements **Track B: AI Agent (Scraping, Content Gen & Auto-Publish)** — a fully automated content generation and publishing system that leverages AI-powered scraping, content analysis, and social media automation.

### Core Capabilities

1. **Intelligent Hotel Data Scraping**
   - Scrapes hotel information from travel platforms (Expedia, Kayak, search engines, public databases)
   - Extracts key data points: pricing, amenities, reviews, location, photos
   - Uses tools like parse.bot and firecrawl for robust data extraction

2. **AI-Powered Content Generation**
   - Analyzes scraped hotel data to generate complete blog posts
   - Creates engaging copywriting with SEO optimization
   - Generates visual image prompts and assets for content enhancement
   - Powered by LLM integration (Ollama, OpenRouter, LangChain)

3. **Automated Publishing & Social Media Sharing**
   - Scheduled publishing every 2 hours to social media platforms
   - Multi-platform support (minimum 1 platform required)
   - Automated content formatting and optimization per platform
   - Integration with publishing APIs and social media tools

## 🏗️ Architecture

```
┌─────────────────┐
│   Scheduler     │  (Cron jobs / Queue system)
│  (Every 2hrs)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Data Scraper   │─────▶│  Hotel Database  │
│ (parse.bot/     │      │  (PostgreSQL/    │
│  firecrawl)     │      │   MongoDB)       │
└─────────────────┘      └────────┬─────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Content Analyzer │
                          │   (LangChain/    │
                          │    LLM API)      │
                          └────────┬─────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Content Generator│
                          │ (Blog Posts,     │
                          │  Images, SEO)    │
                          └────────┬─────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Auto-Publisher   │
                          │ (Social Media    │
                          │  APIs)           │
                          └──────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Modern UI styling

### AI & Data Processing
- **LangChain** — LLM orchestration and chains
- **Ollama / OpenRouter** — Local and cloud LLM providers
- **parse.bot / firecrawl** — Web scraping and data extraction
- **smithery** — Tool and agent orchestration

### Database & Storage
- **PostgreSQL / MongoDB** — Hotel data persistence
- **File storage** — Generated content and assets

### Automation & Publishing
- **Node-cron / Bull Queue** — Scheduled task execution
- **Social Media APIs** — Platform-specific publishing
- **rube.app** — Workflow automation

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai_agent_scrapping

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Configure your API keys for LLM providers, scraping tools, and social media

# Run database migrations (if applicable)
pnpm db:migrate

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🚀 Usage

### Manual Trigger
Access the dashboard to manually trigger scraping and content generation for testing.

### Automated Pipeline
The scheduler runs automatically every 2 hours:
- Scrapes new hotel data from configured sources
- Analyzes data and generates content
- Publishes to configured social media platforms

### Configuration
Edit `config/sources.ts` to customize:
- Scraping sources and frequency
- Content generation parameters
- Social media platforms and posting schedule

## 📊 Deliverables

- ✅ **Code Repository** — Full source code with documentation
- ✅ **Deployed Web App** — Live dashboard and monitoring interface
- ✅ **Social Media Posts** — Automated publishing with live post links
- ✅ **AI Coding Agent Logs** — Complete development process documentation

## 🔧 Development

```bash
# Run development server with hot reload
pnpm dev

# Run tests
pnpm test

# Lint and type-check
pnpm lint
pnpm type-check

# Build for production
pnpm build
```

## 📝 Environment Variables

Create a `.env.local` file:

```env
# LLM Configuration
OPENROUTER_API_KEY=your_key
OLLAMA_BASE_URL=http://localhost:11434

# Scraping Tools
FIRECRAWL_API_KEY=your_key
PARSE_BOT_API_KEY=your_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hoteldb

# Social Media APIs
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
FACEBOOK_PAGE_TOKEN=your_token

# Scheduler
CRON_SCHEDULE=0 */2 * * *
```

## 🤝 Contributing

This is a hackathon project. Contributions and feedback are welcome!

## 📄 License

MIT License

## 🎓 Hackathon Track

**Track B: AI Agent (Scraping, Content Gen & Auto-Publish)**

Built with AI vibe coding and spec-driven development methodologies.

---

**Keywords:** parse.bot, firecrawl, langchain, ollama, openrouter, rube.app, smithery
