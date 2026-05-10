# PIDA-LAB

**Rethinking AI Systems, Decision & Responsibility**

> AI is not a capability problem. It is a relationship structure failure.

---

## Overview

PIDA-LAB is a research and publishing platform focused on AI system design, decision responsibility frameworks, and structural approaches to human-AI interaction.

The site is built with Next.js, deployed on Vercel, and connected to GitHub for continuous deployment.

**Live site:** [www.pida-lab.com](https://www.pida-lab.com)

---

## STME — Structured Multi-State Transition & Evaluation

STME is a decision framework developed at PIDA-LAB. It decomposes decision problems into structured states and transitions without making decisions for the user.

**Research:**
- **SSRN Paper:** [papers.ssrn.com · abstract_id=6548019](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6548019)
- **Provisional Patent Pending (USPTO)** · Application No.: 64/045,009

### Demo Versions

| Version | Name | Description |
|---------|------|-------------|
| V1 | Core Engine | Pure structural output. No interpretation layer. |
| V2 | Interactive Demo | Adds interpretation and user guidance. |
| V3 | Condition-Based Analysis | Validates conditions before entering STME. |
| V4 | Guided Scenario Demo | Preset scenarios with Demo Mode (no API key required). |
| V5 | Full Production | Decision History, Interpretation Engine, Export / Audit. |

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js |
| Hosting | Vercel |
| Source Control | GitHub |
| Content | Markdown (`.md`) |
| Styling | CSS (globals.css) |
| AI Integration | OpenAI API (gpt-4o-mini) |

---

## Project Structure

```
pida-lab/
├── components/        # Nav, Footer, ArticleCard
├── lib/               # posts.server.js, categories.js
├── pages/
│   ├── demo/          # v1.js, v2.js, v3.js, v4.js, v5.js
│   ├── posts/         # [id].js — dynamic post rendering
│   ├── categories/    # category pages
│   ├── index.js       # Home
│   ├── about.js
│   ├── contact.js
│   ├── privacy.js
│   ├── demo.js        # Demo index
│   └── sitemap.xml.js
├── posts/             # Markdown articles (.md)
├── styles/
│   └── globals.css
├── next.config.js
└── vercel.json
```

---

## Adding New Articles

Articles are written in Markdown and placed in the `posts/` folder. No local setup required — edit directly on GitHub.

**File naming:** `your-article-slug.md`

**Required frontmatter:**

```markdown
---
title: 'Your Article Title'
date: '2026-05-08'
category: 'ai-systems'
excerpt: 'A short description of the article.'
---

Article content starts here...
```

Once committed to `main`, Vercel automatically deploys. The sitemap updates automatically.

---

## Contact

- **Email:** richchang0721@gmail.com
- **Research Collaboration:** [pida-lab.com/contact](https://www.pida-lab.com/contact)

---

## License

All written content on PIDA-LAB is © PIDA-LAB. All rights reserved.

Code structure is available for reference. Please contact us before reuse.
