import type { Project } from '../types.ts'

// Verified: the three featured projects, with text provided verbatim by the owner (2026-10-10).
// Keep the wording exactly as given: no rewording and no added claims. Order = display order.
// TODO(content): add an `image` for each project ({ src, alt, width, height }) once available.
export const projects: Project[] = [
  {
    slug: 'sizerai',
    title: 'SizerAI',
    summary:
      'Privacy-first sizing assistant that turns a guided 360° camera scan into body measurements and an explainable clothing-size recommendation, fully on-device with no images ever uploaded.',
    description: [
      "SizerAI turns a phone or laptop camera into an assistive sizing tool. A guided scan detects the user's body angle and automatically captures eight views when they hold still, checking lighting, framing, posture and stillness before each capture. Pose detection and body segmentation run entirely in the browser with MediaPipe, and no camera frames are uploaded or stored.",
      'Measurements are scaled from the user\'s entered height, combined across views with a confidence score for each, and shown for review and correction. A transparent, rule-based engine then maps them to a size (S–XXL) with a fit status and a plain-language "Why this size?" explanation, using generic or reference brand charts.',
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'MediaPipe Tasks Vision',
      'Three.js',
      'Zustand',
      'React Router',
      'Framer Motion',
      'Vitest',
    ],
    keyFeatures: [
      'Hands-free 360° scan that captures eight views automatically, with live quality checks and optional voice guidance',
      "On-device processing: no frames leave the browser, and a Content-Security-Policy restricts network access to the app's own origin",
      'Measurement review showing status, confidence and reasoning, with user edits clearly marked',
      "Explainable size recommendation with Slim, Regular and Relaxed fit and reference charts for Nike, Levi's and H&M",
      'Demo Mode, a saved fit profile with measurement history, and a Privacy Center for one-click data deletion',
    ],
    githubUrl: 'https://github.com/vishesharma14/Smart_fit_AI',
    liveUrl: 'https://smart-fit-ai-xi.vercel.app/',
    featured: true,
  },
  {
    slug: 'fraud-detection',
    title: 'Explainable Fraud Detection System',
    summary:
      'Hybrid fraud detection combining XGBoost and an Isolation Forest, reaching 0.82 PR-AUC on imbalanced synthetic data, with a live XGBoost risk console that explains every decision with SHAP.',
    description: [
      'Built on a synthetic dataset of 50,000 transactions with a realistic 1.5% fraud rate, including fraud cases designed to mimic normal behaviour, the system is evaluated with PR-AUC instead of ROC-AUC, which looks inflated under heavy class imbalance.',
      'A supervised XGBoost model learns known fraud patterns, while an Isolation Forest trained only on legitimate transactions flags unusual behaviour without needing labels. The weighted ensemble reaches a PR-AUC of about 0.82 with 0.97 precision, and per-transaction SHAP explanations show exactly why each transaction was flagged.',
      'The model is also served through a FastAPI REST API that returns each score with its SHAP explanation, covered by 12 pytest tests and packaged with a Dockerfile.',
    ],
    technologies: [
      'Python',
      'Pandas',
      'scikit-learn',
      'XGBoost',
      'SHAP',
      'Streamlit',
      'FastAPI',
      'pytest',
      'Docker',
    ],
    keyFeatures: [
      'Hybrid ensemble: 0.7 × XGBoost + 0.3 × Isolation Forest on normalized scores',
      'PR-AUC-first evaluation, with an F1-optimal threshold chosen from the precision-recall curve',
      'Per-transaction SHAP explanations alongside global feature importance',
      'Behavioural features: spend vs. personal baseline, night-time activity, card-not-present and transaction velocity',
      'Fraud Risk Console: a Streamlit app that scores a transaction with XGBoost and explains it with a SHAP waterfall plot',
      'REST API: FastAPI endpoints (/predict, /predict/batch) that return the fraud score with its top 5 SHAP factors and reject invalid input',
      'Tested and packaged: 12 pytest tests confirm parity with the offline evaluation, plus a Dockerfile with a non-root user and health check',
    ],
    githubUrl: 'https://github.com/vishesharma14/fraud-detection-demo',
    liveUrl: 'https://fraud-detection-demo-redjohn.streamlit.app/',
    featured: true,
  },
  {
    slug: 'olympic-analytics',
    title: 'Olympic Analytics',
    summary:
      'Interactive analytics dashboard that turns 120 years of Summer Olympics data into medal tallies, country and athlete insights, an animated medal race and a choropleth world map.',
    description: [
      'Built on Kaggle\'s "120 years of Olympic history" dataset, the dashboard turns athlete-level records into four views: a filterable medal tally, an overall analysis, country-wise analysis and athlete-wise analysis.',
      'It pairs Plotly interactive charts, including a choropleth medal map and an animated medal race of the top 10 nations, with Matplotlib and Seaborn heatmaps and scatter plots, plus auto-generated "Did You Know?" facts.',
      'The same data is also analysed in SQL, answering 10 business questions on SQLite and MySQL 8, and visualised in an interactive Tableau Public dashboard.',
    ],
    technologies: [
      'Python',
      'Streamlit',
      'Pandas',
      'NumPy',
      'Plotly',
      'Matplotlib',
      'Seaborn',
      'SQL',
      'MySQL',
      'Tableau',
    ],
    keyFeatures: [
      'Medal tally filtered by year and country',
      'Choropleth medal map and an animated medal race of the top 10 nations',
      'Country-wise medal trends, a sport-wise performance heatmap and top athletes',
      'Athlete demographics: age by medal type, height vs. weight by sport, and gender participation over time',
      'SQL analysis: 10 business questions using CTEs and window functions (RANK, LAG, SUM OVER), portable across SQLite and MySQL 8',
      'Tableau Public dashboard: medal map, top-10 and top-15 rankings, Year and Country filters and click-a-country drill-down',
    ],
    githubUrl: 'https://github.com/vishesharma14/olympic-analysis',
    liveUrl: 'https://olympic-analysis-wbcngllnqyncsjv4agufpt.streamlit.app/',
    extraLink: {
      label: 'Tableau Dashboard',
      url: 'https://public.tableau.com/app/profile/vishesh.sharma3888/viz/OlympicsMedalDashboard_17916664107200/OlympicsDashboard',
    },
    featured: true,
  },
]
