import type { AiTopic } from '../types.ts'

// Verified: the AI / GenAI topics named in the project brief (CLAUDE.md).
// TODO(content): add a `description` and the `tools` used for each topic, and remove any
// topic that shouldn't appear on the site.
export const aiTopics: AiTopic[] = [
  { id: 'machine-learning', title: 'Machine Learning', tools: [] },
  { id: 'llms', title: 'LLMs', tools: [] },
  { id: 'rag', title: 'RAG', tools: [] },
  { id: 'vector-databases', title: 'Vector Databases', tools: [] },
  { id: 'prompt-engineering', title: 'Prompt Engineering', tools: [] },
  { id: 'ai-agents', title: 'AI Agents', tools: [] },
  { id: 'computer-vision', title: 'Computer Vision', tools: [] },
  { id: 'generative-ai', title: 'Generative AI', tools: [] },
]
