'use client'

import { useTranslationSafe } from '../../hooks/useTranslationSafe'

export default function TestI18n() {
  const { t } = useTranslationSafe()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">i18n 測試頁面</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">導覽列測試</h2>
          <p>首頁: {t('navigation.home', '首頁')}</p>
          <p>關於: {t('navigation.about', '關於')}</p>
          <p>作品: {t('navigation.portfolio', '作品')}</p>
          <p>技能: {t('navigation.skills', '技能')}</p>
          <p>聯繫: {t('navigation.contact', '聯繫')}</p>
          
          <h2 className="text-xl font-semibold mt-6">Hero 測試</h2>
          <p>標題: {t('hero.title', 'Kevin.')}</p>
          <p>副標題: {t('hero.subtitle', '設計師 & 開發者')}</p>
          
          <h2 className="text-xl font-semibold mt-6">About 測試</h2>
          <p>標題: {t('about.title', '關於 Kevin')}</p>
          <p>副標題: {t('about.subtitle', '個人簡介')}</p>
          
          <h2 className="text-xl font-semibold mt-6">Contact 測試</h2>
          <p>標題: {t('contact.title', '聯繫 我')}</p>
          <p>姓名: {t('contact.name', '姓名')}</p>
          <p>電子郵件: {t('contact.email', '電子郵件')}</p>
          
          <h2 className="text-xl font-semibold mt-6">Footer 測試</h2>
          <p>快速連結: {t('footer.quickLinks', '快速連結')}</p>
          <p>聯繫資訊: {t('footer.contactInfo', '聯繫資訊')}</p>
        </div>
      </div>
    </div>
  )
}
