import { useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { PageReadyProvider } from './context/PageReadyProvider'
import { usePageReady } from './hooks/usePageReady'
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
import { useHashRouting } from './hooks/useHashRouting'
import { useMatrixButtonHover } from './hooks/useMatrixButtonHover'
import { Projects } from './components/Projects/Projects'
import { Skills } from './components/Skills/Skills'

function MainContent() {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()

  return (
    <m.main
      className="overflow-x-hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <Projects />
      <Skills />
      <Education />
      <About />
      <Contact />
    </m.main>
  )
}

function App() {
  const { showIntro, completeIntro } = useIntroScreen()
  const [pageReady, setPageReady] = useState(!showIntro)

  useMatrixButtonHover()
  useHashRouting(pageReady)

  const handleIntroComplete = () => {
    completeIntro()
    setPageReady(true)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <PageReadyProvider ready={pageReady}>
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
        <MainContent />
        <Footer />
        <AppToaster />
      </PageReadyProvider>
    </LazyMotion>
  )
}

export default App
