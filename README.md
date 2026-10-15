# Vishesh Sharma — Portfolio

The personal portfolio of Vishesh Sharma, a B.Tech Computer Science and Engineering student building machine-learning, data-science and generative-AI projects.

**Live site: [vishesh-sharma.vercel.app](https://vishesh-sharma.vercel.app)**

## Featured projects

- **SizerAI**: privacy-first sizing assistant that turns a guided camera scan into on-device body measurements and an explainable size recommendation.
  [Details](https://vishesh-sharma.vercel.app/projects/sizerai) · [Code](https://github.com/vishesharma14/Smart_fit_AI) · [Live demo](https://smart-fit-ai-xi.vercel.app/)
- **Explainable Fraud Detection System**: XGBoost and Isolation Forest ensemble with SHAP explanations, a Streamlit risk console and a FastAPI REST API.
  [Details](https://vishesh-sharma.vercel.app/projects/fraud-detection) · [Code](https://github.com/vishesharma14/fraud-detection-demo) · [Live demo](https://fraud-detection-demo-redjohn.streamlit.app/)
- **Olympic Analytics**: 120 years of Summer Olympics data, analysed in a Streamlit dashboard, in SQL and in Tableau.
  [Details](https://vishesh-sharma.vercel.app/projects/olympic-analytics) · [Code](https://github.com/vishesharma14/olympic-analysis) · [Live demo](https://olympic-analysis-wbcngllnqyncsjv4agufpt.streamlit.app/) · [Tableau dashboard](https://public.tableau.com/app/profile/vishesh.sharma3888/viz/OlympicsMedalDashboard_17916664107200/OlympicsDashboard)

The two Streamlit demos sleep when unused and may take a moment to wake up.

## Tech stack

- **React 19** and **TypeScript** (strict), built with **Vite**
- **Tailwind CSS 4** with a small custom design system (tokens, base components)
- **React Router** for the home page, project pages and the 404 page
- **zod** schemas that validate all portfolio content before every build
- **ESLint** and **Prettier**
- Hosted on **Vercel**

## Run it locally

Requires Node.js 22.18+ or 24.

```bash
git clone https://github.com/vishesharma14/Vishesh_Portfolio.git
cd Vishesh_Portfolio
npm ci
npm run dev        # http://localhost:5173
```

| Command           | What it does                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| `npm run dev`     | Development server at http://localhost:5173                                     |
| `npm run check`   | Type check, lint, formatting check and content validation                       |
| `npm run build`   | Production build in `dist/` (also validates the content and writes the sitemap) |
| `npm run preview` | Serves the production build locally                                             |

The site's text, projects and links live in `src/content/local/`.
