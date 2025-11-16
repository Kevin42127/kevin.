'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Portfolio() {
  const { t } = useTranslationSafe()
  
  const projects = [
    {
      id: 1,
      title: t('portfolio.simpleNotes.title', 'AuthPrototype'),
      description: t('portfolio.simpleNotes.description', '我的第一個完整前端專案，學習 Angular/Tailwindcss 基礎，建立登入/註冊的原型設計'),
      image: '/simple-notes.jpg',
      technologies: ['Angular', 'Tailwind CSS', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://authprototype.vercel.app/',
      featured: true
    },
    {
      id: 2,
      title: t('portfolio.weatherApp.title', '天氣儀表板'),
      description: t('portfolio.weatherApp.description', '學習 API 整合的專案，掌握外部數據獲取和現代化 UI 設計'),
      image: '/weather-app.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Open-Meteo API', t('portfolio.aiCollaboration', 'AI協作'), t('portfolio.apiLearning', 'API 學習')],
      github: '#',
      demo: 'https://weather-eight-black.vercel.app/',
      featured: true
    },
    {
      id: 3,
      title: t('portfolio.taskblue.title', 'TaskBlue'),
      description: t('portfolio.taskblue.description', 'React 狀態管理練習專案，學習複雜組件間的數據流管理'),
      image: '/taskblue.jpg',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', t('portfolio.aiCollaboration', 'AI協作'), t('portfolio.stateManagementPractice', '狀態管理練習')],
      github: '#',
      demo: 'https://taskblue.vercel.app/',
      featured: true
    },
    {
      id: 4,
      title: t('portfolio.resumecraft.title'),
      description: t('portfolio.resumecraft.description'),
      image: '/resumecraft.jpg',
      technologies: ['Angular', 'TypeScript', 'Webpack', 'PWA', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://dozle.vercel.app/',
      featured: true
    },
    {
      id: 5,
      title: t('portfolio.tinylink.title', 'TinyLink'),
      description: t('portfolio.tinylink.description', '後端概念學習專案，理解數據庫設計、API 開發和部署流程'),
      image: '/tinylink.jpg',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', t('portfolio.aiCollaboration', 'AI協作'), t('portfolio.backendConceptsLearning', '後端概念學習')],
      github: '#',
      demo: 'https://tinylink-seven.vercel.app/',
      featured: true
    },
    {
      id: 6,
      title: t('portfolio.personalWebsite.title', 'Kevin. - 個人網站'),
      description: t('portfolio.personalWebsite.description', '綜合技能展示專案，整合所學技術打造個人品牌網站'),
      image: '/personal-website.jpg',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', t('portfolio.aiCollaboration', 'AI協作'), t('portfolio.comprehensiveShowcase', '綜合展示')],
      github: '#',
      demo: 'https://kevinoffical.vercel.app/',
      featured: true
    }
    ,
    {
      id: 7,
      title: t('portfolio.devkit.title', 'DevKit - 開發者工具大全'),
      description: t('portfolio.devkit.description', '精選 100+ 開發者工具的一站式網站，分類清晰、快速存取常用工具'),
      image: '/DevKit.png?v=20251116',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://devkitofficial.vercel.app/',
      featured: true
    },
    {
      id: 8,
      title: t('portfolio.virid.title', 'Virid - CSS 網格佈局'),
      description: t('portfolio.virid.description', '以 CSS Grid 佈局實作的單頁網站，使用純 HTML/CSS/JavaScript，強調版面編排與層次表現'),
      image: '/Virid.png?v=20251116',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: '#',
      demo: 'https://virid-seven.vercel.app/',
      featured: true
    },
    {
      id: 9,
      title: t('portfolio.aiToolLaboratory.title', 'AI ToolLaboratory - AI 工具集合'),
      description: t('portfolio.aiToolLaboratory.description', '蒐集實用 AI 工具與連結的索引站，支援分類瀏覽與快速導引'),
      image: '/ToolLaboratory.png?v=20251116',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://toollaboratory.vercel.app/',
      featured: true
    }
  ]

  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const firstCard = el.querySelector<HTMLElement>('.card')
    const cardWidth = firstCard?.offsetWidth || el.clientWidth
    const gap = 24 // gap-6
    const delta = (cardWidth + gap) * (direction === 'left' ? -1 : 1)
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scrollByCards('right')
      if (e.key === 'ArrowLeft') scrollByCards('left')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 px-4">
{t('portfolio.title', '我的作品')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
{t('portfolio.subtitle', '精選專案展示，展現技術實力和創意思維')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => scrollByCards('left')}
              aria-label="上一個"
              className="hidden md:inline-flex w-10 h-10 rounded-full bg-white hover:bg-kevin-blue hover:text-white shadow items-center justify-center border border-gray-200 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            </button>
            <button
              onClick={() => scrollByCards('right')}
              aria-label="下一個"
              className="hidden md:inline-flex w-10 h-10 rounded-full bg-white hover:bg-kevin-blue hover:text-white shadow items-center justify-center border border-gray-200 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {projects.map((project) => (
              <div key={project.id} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="card group h-[460px] flex flex-col"
                >
                  <div className="relative w-full overflow-hidden rounded-t-2xl">
                    <div className="relative w-full aspect-[16/9]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUU0MEFGIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nrqHnkIblk6E8L3RleHQ+Cjwvc3ZnPgo='
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-300"
                      >
                        <Github className="text-white" size={20} />
                      </a>
                    )}
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-300"
                      >
                        <ExternalLink className="text-white" size={20} />
                      </a>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-kevin-blue/10 dark:bg-gray-700/30 text-kevin-blue dark:text-gray-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
