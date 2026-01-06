# Arifian.dev

Personal portfolio website redesign (v4). Built with Next.js and a sprinkle of AI.

## About

This is my personal portfolio showcasing projects, experiences, and a bit about who I am. It also includes an AI chatbot powered by RAG technology and an anonymous messaging feature.

## Features

- Dark/Light mode with system preference detection
- Responsive design across all devices
- Personal AI assistant (Arifian.AI) with RAG-based knowledge
- Anonymous messaging system
- Project showcase with detailed views
- Smooth animations and transitions
- Scroll to top button
- Static export support for traditional hosting

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage - Hero, About preview, Experiences, Featured Projects, Contact |
| `/about` | Detailed about page with skills, music, and more |
| `/projects` | All projects listing |
| `/projects/[id]` | Individual project details |
| `/ai` | Arifian.AI - Personal AI chatbot |
| `/message` | Anonymous message board |

## Hosting

**Primary:** [arifian.dev](https://arifian.dev)

**Secondary:**
- Netlify: [arifian.netlify.app](https://arifian.netlify.app)
- Vercel: [arifian853.vercel.app](https://arifian853.vercel.app)

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- shadcn/ui (Radix UI)
- next-themes

### Backend (AI & Messaging API)
- FastAPI
- Google Gemini 2.5 Flash
- SentenceTransformer (all-MiniLM-L6-v2)
- MongoDB
- Hosted on Hugging Face Spaces

## Scripts

```bash
# Development
npm run dev

# Production build (Vercel/Netlify)
npm run build

# Static export (cPanel/traditional hosting)
npm run build:static
```

---

Made by Arifian Saputra
