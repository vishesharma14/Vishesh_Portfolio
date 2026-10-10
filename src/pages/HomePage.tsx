import { About } from '../features/about/About.tsx'
import { Education } from '../features/education/Education.tsx'
import { Hero } from '../features/hero/Hero.tsx'

// The one-page portfolio, in the order listed in src/app/navigation.ts. Later steps add the
// remaining sections (#skills, #projects, ...) below Education.
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Education />
    </>
  )
}
