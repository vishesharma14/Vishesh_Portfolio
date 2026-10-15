import type { AiTopic } from '../types.ts'

// Verified: the first five provided by the owner (2026-10-13); keep their wording exactly as given.
// The last two were written from the owner's facts about Olympic Analytics' "Ask the data"
// (2026-10-15, recorded in CLAUDE.md), with the owner's approval. Only topics backed by real work
// are listed: RAG and tool-calling agents only for "Ask the data", no other RAG, agent or
// multi-agent claims. Order = display order. `projects` are project slugs from projects.ts
// (content:check fails on a slug that doesn't exist).
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
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation',
    description:
      'Retrieval over 43 curated notes, each statistic checked against SQL, using Gemini embeddings with a keyword-search fallback.',
    tools: ['Gemini embeddings', 'BM25'],
    projects: ['olympic-analytics'],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Tool Calling',
    description:
      'A Gemini agent that writes SQL through a tool call, runs it in a read-only sandbox and shows the query and results with every answer.',
    tools: ['Gemini API', 'SQLite'],
    projects: ['olympic-analytics'],
  },
]
