'use client'

// animations removed
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Portfolio() {
  const { t } = useTranslationSafe()

  const projects = [
    {
      id: 1,
      title: t('portfolio.lineBot.title', 'LINE BOT'),
      description: t('portfolio.lineBot.description', '運用 TypeScript 與 Express 打造的 LINE 聊天機器人，整合 AI 協作功能'),
      image: '/LINE BOT.png',
      technologies: ['TypeScript', 'Express', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://lin.ee/ivLUnsp',
      featured: true
    },
    {
      id: 2,
      title: t('portfolio.chefAI.title', 'ChefAI'),
      description: t('portfolio.chefAI.description', '運用 Vue 與 Vite 打造 AI 食譜生成平台'),
      image: '/ChefAI.png',
      technologies: ['Vue', 'Vite', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chefaiofficial.vercel.app/',
      featured: true
    },
    {
      id: 3,
      title: t('portfolio.aiTeacher.title', 'AI老師'),
      description: t('portfolio.aiTeacher.description', '運用 Vue 與 Vite 打造的 AI 協作專案'),
      image: '/AI老師.png',
      technologies: ['Vue', 'Vite', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://homeaiofficial.vercel.app/',
      featured: true
    },
    {
      id: 4,
      title: t('portfolio.sumVid.title', 'SumVid'),
      description: t('portfolio.sumVid.description', '讓 AI 為您快速提取影片重點'),
      image: '/SumVid.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/sumvid/dmcnnoefjaebkagfhpjnofbcmldnfedp',
      featured: true
    },
    {
      id: 5,
      title: t('portfolio.discordAIBot.title', 'Discord AI Bot'),
      description: t('portfolio.discordAIBot.description', '運用 Python 打造的 Discord AI 聊天機器人，提供智能對話服務'),
      image: '/DISCORD.png',
      technologies: ['Python', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://discord.com/oauth2/authorize?client_id=1447853825057619981&permissions=2147601408&integration_type=0&scope=bot+applications.commands',
      featured: true
    },
    {
      id: 6,
      title: t('portfolio.acadAI.title', 'AcadAI'),
      description: t('portfolio.acadAI.description', 'AI 自動幫你整理商品重點'),
      image: '/AcadAI.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/acadai/accefaglmgngpkinapofhodbkpafmjok',
      featured: true
    },
    {
      id: 7,
      title: t('portfolio.taiwanWeatherAI.title', '臺灣氣象AI助手'),
      description: t('portfolio.taiwanWeatherAI.description', '查詢天氣與 AI 問答'),
      image: '/臺灣氣象AI助手.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://chromewebstore.google.com/detail/%E8%87%BA%E7%81%A3%E6%B0%A3%E8%B1%A1ai%E5%8A%A9%E6%89%8B/oiefmbmfndlpejflldfknalgpljnbced',
      featured: true
    },
    {
      id: 8,
      title: t('portfolio.djkridp.title', 'DJKridP'),
      description: t('portfolio.djkridp.description', '運用 HTML、CSS 與 Express 為德國知名 DJ 打造的個人品牌官網，整合其國際演出經歷與社群連結，展現現代化的視覺風格（已獲本人認證）。'),
      image: '/DJKridP.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Express', t('portfolio.aiCollaboration', 'AI協作')],
      github: '#',
      demo: 'https://djkridp.vercel.app/',
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
              className="h-full flex flex-col gap-5 border border-[var(--color-divider)] bg-white p-6 shadow-[0_25px_45px_rgba(15,15,40,0.08)] rounded-xl"
            >
              <figure className="h-48 border border-[var(--color-divider)] overflow-hidden flex items-center justify-center bg-[var(--color-panel)] rounded-xl">
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
                {project.id !== 4 && project.id !== 5 && project.id !== 6 && project.id !== 7 && (
                  <p className="text-xs text-[#6b6371] mt-2 text-center">
                    {t('portfolio.note', '備註：如果網頁打開是空白畫面，請按 Ctrl + F5 重新整理')}
                  </p>
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
