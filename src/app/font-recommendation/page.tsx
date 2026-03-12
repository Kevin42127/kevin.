'use client'

import { useState } from 'react'
import FontRecommendationHero from './components/FontRecommendationHero'
import FontAnalyzer from './components/FontAnalyzer'
import FontRecommendations from './components/FontRecommendations'

interface AnalysisData {
  projectType: string
  style: string
  language: string
  targetAudience: string
}

export default function FontRecommendationPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | undefined>()

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data)
  }

  return (
    <main className="min-h-screen">
      <div data-scroll-section>
        <FontRecommendationHero />
      </div>
      <div data-scroll-section>
        <FontAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      </div>
      <div data-scroll-section>
        <FontRecommendations analysisData={analysisData} />
      </div>
    </main>
  )
}
