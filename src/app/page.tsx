'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import WelcomeModal from '@/components/WelcomeModal'

export default function Home() {
  return (
    <>
      <Navigation />
      <WelcomeModal />
      <AIAssistant />
      <main>
        <div data-scroll-section>
          <Hero />
        </div>
        <div data-scroll-section>
          <About />
        </div>
        <div data-scroll-section>
          <Portfolio />
        </div>
        <div data-scroll-section>
          <Skills />
        </div>
        <div data-scroll-section>
          <Experience />
        </div>
        <div data-scroll-section>
          <Contact />
        </div>
        <div data-scroll-section>
          <Footer />
        </div>
      </main>
    </>
  )
}
