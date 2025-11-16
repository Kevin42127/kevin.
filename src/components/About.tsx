'use client'

import { motion } from 'framer-motion'
import { Palette, Target, CheckCircle, Users } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { useProtectedImage } from '../hooks/useProtectedImage'

export default function About() {
  const { t } = useTranslationSafe()
  const { imageUrl, isLoading } = useProtectedImage()
  
  const skills = [
    {
      icon: Palette,
      title: t('about.uiDesign.title', 'UI/UX 設計'),
      description: t('about.uiDesign.description', '專注於使用者體驗設計，創造直觀且美觀的介面'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: t('about.productDesign.title', '產品設計'),
      description: t('about.productDesign.description', '專注於需求分析與產品規劃，將想法轉化為可行的數位解決方案'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: t('about.qualityControl.title', '品質控制'),
      description: t('about.qualityControl.description', '透過系統性測試確保產品穩定性，優化使用者體驗'),
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: t('about.aiCollaboration.title', '與AI協作'),
      description: t('about.aiCollaboration.description', '善於運用AI工具提升工作效率，具備良好的AI協作經驗'),
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
  <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 px-4">
{t('about.title', '關於Kevin')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
{t('about.subtitle', '個人簡介')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16 sm:mb-18 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start mb-6 lg:mb-0"
            >
              <div 
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 select-none relative"
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
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
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
                
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                    mixBlendMode: 'overlay'
                  } as React.CSSProperties}
                />
                
                <div 
                  className="absolute bottom-2 right-2 text-white text-xs opacity-50 pointer-events-none"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    fontFamily: 'monospace'
                  } as React.CSSProperties}
                >
                  © Kevin Chen
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed px-4 lg:px-0">
                <p className="text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t('about.content', '您好，我是陳梓敬 (Kevin)，畢業於吳鳳科技大學數位科技與媒體設計系。在設計領域中，我專注於創造以使用者為中心的數位體驗。透過系統性的設計思維，我將複雜的需求轉化為簡潔優雅的解決方案。我相信設計的力量在於解決問題並創造價值。每個專案都是學習與成長的機會，我期待能與您合作，一起打造令人印象深刻的設計作品。') }} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8 sm:mb-10 md:mb-12 px-4">
            {t('about.coreSkills', '核心技能')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="card p-5 sm:p-6"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-3 sm:mb-4`}>
                  <skill.icon className="text-white" size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {skill.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
