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
import PullToRefresh from '@/components/PullToRefresh'

export default function Home() {
  const handleRefresh = async () => {
    // 重新載入頁面
    window.location.reload()
  }

  return (
    <main className="min-h-screen">
      <PullToRefresh onRefresh={handleRefresh}>
        <Navigation />
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
        <AIAssistant />
        <WelcomeModal />
      </PullToRefresh>
    </main>
  )
}
