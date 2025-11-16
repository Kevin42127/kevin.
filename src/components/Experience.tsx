'use client'

import { motion } from 'framer-motion'
import { Award, Users, Globe, FileText, Trophy, Calendar, ExternalLink } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

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
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 px-4">
            {t('experience.title', '相關經驗')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {t('experience.subtitle', '語言能力、證照認證與實務經驗展示')}
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Language Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
              <Globe className="text-kevin-blue dark:text-gray-200 mr-3" size={32} />
              {t('experience.languageSkills', '語言能力')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {languageSkills.map((skill, index) => (
                <motion.div
                  key={skill.language}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                        <Globe className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {skill.language}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {skill.level}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
              <FileText className="text-kevin-blue dark:text-gray-200 mr-3" size={32} />
              {t('experience.certifications.title', '證照與認證')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mr-4">
                        <FileText className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {cert.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {cert.type}
                        </p>
                      </div>
                    </div>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-kevin-blue/10 dark:bg-gray-700/30 text-kevin-blue dark:text-gray-200 rounded-lg hover:bg-kevin-blue/20 dark:hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <span className="text-sm font-medium">{t('experience.certifications.viewCertificate', '查看證書')}</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
              <Award className="text-kevin-blue dark:text-gray-200 mr-3" size={32} />
              {t('experience.activities.title', '課外活動')}
            </h3>
            <div className="space-y-8">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-6">
                        {activity.type === t('experience.activities.competition', '專題競賽') ? (
                          <Trophy className="text-white" size={28} />
                        ) : (
                          <Users className="text-white" size={28} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="px-3 py-1 bg-kevin-blue/10 dark:bg-gray-700/30 text-kevin-blue dark:text-gray-200 text-sm rounded-full mr-3">
                            {activity.type}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                            <Calendar className="mr-1" size={16} />
                            {activity.period}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {activity.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                        {activity.achievement}
                      </span>
                    </div>
                  </div>

                  {activity.responsibilities && (
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        {t('experience.responsibilities.title', '主要職責')}
                      </h5>
                      <ul className="space-y-2">
                        {activity.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                            <span className="w-2 h-2 bg-kevin-blue dark:bg-gray-200 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      {t('experience.skills.title', '相關技能')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-kevin-blue/10 dark:bg-gray-700/30 text-kevin-blue dark:text-gray-200 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
