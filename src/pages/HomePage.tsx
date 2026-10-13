import { About } from '../features/about/About.tsx'
import { AiTopics } from '../features/ai/AiTopics.tsx'
import { Education } from '../features/education/Education.tsx'
import { Hero } from '../features/hero/Hero.tsx'
import { Projects } from '../features/projects/Projects.tsx'
import { Skills } from '../features/skills/Skills.tsx'

// The one-page portfolio, in the order listed in src/app/navigation.ts. Later steps add the
// remaining sections (#github, ...) below AI / GenAI.
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <AiTopics />
    </>
  )
}
