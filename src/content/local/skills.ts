import type { SkillCategory } from '../types.ts'

// Verified: the seven skill categories from the project brief (CLAUDE.md), with skills provided
// by the owner (2026-10-11). Keep the names and their order exactly as given. Order = display order.
export const skills: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    skills: [{ name: 'Python' }, { name: 'SQL' }, { name: 'C++' }, { name: 'TypeScript' }],
  },
  {
    id: 'data-analytics',
    label: 'Data Analytics',
    skills: [
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Power BI' },
      { name: 'Tableau' },
      { name: 'Advanced Excel' },
      { name: 'Matplotlib' },
      { name: 'Seaborn' },
      { name: 'Plotly' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    skills: [
      { name: 'Machine Learning' },
      { name: 'scikit-learn' },
      { name: 'XGBoost' },
      { name: 'SHAP' },
      { name: 'MediaPipe' },
    ],
  },
  {
    id: 'genai',
    label: 'GenAI',
    skills: [
      { name: 'Generative AI' },
      { name: 'LLM APIs' },
      { name: 'Prompt Engineering' },
      { name: 'Dify AI' },
    ],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    skills: [{ name: 'React' }, { name: 'FastAPI' }, { name: 'REST APIs' }, { name: 'Streamlit' }],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [{ name: 'MySQL' }, { name: 'MongoDB' }, { name: 'SQLite' }],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Docker' },
      { name: 'Claude Code' },
      { name: 'Google Antigravity' },
    ],
  },
]
