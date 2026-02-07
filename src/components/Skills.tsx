'use client'

import { motion } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Skills() {
  const { t } = useTranslationSafe()

  const skillCategories = [
    {
      title: t('skills.frontend', '前端開發'),
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 }
      ]
    },
    {
      title: t('skills.design', '設計技能'),
      skills: [
        { name: 'UI/UX Design', level: 80 },
        { name: 'Responsive Design', level: 90 },
        { name: 'Prototyping', level: 75 },
        { name: 'Figma', level: 75 },
        { name: 'Design Systems', level: 70 },
        { name: 'User Research', level: 60 }
      ]
    },
    {
      title: t('skills.tools', '工具與平台'),
      skills: [
        { name: 'GitHub', level: 85 },
        { name: 'Vercel', level: 80 },
        { name: 'VS Code', level: 90 },
        { name: 'Node.js', level: 75 },
        { name: 'Express', level: 70 },
        { name: 'REST API', level: 80 }
      ]
    },
    {
      title: t('skills.other', '軟技能'),
      skills: [
        { name: t('skills.teamCollaboration', '團隊協作'), level: 85 },
        { name: t('skills.problemSolving', '問題解決'), level: 90 },
        { name: t('skills.communication', '溝通表達'), level: 80 },
        { name: t('skills.continuousLearning', '持續學習'), level: 95 },
        { name: t('skills.creativeThinking', '創意思考'), level: 85 },
        { name: t('skills.timeManagement', '時間管理'), level: 80 }
      ]
    }
  ]

  return (
    <section id="skills" className="py-16 sm:py-20 bg-[var(--color-section-alt)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface">
        <motion.div
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[rgb(var(--foreground-rgb))] mb-3 sm:mb-4 px-4">
{t('skills.title', '技術技能')}
          </h2>
          <p className="text-lg sm:text-xl text-[rgb(var(--foreground-rgb))] max-w-3xl mx-auto px-4">
{t('skills.subtitle', '持續學習新技術，保持技能的與時俱進')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.title}
              transition={{ duration: 0.8 }}
              className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-6 flex flex-col gap-4 shadow-[0_20px_45px_rgba(15,15,40,0.08)]"
            >
              <h3 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))] tracking-tight">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[rgb(var(--foreground-rgb))] font-medium">{skill.name}</span>
                      <span className="text-[var(--color-primary)] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[var(--color-surface-variant)] border border-[var(--color-divider)] h-2.5 relative overflow-hidden rounded-full">
                      <div
                        className="bg-[var(--color-primary)] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        </div>
      </div>
    </section>
  )
}
