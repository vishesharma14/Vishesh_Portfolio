import type { AiTopic } from '../types.ts'

// Verified: provided by the owner (2026-10-13). Keep the wording exactly as given.
// Only topics backed by real work are listed; RAG, vector databases and AI agents are left out
// until the owner has built something with them. Order = display order. `projects` are project
// slugs from projects.ts (content:check fails on a slug that doesn't exist).
export const aiTopics: AiTopic[] = [
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description:
      'Supervised and anomaly-detection models on imbalanced data, evaluated with PR-AUC and explained with SHAP.',
    tools: ['scikit-learn', 'XGBoost', 'Isolation Forest', 'SHAP'],
    projects: ['fraud-detection'],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Real-time pose detection and body segmentation that run entirely in the browser.',
    tools: ['MediaPipe'],
    projects: ['sizerai'],
  },
  {
    id: 'llms',
    title: 'Large Language Models',
    description:
      'Chat and multimodal features on hosted LLM APIs, including a multimodal chat app on Gemini 2.5 Flash.',
    tools: ['Gemini API'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description:
      'Generative models applied to real tasks: answering questions, summarising, and working with text and images.',
    tools: ['Gemini', 'Dify AI'],
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description:
      'Structured prompts, examples and output formats that make model responses consistent and checkable.',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
  },
]
