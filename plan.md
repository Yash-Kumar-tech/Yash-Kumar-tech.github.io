# Blueprint & Technical Specification: Custom Academic & Engineering Portfolio

**Author:** Yash Sonkar  
**Target Profile:** Ph.D. Researcher (Speech AI / Multimodal Generation) & AI-ML Systems Engineer  
**Deployment Target:** GitHub Pages (`https://Yash-Kumar-tech.github.io`)  
**Design Philosophy:** Minimalist, high-performance, template-free, content-first with native LaTeX and audio demo capabilities.

---

## 1. Executive Summary & Design Goals

As a Ph.D. researcher at IIIT Hyderabad working under Dr. Vineet Gandhi and a systems engineer working with PyTorch, Rust, and C++, your personal website serves a dual purpose:
1. **Academic Portfolio:** Showcasing peer-reviewed publications (e.g., ACM CHI, Interspeech), providing one-click BibTeX citations, project pages, and interactive audio demonstrations for atypical speech restoration and ultrasound-to-speech models.
2. **Engineering & Systems Showcase:** Demonstrating real-world software engineering capabilities (e.g., `term_mux` in Rust, ONNX/OpenVINO inference engines, VRAM-aware vector search backends).
3. **Technical Blog Platform:** Publishing in-depth technical breakdowns with first-class rendering for mathematical proofs ($\LaTeX$), terminal layouts, and benchmark figures.

---

## 2. Technology Stack & Rationale

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | **Astro (v4.x+)** | Zero-JS default output for static pages; unmatched performance (100 Lighthouse score); native MDX support allows dropping interactive UI components (like audio players) directly inside markdown files. |
| **Styling** | **Tailwind CSS (v3/v4)** | Rapid, utility-first styling with zero runtime footprint. Easily implements clean dark/light themes, typography scales, and responsive layouts. |
| **Content Authoring** | **MDX + Remark + Rehype** | Enables writing publications and blogs in standard Markdown while embedding interactive JSX/Astro components, KaTeX math equations, and code blocks. |
| **Math Rendering** | **KaTeX (`remark-math` + `rehype-katex`)** | Blazing-fast static compilation of LaTeX equations ($E=mc^2$, Transformer attention formulations) without client-side render lag. |
| **Code Highlighting** | **Shiki / Expressive Code** | Built into Astro; accurate, pre-rendered VS Code-grade syntax highlighting for Python, Rust, C++, and Bash with line highlighting and copy buttons. |
| **Hosting & CI/CD** | **GitHub Actions + GitHub Pages** | 100% free, zero maintenance, version-controlled deployment directly from the `Yash-Kumar-tech.github.io` repository. |

---

## 3. Architecture & Repository Structure

```text
my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline for GitHub Pages
├── public/
│   ├── audio/                      # Audio comparison samples (WAV / MP3)
│   │   ├── claris_input_dys.wav
│   │   ├── claris_output_clean.wav
│   │   ├── tongue_input_us.wav
│   │   └── tongue_output_syn.wav
│   ├── favicon.svg
│   ├── profile.jpg                 # Headshot / Portrait
│   └── yash_sonkar_cv.pdf          # Latest compiled PDF resume
├── src/
│   ├── components/
│   │   ├── AudioCompare.astro      # Interactive A/B audio player widget
│   │   ├── BibtexModal.astro       # Collapsible/Copyable citation box
│   │   ├── Footer.astro            # Links, copyright, scholar icon
│   │   ├── Header.astro            # Sticky navigation bar & theme toggle
│   │   ├── ProjectCard.astro       # Systems/SWE project display card
│   │   └── PubCard.astro           # Academic publication item
│   ├── content/
│   │   ├── config.ts               # Content Collections schema (Zod)
│   │   ├── blog/                   # Technical blog posts (.mdx)
│   │   │   ├── 2026-02-claris-inference-onnx.mdx
│   │   │   └── 2026-01-building-windows-multiplexer-rust.mdx
│   │   └── publications/           # Structured publication entries (.json or .md)
│   │       ├── 2026-chi-claris.json
│   │       └── 2026-interspeech-tongue2speech.json
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, SEO meta tags, KaTeX CSS
│   │   └── BlogPostLayout.astro    # Reading container with TOC and metadata
│   ├── pages/
│   │   ├── index.astro             # Main landing: Bio, Featured Pubs & Projects
│   │   ├── research.astro          # Comprehensive publications & research page
│   │   ├── projects.astro          # Open-source and systems engineering portfolio
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog index with category/tag filtering
│   │   │   └── [...slug].astro     # Dynamic post route
│   │   └── cv.astro                # Embedded PDF viewer + structured HTML CV
│   └── styles/
│       └── global.css              # Typography overrides, KaTeX styles
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 4. Component & Layout Specifications

### 4.1. Homepage (`src/pages/index.astro`)
The homepage should follow a single-column or refined two-column layout optimized for readability:
* **Hero / Introduction:** 
  * Name, affiliation ("Ph.D. student in CSE at IIIT Hyderabad, advised by Dr. Vineet Gandhi").
  * Core focus badges: `Multimodal Speech Generation`, `Streaming Audio Models`, `On-Device ML / Rust`.
  * Quick links with icons: Email, Google Scholar, GitHub (`Yash-Kumar-tech`), LinkedIn.
* **Featured Publications:** Top highlights (`CLARIS` at ACM CHI, `Tongue2Speech` at Interspeech) with direct paper, code, and project links.
* **Featured Engineering Projects:** Systems projects (`term_mux`, `AI Image Search & Manager`).
* **Recent Posts:** Snippets of the 2-3 most recent engineering blog posts.

---

### 4.2. Interactive Audio Comparison Component (`src/components/AudioCompare.astro`)
Speech synthesis portfolios stand out when visitors can immediately listen to before/after results without leaving the page.

```astro
---
interface Props {
  title: string;
  description?: string;
  inputAudio: string;
  outputAudio: string;
  inputLabel?: string;
  outputLabel?: string;
}

