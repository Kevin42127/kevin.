'use client'

import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { useProtectedImage } from '../hooks/useProtectedImage'

export default function About() {
  const { t } = useTranslationSafe()
  const { imageUrl, isLoading } = useProtectedImage()
  
  const skills = [
    {
      icon: 'palette',
      title: t('about.uiDesign.title', 'UI/UX 設計'),
      description: t('about.uiDesign.description', '專注於使用者體驗設計，創造直觀且美觀的介面'),
      color: '#ffe3d1'
    },
    {
      icon: 'track_changes',
      title: t('about.productDesign.title', '產品設計'),
      description: t('about.productDesign.description', '專注於需求分析與產品規劃，將想法轉化為可行的數位解決方案'),
      color: '#e8f0ff'
    },
    {
      icon: 'verified',
      title: t('about.qualityControl.title', '品質控制'),
      description: t('about.qualityControl.description', '透過系統性測試確保產品穩定性，優化使用者體驗'),
      color: '#fff1c7'
    },
    {
      icon: 'diversity_3',
      title: t('about.aiCollaboration.title', '與AI協作'),
      description: t('about.aiCollaboration.description', '善於運用AI工具提升工作效率，具備良好的AI協作經驗'),
      color: '#e0fff7'
    }
  ]

  return (
  <section id="about" className="py-16 sm:py-20 bg-[var(--color-section-soft)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1b1d2c] mb-3 sm:mb-4 px-4">
{t('about.title', '關於Kevin')}
          </h2>
          <p className="text-lg sm:text-xl text-[#4a4455] max-w-3xl mx-auto px-4">
{t('about.subtitle', '個人簡介')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16 sm:mb-18 md:mb-20">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
              <div 
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_25px_45px_rgba(0,0,0,0.12)] border-4 border-white select-none relative"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                } as React.CSSProperties}
              >
                {isLoading ? (
                  <div className="w-full h-full bg-[var(--color-placeholder)] animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 bg-white"></div>
                  </div>
                ) : (
                  <img
                    src={imageUrl}
                    alt="Kevin 陳梓敬"
                    className="w-full h-full object-cover pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijk2IiBjeT0iNzIiIHI9IjI0IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNDQgMTQ0QzE0NCAxMjIuMTA5IDEyNi4xMDkgMTA0IDEwNCAxMDRIODhDNjUuOTA5MSAxMDQgNDggMTIyLjEwOSA0OCAxNDRWMjAwSDE0NFYxNDRaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='
                    }}
                    style={{ 
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      WebkitUserDrag: 'none',
                      WebkitTouchCallout: 'none'
                    } as React.CSSProperties}
                  />
                )}
              </div>
            </div>

            <div
              className="lg:col-span-2"
            >
              <div className="space-y-3 sm:space-y-4 text-[#473f4d] leading-relaxed px-4 lg:px-0">
                <p className="text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t('about.content', '您好，我是陳梓敬 (Kevin)，畢業於吳鳳科技大學。我專注於創造以使用者為中心的數位體驗，運用AI協作開發與現代化工具來實現設計概念。我的核心能力包括需求分析、產品設計、使用者體驗優化以及品質控制測試。透過系統性的設計思維和AI輔助開發，我將複雜的需求轉化為高品質的數位產品。') }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1b1d2c] text-center mb-8 sm:mb-10 md:mb-12 px-4">
            {t('about.coreSkills', '核心技能')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className="card about-skill-card p-5 sm:p-6 flex flex-col items-center justify-center text-center aspect-square"
                style={{ backgroundColor: skill.color }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1b1d2c] flex items-center justify-center mb-3 sm:mb-4 rounded-full">
                  <span className="material-symbols-outlined text-white text-2xl">{skill.icon}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-[#1b1d2c] mb-2">
                  {skill.title}
                </h4>
                <p className="text-[#3e3545] text-sm sm:text-base leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
