'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle, Mail } from 'lucide-react'
import { useTranslationSafe } from '@/hooks/useTranslationSafe'

interface ShareButtonProps {
  url?: string
  title?: string
  description?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ShareButton({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Kevin. - 現代化個人網站',
  description = '一個以藍色為品牌色的現代化個人網站，展示專業技能與創意作品。',
  className = '',
  size = 'md'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t } = useTranslationSafe()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const shareData = {
    title,
    text: description,
    url
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('分享被取消或發生錯誤:', error)
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)

    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('複製失敗:', error)
    }
  }

  const shareOptions = [
    {
      id: 'facebook',
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-600',
      onClick: () => handleSocialShare('facebook')
    },
    {
      id: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:bg-sky-500',
      onClick: () => handleSocialShare('twitter')
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-700',
      onClick: () => handleSocialShare('linkedin')
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'hover:bg-green-600',
      onClick: () => handleSocialShare('whatsapp')
    },
    {
      id: 'telegram',
      icon: MessageCircle,
      label: 'Telegram',
      color: 'hover:bg-blue-500',
      onClick: () => handleSocialShare('telegram')
    },
    {
      id: 'email',
      icon: Mail,
      label: t('share.email', 'Email'),
      color: 'hover:bg-gray-600',
      onClick: () => handleSocialShare('email')
    }
  ]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className={`${sizeClasses[size]} bg-kevin-blue/10 dark:bg-gray-700/30 hover:bg-kevin-blue hover:text-white text-kevin-blue dark:text-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 group`}
        aria-label={t('share.share', '分享')}
      >
        <Share2 size={iconSizes[size]} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {t('share.shareTo', '分享到')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {shareOptions.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={option.onClick}
                    className={`flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700 ${option.color} text-white transition-all duration-300 group active:scale-95`}
                  >
                    <option.icon size={20} className="mb-1" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 active:scale-98"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    <span className="text-green-600 font-medium">
                      {t('share.copied', '已複製')}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="font-medium">
                      {t('share.copyLink', '複製連結')}
                    </span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
    </div>
  )
}