const { 
  title, 
  description, 
  inputAudio, 
  outputAudio, 
  inputLabel = "Input Speech (Dysarthric / Whispered)", 
  outputLabel = "Synthesized / Restored Speech" 
} = Astro.props;
---

<div class="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
  <h4 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
  {description && <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-4">{description}</p>}
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <span class="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">{inputLabel}</span>
      <audio controls class="w-full mt-2 h-8" preload="none" src={inputAudio}></audio>
    </div>
    
    <div class="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <span class="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{outputLabel}</span>
      <audio controls class="w-full mt-2 h-8" preload="none" src={outputAudio}></audio>
    </div>
  </div>
</div>
```

---

### 4.3. Publication Item Component (`src/components/PubCard.astro`)
Renders academic entries cleanly, automatically highlighting your name in bold:

```astro
---
interface Props {
  title: string;
  authors: string;
  venue: string;
  year: number | string;
  paperUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  highlightNote?: string;
}

const { title, authors, venue, year, paperUrl, projectUrl, codeUrl, bibtex, highlightNote } = Astro.props;
---

<article class="py-5 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
  <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
    <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
    <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 w-fit">{venue} {year}</span>
  </div>
  
  <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1" set:html={authors.replace('Yash Sonkar', '<strong class="text-zinc-900 dark:text-zinc-100 font-semibold underline decoration-zinc-400">Yash Sonkar</strong>')} />
  
  {highlightNote && <p class="text-xs text-amber-700 dark:text-amber-300 font-medium mt-1">{highlightNote}</p>}

  <div class="flex flex-wrap items-center gap-3 mt-3 text-xs font-medium">
    {paperUrl && <a href={paperUrl} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">📄 Paper</a>}
    {projectUrl && <a href={projectUrl} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">🌐 Project Page</a>}
    {codeUrl && <a href={codeUrl} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">💻 Code</a>}
    {bibtex && (
      <details class="inline-block cursor-pointer">
        <summary class="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">BibTeX</summary>
        <pre class="mt-2 p-3 text-[11px] bg-zinc-100 dark:bg-zinc-800 rounded font-mono overflow-x-auto text-left select-all">{bibtex}</pre>
      </details>
    )}
  </div>
</article>
```

---

## 5. Configuration & Code Snippets

### 5.1. `astro.config.mjs`
Configured for Math/LaTeX rendering and MDX support:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://Yash-Kumar-tech.github.io',
  base: '/',
  integrations: [
    tailwind(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

### 5.2. `src/content/config.ts` (Content Collections)
Strict type-checking for blogs and publications:

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## 6. GitHub Actions Deployment Workflow

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site with Astro
        run: npm run build

      - name: Upload artifact for Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 7. Content Strategy & Initial Blog Ideas

Based on your resume and projects, here are high-impact technical blog topics:

1. **Deploying Auto-Regressive S2U Transformers with ONNX and OpenVINO:**
   * Step-by-step tutorial on exporting dynamic-axis PyTorch models.
   * Implementing efficient beam search for Code HiFi-GAN vocoders to run at real-time speeds on consumer CPUs.
2. **Building a Native Windows Terminal Multiplexer in Rust:**
   * Interfacing with the Windows `ConPTY` API.
   * Managing asynchronous I/O and writing an ANSI escape code interpreter from scratch.
3. **Ultrasound-to-Speech: Spatio-Temporal Modeling for Silent Speech Interfaces:**
   * Mathematical intuition behind 3D CNN spatio-temporal encoders combined with multi-layer Transformers.
   * Benchmarking results on the TaL corpus against baseline architectures.
4. **VRAM-Aware Vector Database Architectures for Desktop Applications:**
   * Combining ChromaDB vector indexing with SQLite and Vision-Language models (Qwen-VL / Florence-2) while maintaining memory stability.

---

## 8. Step-by-Step Execution Plan

```text
Phase 1: Project Setup (Day 1)
  ├── Initialize Git repository: Yash-Kumar-tech.github.io
  ├── Setup Astro + Tailwind + MDX + KaTeX dependencies
  └── Verify initial build & local server (npm run dev)

Phase 2: Core Components & Layouts (Day 2-3)
  ├── BaseLayout.astro (SEO, fonts, dark mode, KaTeX stylesheet)
  ├── PubCard.astro and AudioCompare.astro widgets
  └── Responsive Header & Footer navigation

Phase 3: Content Integration (Day 4)
  ├── Populate publications (CLARIS, Tongue2Speech)
  ├── Populate engineering projects (term_mux, AI Image Search)
  └── Copy CV PDF into public/ and link appropriately

Phase 4: Technical Blog Setup (Day 5)
  ├── Write and test first MDX post with math and code snippets
  └── Test audio player embeds inside MDX

Phase 5: Deployment & CI/CD Verification (Day 6)
  ├── Configure GitHub Pages settings to "GitHub Actions"
  ├── Push repository to main branch
  └── Audit performance, mobile responsiveness, and SEO tags
