'use client'

// animations removed
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
      description: t('portfolio.resumecraft.description', '履歷生成器'),
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="h-full flex flex-col gap-5 border border-[var(--color-divider)] bg-white p-6 shadow-[0_25px_45px_rgba(15,15,40,0.08)]"
            >
              <figure className="h-48 border border-[var(--color-divider)] overflow-hidden flex items-center justify-center bg-[var(--color-panel)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
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
                      className="px-3 py-1 border border-[var(--color-divider)] text-[#1d47ff] text-xs tracking-wide bg-[var(--color-chip)]"
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
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
