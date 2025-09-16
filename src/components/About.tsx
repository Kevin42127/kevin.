'use client'

import { motion } from 'framer-motion'
import { Palette, Target, CheckCircle, Users } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function About() {
  const { t } = useTranslationSafe()
  
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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
{t('about.title', '關於 Kevin').split(' ')[0]} <span className="text-kevin-blue dark:text-blue-400">{t('about.title', '關於 Kevin').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
{t('about.subtitle', '個人簡介')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8 items-center"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                <img
                  src="/profile.jpg"
                  alt="Kevin 陳梓敬"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijk2IiBjeT0iNzIiIHI9IjI0IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNDQgMTQ0QzE0NCAxMjIuMTA5IDEyNi4xMDkgMTA0IDEwNCAxMDRIODhDNjUuOTA5MSAxMDQgNDggMTIyLjEwOSA0OCAxNDRWMjAwSDE0NFYxNDRaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='
                  }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {t('about.subtitle', '個人簡介')}
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t('about.content', '您好，我是陳梓敬 (Kevin)，畢業於吳鳳科技大學數位科技與媒體設計系。在設計領域中，我專注於創造以使用者為中心的數位體驗。透過系統性的設計思維，我將複雜的需求轉化為簡潔優雅的解決方案。我相信設計的力量在於解決問題並創造價值。每個專案都是學習與成長的機會，我期待能與您合作，一起打造令人印象深刻的設計作品。') }} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-12">
            {t('about.coreSkills', '核心技能')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4`}>
                  <skill.icon className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {skill.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
