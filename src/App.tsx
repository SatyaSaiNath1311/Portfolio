import Header from './components/Header'
import Hero from './components/Hero'
import ToolsStrip from './components/ToolsStrip'
import Impact from './components/Impact'
import Journey from './components/Journey'
import Approach from './components/Approach'
import Work from './components/Work'
import Skills from './components/Skills'
import Notes from './components/Notes'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

/**
 * Root layout.
 * - No fixed 3D canvas overlay (3D is hero-local only).
 * - Paper (#F6F6F2) + dot-grid on body via CSS.
 * - Journey section overrides to void (#0B0E14) with no dot-grid.
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ToolsStrip />
        <Impact />
        <Journey />
        <Approach />
        <Work />
        <Skills />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
