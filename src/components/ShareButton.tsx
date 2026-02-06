'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
      icon: 'groups',
      label: 'Facebook',
      color: 'hover:bg-[#385898]',
      onClick: () => handleSocialShare('facebook')
    },
    {
      id: 'twitter',
      icon: 'flutter_dash',
      label: 'Twitter',
      color: 'hover:bg-[#1d9bf0]',
      onClick: () => handleSocialShare('twitter')
    },
    {
      id: 'linkedin',
      icon: 'hub',
      label: 'LinkedIn',
      color: 'hover:bg-[#0a66c2]',
      onClick: () => handleSocialShare('linkedin')
    },
    {
      id: 'whatsapp',
      icon: 'chat',
      label: 'WhatsApp',
      color: 'hover:bg-[#25d366]',
      onClick: () => handleSocialShare('whatsapp')
    },
    {
      id: 'telegram',
      icon: 'send',
      label: 'Telegram',
      color: 'hover:bg-[#2aabee]',
      onClick: () => handleSocialShare('telegram')
    },
    {
      id: 'email',
      icon: 'mail',
      label: t('share.email', 'Email'),
      color: 'hover:bg-[#4a5568]',
      onClick: () => handleSocialShare('email')
    }
  ]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className={`${sizeClasses[size]} border border-[var(--color-divider)] bg-[var(--color-surface)] text-[rgb(var(--foreground-rgb))] hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-all duration-300`}
        aria-label={t('share.share', '分享')}
      >
        <span className="material-symbols-outlined text-base text-inherit">share</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[var(--color-surface)] rounded-xl shadow-[0_25px_45px_rgba(15,15,40,0.12)] border border-[var(--color-divider)] p-4 z-50 min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[rgb(var(--foreground-rgb))]">
                  {t('share.shareTo', '分享到')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-[rgb(var(--foreground-rgb))] transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-inherit">close</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {shareOptions.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={option.onClick}
                    className={`flex flex-col items-center p-3 border border-[var(--color-divider)] bg-[var(--color-surface-variant)] text-[rgb(var(--foreground-rgb))] transition-all duration-300 group active:scale-95 ${option.color}`}
                  >
                    <span className="material-symbols-outlined text-base mb-1 text-inherit">
                      {option.icon}
                    </span>
                    <span className="text-xs font-medium">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-divider)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-variant)] text-[rgb(var(--foreground-rgb))] transition-all duration-300 active:scale-95"
              >
                {copied ? (
                  <>
                    <span className="material-symbols-outlined text-base text-[var(--color-accent)]">task_alt</span>
                    <span className="text-[var(--color-accent)] font-medium">
                      {t('share.copied', '已複製')}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base text-inherit">content_copy</span>
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
