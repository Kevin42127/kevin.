'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
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
      title: t('portfolio.resumecraft.title', 'ResumeCraft'),
      description: t('portfolio.resumecraft.description', '複雜表單處理學習專案，掌握表單驗證、數據處理和 PDF 生成技術'),
      image: '/resumecraft.jpg',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'react-hook-form', 'Puppeteer', t('portfolio.aiCollaboration', 'AI協作'), t('portfolio.formHandlingLearning', '表單處理學習')],
      github: '#',
      demo: 'https://resumecraaft-beta.netlify.app/',
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
      demo: 'https://kevin-tau.vercel.app/',
      featured: true
    }
  ]

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
{t('portfolio.title', '我的 作品').split(' ')[0]} <span className="text-kevin-blue dark:text-blue-400">{t('portfolio.title', '我的 作品').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
{t('portfolio.subtitle', '精選專案展示，展現技術實力和創意思維')}
          </p>
        </motion.div>

        {/* All Projects */}
        <div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUU0MEFGIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nrqHnkIblk6E8L3RleHQ+Cjwvc3ZnPgo='
                    }}
                  />
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
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-kevin-blue/10 dark:bg-blue-900/30 text-kevin-blue dark:text-blue-400 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
