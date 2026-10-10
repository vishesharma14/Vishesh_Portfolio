import type { Project } from '../types.ts'

// Verified: the three featured projects, with text provided verbatim by the owner (2026-10-10).
// Keep the wording exactly as given: no rewording and no added claims. Order = display order.
// TODO(content): add an `image` for each project ({ src, alt, width, height }) once available.
export const projects: Project[] = [
  {
    slug: 'sizerai',
    title: 'SizerAI',
    summary:
      'A privacy-first web app that estimates body measurements from a guided 360° camera scan and recommends the right clothing size, with all pose detection running on-device in the browser.',
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
      'A fraud detection system evaluated as a hybrid of XGBoost and an Isolation Forest, plus a Streamlit app that scores transactions with XGBoost and explains each decision with SHAP.',
    description: [
      'Built on a synthetic dataset of 50,000 transactions with a realistic 1.5% fraud rate, including fraud cases designed to mimic normal behaviour, the system is evaluated with PR-AUC instead of ROC-AUC, which looks inflated under heavy class imbalance.',
      'A supervised XGBoost model learns known fraud patterns, while an Isolation Forest trained only on legitimate transactions flags unusual behaviour without needing labels. The weighted ensemble reaches a PR-AUC of about 0.82 with 0.97 precision, and per-transaction SHAP explanations show exactly why each transaction was flagged.',
    ],
    technologies: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'SHAP', 'Streamlit'],
    keyFeatures: [
      'Hybrid ensemble: 0.7 × XGBoost + 0.3 × Isolation Forest on normalized scores',
      'PR-AUC-first evaluation, with an F1-optimal threshold chosen from the precision-recall curve',
      'Per-transaction SHAP explanations alongside global feature importance',
      'Behavioural features: spend vs. personal baseline, night-time activity, card-not-present and transaction velocity',
      'Fraud Risk Console: a Streamlit app that scores a transaction with XGBoost and explains it with a SHAP waterfall plot',
    ],
    githubUrl: 'https://github.com/vishesharma14/fraud-detection-demo',
    liveUrl: 'https://fraud-detection-demo-redjohn.streamlit.app/',
    featured: true,
  },
  {
    slug: 'olympic-analytics',
    title: 'Olympic Analytics',
    summary:
      'An interactive Streamlit dashboard exploring 120 years of Summer Olympics history: medal tallies, country-wise performance, athlete demographics and participation trends.',
    description: [
      'Built on Kaggle\'s "120 years of Olympic history" dataset, the dashboard turns athlete-level records into four views: a filterable medal tally, an overall analysis, country-wise analysis and athlete-wise analysis.',
      'It pairs Plotly interactive charts, including a choropleth medal map and an animated medal race of the top 10 nations, with Matplotlib and Seaborn heatmaps and scatter plots, plus auto-generated "Did You Know?" facts.',
    ],
    technologies: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Plotly', 'Matplotlib', 'Seaborn'],
    keyFeatures: [
      'Medal tally filtered by year and country',
      'Choropleth medal map and an animated medal race of the top 10 nations',
      'Country-wise medal trends, a sport-wise performance heatmap and top athletes',
      'Athlete demographics: age by medal type, height vs. weight by sport, and gender participation over time',
    ],
    githubUrl: 'https://github.com/vishesharma14/olympic-analysis',
    liveUrl: 'https://olympic-analysis-wbcngllnqyncsjv4agufpt.streamlit.app/',
    featured: true,
  },
]
