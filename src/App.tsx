import { useState } from 'react'
import { AppToaster } from './components/Feedback/AppToaster'
import { DotGrid } from './components/Backgrounds/DotGrid'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Education } from './components/Education/Education'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { IntroScreen } from './components/Intro/IntroScreen'
import { useIntroScreen } from './hooks/useIntroScreen'
import { useMatrixButtonHover } from './hooks/useMatrixButtonHover'
import { Projects } from './components/Projects/Projects'
import { Skills } from './components/Skills/Skills'

function App() {
  const { showIntro, completeIntro } = useIntroScreen()
  const [pageReady, setPageReady] = useState(!showIntro)

  useMatrixButtonHover()

  const handleIntroComplete = () => {
    completeIntro()
    setPageReady(true)
  }

  return (
    <>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      <DotGrid
        className="pointer-events-none fixed inset-0 -z-10 h-svh w-full"
        dotSize={6}
        gap={32}
        baseColor="#1e2f3f"
        activeColor="#3dd9ee"
        proximity={120}
      />

      <Header />
      <main className={pageReady ? 'animate-page-enter overflow-x-hidden' : 'overflow-x-hidden'}>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
      <AppToaster />
    </>
  )
}

export default App
