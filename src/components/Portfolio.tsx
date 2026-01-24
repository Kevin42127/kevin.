'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

type CategoryKey = 'all' | 'chrome' | 'bot' | 'web' | 'desktop' | 'mobile'

const categoryKeyMap: Record<CategoryKey, string> = {
  all: 'portfolio.categoryAll',
  chrome: 'portfolio.categoryChromeExtension',
  bot: 'portfolio.categoryBot',
  web: 'portfolio.categoryWebApp',
  desktop: 'portfolio.categoryDesktopApp',
  mobile: 'portfolio.categoryMobileApp'
}

export default function Portfolio() {
  const { t } = useTranslationSafe()
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all')

  const projects = [
    {
      id: 1,
      title: t('portfolio.djkridp.title', 'DJKridP'),
      description: t('portfolio.djkridp.description', '受國際知名 DJ 委託開發的官方品牌網站，整合多國巡演資訊與社群媒體，展現跨文化協作與前端開發能力'),
      image: '/DJKridP.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Express', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://djkridp.vercel.app/',
      featured: true
    },
    {
      id: 2,
      title: t('portfolio.lineBot.title', 'LINE BOT'),
      description: t('portfolio.lineBot.description', '運用 TypeScript 與 Express 打造的 LINE 聊天機器人，整合 AI 協作功能'),
      image: '/LINE BOT.png',
      technologies: ['TypeScript', 'Express', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://lin.ee/ivLUnsp',
      featured: true
    },
    {
      id: 3,
      title: t('portfolio.chefAI.title', 'ChefAI'),
      description: t('portfolio.chefAI.description', '運用 Vue 與 Vite 打造 AI 食譜生成平台'),
      image: '/ChefAI.png',
      technologies: ['Vue', 'Vite', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chefaiofficial.vercel.app/',
      featured: true
    },
    {
      id: 4,
      title: t('portfolio.aiTeacher.title', 'AI老師'),
      description: t('portfolio.aiTeacher.description', '運用 Vue 與 Vite 打造的 AI 協作專案'),
      image: '/AI老師.png',
      technologies: ['Vue', 'Vite', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://homeaiofficial.vercel.app/',
      featured: true
    },
    {
      id: 5,
      title: t('portfolio.sumVid.title', 'SumVid'),
      description: t('portfolio.sumVid.description', '讓 AI 為您快速提取影片重點'),
      image: '/SumVid.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/sumvid/dmcnnoefjaebkagfhpjnofbcmldnfedp',
      featured: true
    },
    {
      id: 6,
      title: t('portfolio.discordAIBot.title', 'Discord AI Bot'),
      description: t('portfolio.discordAIBot.description', '運用 Python 打造的 Discord AI 聊天機器人，提供智能對話服務'),
      image: '/DISCORD.png',
      technologies: ['Python', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://discord.com/oauth2/authorize?client_id=1447853825057619981&permissions=2147601408&integration_type=0&scope=bot+applications.commands',
      featured: true
    },
    {
      id: 7,
      title: t('portfolio.acadAI.title', 'AcadAI'),
      description: t('portfolio.acadAI.description', 'AI 自動幫你整理商品重點'),
      image: '/AcadAI.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/acadai/accefaglmgngpkinapofhodbkpafmjok',
      featured: true
    },
    {
      id: 8,
      title: t('portfolio.taiwanWeatherAI.title', '臺灣氣象AI助手'),
      description: t('portfolio.taiwanWeatherAI.description', '查詢天氣與 AI 問答'),
      image: '/臺灣氣象AI助手.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/%E8%87%BA%E7%81%A3%E6%B0%A3%E8%B1%A1ai%E5%8A%A9%E6%89%8B/oiefmbmfndlpejflldfknalgpljnbced',
      featured: true,
      categoryKey: 'chrome' as CategoryKey
    },
    {
      id: 9,
      title: t('portfolio.taskMate.title', 'TaskMate'),
      description: t('portfolio.taskMate.description', '以 .NET 8 / C# 開發，使用 Avalonia 跨平台桌面框架，採 MVVM 架構，本地以 JSON 存檔的待辦應用'),
      image: '/TaskMate.png',
      technologies: ['C#', '.NET 8', 'Avalonia', 'MVVM', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://taskfriend.vercel.app/',
      featured: true,
      categoryKey: 'desktop' as CategoryKey
    },
    {
      id: 10,
      title: t('portfolio.chatFlow.title', 'ChatFlow'),
      description: t('portfolio.chatFlow.description', '跨平台行動應用，整合 Groq AI，提供即時對話。支援 iOS 與 Android，具備多語言與主題切換'),
      image: '/ChatFlow.png',
      technologies: ['Expo', 'React', 'Express', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chatflowk-kevin.vercel.app/download.html',
      featured: true,
      categoryKey: 'mobile' as CategoryKey
    }
  ]

  projects.forEach((project: any) => {
    if (!project.categoryKey) {
      if (project.technologies.some((tech: string) => tech.includes('Chrome Extension'))) {
        project.categoryKey = 'chrome'
      } else if ((project.technologies.some((tech: string) => ['Python', 'TypeScript'].includes(tech)) && project.title.includes('BOT')) || project.title.includes('LINE BOT') || project.title.includes('Discord')) {
        project.categoryKey = 'bot'
      } else {
        project.categoryKey = 'web'
      }
    }
  })

  const categories: CategoryKey[] = ['all', ...Array.from(new Set(projects.map((p: any) => p.categoryKey)))]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter((project: any) => project.categoryKey === selectedCategory)

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[var(--color-page)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c1f2c] mb-3 sm:mb-4 px-4">
{t('portfolio.title', '我的作品')}
          </h2>
          <p className="text-lg sm:text-xl text-[#4a4455] max-w-3xl mx-auto px-4">
{t('portfolio.subtitle', '精選專案展示，展現技術實力和創意思維')}
          </p>
        </div>

        <div className="mb-8 sm:mb-10 px-2 sm:px-4">
          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-nowrap justify-start md:justify-center items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 sm:px-4 md:px-0">
              {categories.map((categoryKey) => (
                <button
                  key={categoryKey}
                  onClick={() => setSelectedCategory(categoryKey)}
                  className={`flex-shrink-0 px-3 sm:px-4 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm md:text-sm lg:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === categoryKey
                      ? 'bg-[#1d47ff] text-white shadow-lg shadow-[#1d47ff]/20 scale-105'
                      : 'bg-white text-[#1c1f2c] border border-[var(--color-divider)] hover:bg-[var(--color-panel)] hover:border-[#1d47ff]/30 hover:scale-105 active:scale-95'
                  }`}
                >
                  {t(categoryKeyMap[categoryKey], categoryKey === 'all' ? '全部' : categoryKey === 'chrome' ? 'Chrome擴展' : categoryKey === 'bot' ? '聊天機器人' : categoryKey === 'web' ? 'Web應用' : categoryKey === 'desktop' ? '桌面應用' : categoryKey === 'mobile' ? '行動應用' : '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3, delay: index * 0.02 },
                  y: { duration: 0.3, delay: index * 0.02 },
                  scale: { duration: 0.3, delay: index * 0.02 },
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-full flex flex-col gap-5 border border-[var(--color-divider)] bg-white p-6 shadow-[0_25px_45px_rgba(15,15,40,0.08)] rounded-xl"
              >
              <figure className="h-48 border border-[var(--color-divider)] overflow-hidden flex items-center justify-center bg-[var(--color-panel)] rounded-xl">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ 
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      WebkitUserDrag: 'none',
                      WebkitTouchCallout: 'none'
                    } as React.CSSProperties}
                  />
                ) : (
                  <span className="text-[#1d47ff] text-center text-sm tracking-wide px-4">
                    {project.title}
                  </span>
                )}
              </figure>

              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-[#1c1f2c] tracking-tight">
                  {project.title}
                </h3>
                <p className="text-base text-[#4a4455] leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-[var(--color-divider)] text-[#1d47ff] text-xs tracking-wide bg-[var(--color-chip)] rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                {project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center text-sm tracking-wide uppercase"
                    aria-label={t('portfolio.viewProject', '查看專案')}
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    <span>{t('portfolio.view', '查看')}</span>
                  </a>
                )}
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tertiary w-full justify-center text-sm tracking-wide uppercase"
                    aria-label={t('portfolio.viewCode', '查看程式碼')}
                  >
                    <span className="material-symbols-outlined text-base">code</span>
                    <span>{t('portfolio.github', 'GitHub')}</span>
                  </a>
                )}
              </div>
            </motion.article>
            ))}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  )
}
