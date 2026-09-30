# PrepMaster Studio — Technical & Behavioral Mock Interview Platform

An executive-grade, minimalist interview preparation studio designed for software engineers, engineering managers, and technical professionals. Practice high-stakes technical and behavioral rounds with realistic speech recognition, STAR-method structuring, and actionable hiring-manager rubrics.

---

## ⚡ Key Highlights & Capabilities

- **Role & Seniority Calibration**: Tailored questions configured by target position, years of experience, and specific tech stacks (Next.js, Go, PostgreSQL, AWS, Distributed Systems).
- **Speech-to-Text Studio**: Verbal answer capture using browser Web Speech recognition with live waveform animation and manual transcript refinement.
- **Text-to-Speech Narration**: Natural audio pronunciation for all interview prompts with playback and pause controls.
- **Executive Diagnostic Scorecards**: Comprehensive performance breakdowns with overall scores, candidate answer transcriptions, benchmark solutions, and tactical improvement notes.
- **STAR Framework Integration**: Built-in guidance for Situation, Task, Action, and Result structures directly in the live simulation room.
- **Confidential & Private**: Webcam view operates strictly in your local browser window to simulate live eye contact. No camera feeds are uploaded or stored.
- **Session History & Analytics**: Persistent scorecard archive with search/filter by role and technology.
- **Curated Question Repository**: Searchable bank of system design, frontend, backend, and leadership questions with evaluation criteria.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) & React 18 |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database & ORM** | [Neon PostgreSQL](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/) |
| **Generative Intelligence** | [Google Gemini 1.5 Flash](https://ai.google.dev/) via `@google/generative-ai` |
| **Speech Processing** | Browser Web Speech API & `react-hook-speech-to-text` |
| **Styling & UI** | Tailwind CSS with custom glassmorphism and Radix UI primitives |

---

## 📁 Project Architecture

```
PrepMaster/
├── app/
│   ├── (auth)/                 # Clerk Sign-In & Sign-Up routes
│   ├── dashboard/
│   │   ├── _components/        # Dashboard cards, header, and session modals
│   │   ├── instruction/        # Candidate strategy playbook & STAR guide
│   │   ├── interview/          # Lobby, live simulation studio & scorecards
│   │   ├── question/           # Curated technical question bank
│   │   └── upgrade/            # Membership tiers & privacy assurance
│   ├── globals.css             # Obsidian/zinc design system & animations
│   ├── layout.js               # Root layout & Clerk appearance configuration
│   └── page.js                 # Executive landing page & live mockup
├── components/
│   ├── Logo.jsx                # Architectural geometric monogram logo
│   └── ui/                     # Radix dialog, buttons, and form components
├── utils/
│   ├── GeminiAIModel.jsx       # Gemini generative model integration
│   ├── db.js                   # Neon PostgreSQL Drizzle connection
│   └── schema.js               # Drizzle schemas (MockInterview, UseAnswer)
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone & Navigate
```bash
git clone https://github.com/ShakilUrRehman21/AiMockInterviewer.git
cd PrepMaster
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.local` in the root folder:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgres_neon_connection_string
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Push Database Schema
```bash
npm run db:push
```

### 5. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `PrepMaster` (if nested) or root.
4. Add the environment variables from your `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
   - `NEXT_PUBLIC_DRIZZLE_DB_URL`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
5. Click **Deploy**.
