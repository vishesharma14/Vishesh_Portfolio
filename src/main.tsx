import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './app/App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element "#root" was not found in index.html')
}

// index.html carries the home page's title and description for crawlers that don't run JavaScript.
// Every page renders its own (PageMetadata), which React adds next to those rather than in their
// place, so the ones from index.html go: otherwise every page would have two of each.
for (const element of document.head.querySelectorAll('title, meta[name="description"]')) {
  element.remove()
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
