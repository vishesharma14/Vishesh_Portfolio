import { site } from '../app/site.ts'
import { useRenderedSections } from '../app/useSectionNav.ts'
import { PageMetadata } from '../components/layout/PageMetadata.tsx'
import { About } from '../features/about/About.tsx'
import { AiTopics } from '../features/ai/AiTopics.tsx'
import { Contact } from '../features/contact/Contact.tsx'
import { Education } from '../features/education/Education.tsx'
import { Hero } from '../features/hero/Hero.tsx'
import { Projects } from '../features/projects/Projects.tsx'
import { Resume } from '../features/resume/Resume.tsx'
import { Skills } from '../features/skills/Skills.tsx'

// The one-page portfolio, in the order listed in src/app/navigation.ts. Step 19 adds the GitHub
// Activity section (#github) between AI / GenAI and Resume.
export function HomePage() {
  const rendered = useRenderedSections()

  return (
    <>
      <PageMetadata title={site.title} description={site.description} />
      <Hero showContact={rendered.contact} />
      <About />
      <Education />
      <Skills />
      <Projects />
      <AiTopics />
      <Resume />
      <Contact />
    </>
  )
}
