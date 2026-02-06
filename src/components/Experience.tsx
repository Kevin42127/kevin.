'use client'

import { motion } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

const Icon = ({ name, size = '28px', color = '#ff4d2d' }: { name: string; size?: string; color?: string }) => (
  <span className="material-symbols-outlined" style={{ fontSize: size, color, display: 'inline-flex' }}>
    {name}
  </span>
)

export default function Experience() {
  const { t } = useTranslationSafe()

  const languageSkills = [
    {
      language: t('experience.languages.chinese', '中文'),
      level: t('experience.languages.native', '母語')
    },
    {
      language: t('experience.languages.english', '英文'),
      level: t('experience.languages.intermediate', '中級')
    }
  ]

  const certifications = [
    {
      name: 'Adobe Photoshop',
      type: t('experience.certifications.international', '國際認證'),
      certificateUrl: 'https://drive.google.com/file/d/1H5LgXAEOMfGWQ32AyYWeANFXvDo3NvQJ/view?usp=sharing'
    },
    {
      name: 'Adobe Dreamweaver',
      type: t('experience.certifications.international', '國際認證'),
      certificateUrl: 'https://drive.google.com/file/d/1qUq-A3DoemJEUiKPTLbgNusS_danITKY/view?usp=sharing'
    }
  ]

  const activities = [
    {
      type: t('experience.activities.competition', '專題競賽'),
      title: t('experience.activities.competitionTitle', '校園專題競賽'),
      period: t('experience.activities.competitionPeriod', '2023年'),
      achievement: t('experience.activities.thirdPlace', '第三名'),
      description: t('experience.activities.competitionDesc', '參與校園專題競賽，運用設計思維與技術能力獲得第三名佳績'),
      skills: [
        t('experience.skills.projectExecution', '專案執行'),
        t('experience.skills.creativeThinking', '創意思考'),
        t('experience.skills.problemSolving', '問題解決'),
        t('experience.skills.technicalApplication', '技術應用')
      ]
    },
    {
      type: t('experience.activities.organization', '組織經驗'),
      title: t('experience.activities.studentCouncil', '學生會資訊職務'),
      period: t('experience.activities.councilPeriod', '2022年-2025年'),
      achievement: t('experience.activities.completed', '已完成'),
      description: t('experience.activities.councilDesc', '負責學生會文書處理與活動規劃，展現組織協調與專案管理能力'),
      responsibilities: [
        t('experience.responsibilities.meetingRecords', '會議紀錄整理與文書處理'),
        t('experience.responsibilities.fairPlanning', '園遊會攤位規劃與活動執行'),
        t('experience.responsibilities.concertSupport', '校園演唱會籌備與現場支援')
      ],
      skills: [
        t('experience.skills.documentProcessing', '文書處理'),
        t('experience.skills.eventPlanning', '活動規劃'),
        t('experience.skills.teamCollaboration', '團隊協作'),
        t('experience.skills.projectManagement', '專案管理'),
        t('experience.skills.onSiteExecution', '現場執行')
      ]
    }
  ]

  return (
  <section id="experience" className="py-16 sm:py-20 bg-[var(--color-page)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface">
        <motion.div
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[rgb(var(--foreground-rgb))] mb-3 sm:mb-4 px-4">
            {t('experience.title', '相關經驗')}
          </h2>
          <p className="text-lg sm:text-xl text-[rgb(var(--foreground-rgb))] max-w-3xl mx-auto px-4">
            {t('experience.subtitle', '語言能力、證照認證與實務經驗展示')}
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.div transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon name="language" color="#ff4d2d" />
              <h3 className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">
                {t('experience.languageSkills', '語言能力')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {languageSkills.map((skill) => (
                <motion.article
                  key={skill.language}
                  transition={{ duration: 0.6 }}
                  className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-6 flex flex-col gap-2 shadow-[0_25px_45px_rgba(15,15,40,0.08)] rounded-xl"
                >
                  <span className="text-xs text-[var(--color-text-muted)] tracking-[0.35em] uppercase">
                    {t('experience.languageLabel', '語言')}
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold text-[rgb(var(--foreground-rgb))]">{skill.language}</p>
                    <span className="text-[#ff4d2d] font-semibold">{skill.level}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon name="workspace_premium" color="#1d47ff" />
              <h3 className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">
                {t('experience.certifications.title', '證照與認證')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {certifications.map((cert) => (
                <motion.article
                  key={cert.name}
                  transition={{ duration: 0.6 }}
                  className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-6 flex flex-col gap-4 shadow-[0_25px_45px_rgba(15,15,40,0.08)] rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] tracking-[0.3em] uppercase mb-1">
                        {cert.type}
                      </p>
                      <h4 className="text-2xl font-semibold text-[rgb(var(--foreground-rgb))]">
                        {cert.name}
                      </h4>
                    </div>
                    {cert.certificateUrl && (
                      <button
                        type="button"
                        onClick={() => window.open(cert.certificateUrl!, '_blank', 'noopener,noreferrer')}
                        className="inline-flex items-center gap-2 px-5 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white min-w-[140px] justify-center rounded-[24px] bg-transparent cursor-pointer"
                      >
                        <span>{t('experience.certifications.viewCertificate', '查看')}</span>
                        <span className="material-symbols-outlined text-base text-inherit transition-colors duration-200">
                          open_in_new
                        </span>
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon name="flag" color="#00a19a" />
              <h3 className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">
                {t('experience.activities.title', '課外活動')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {activities.map((activity) => (
                <motion.article
                  key={activity.title}
                  transition={{ duration: 0.6 }}
                  className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-6 flex flex-col gap-5 h-full shadow-[0_25px_45px_rgba(15,15,40,0.08)] rounded-xl"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
                      <span className="tracking-[0.3em] uppercase">{activity.type}</span>
                      <div className="flex items-center gap-1">
                        <Icon name="event" size="18px" color="#1d47ff" />
                        <span>{activity.period}</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-semibold text-[rgb(var(--foreground-rgb))]">{activity.title}</h4>
                    <p className="text-[rgb(var(--foreground-rgb))]">{activity.description}</p>
                    <span className="text-[#f97316] font-semibold uppercase tracking-wide">{activity.achievement}</span>
                  </div>

                  {activity.responsibilities && (
                    <div className="space-y-2">
                      <h5 className="text-lg font-semibold text-[var(--color-secondary)]">
                        {t('experience.responsibilities.title', '主要職責')}
                      </h5>
                      <ul className="grid grid-cols-1 gap-2">
                        {activity.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start text-[rgb(var(--foreground-rgb))] gap-3">
                            <span className="w-1.5 h-1.5 bg-[#ff4d2d] mt-2"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h5 className="text-lg font-semibold text-[rgb(var(--foreground-rgb))]">
                      {t('experience.skills.title', '相關技能')}
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {activity.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 border border-[var(--color-divider)] text-white text-sm tracking-wide bg-[var(--color-chip)] rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
