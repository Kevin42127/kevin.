import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 中文翻譯資源
const zhResources = {
  navigation: {
    home: '首頁',
    about: '關於',
    portfolio: '作品',
    skills: '技能',
    contact: '聯繫',
    kevin: 'Kevin.'
  },
  hero: {
    title: 'Kevin.',
    subtitle: '產品設計師 & 數位創作者',
    description: '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />運用AI協作開發與現代化工具，將設計概念轉化為高品質的數位產品。',
    viewWork: '查看作品',
    getInTouch: '聯繫我',
    downloadCV: '下載履歷'
  },
  about: {
    title: '關於 Kevin',
    subtitle: '個人簡介',
    content: '您好，我是陳梓敬 (Kevin)，畢業於吳鳳科技大學數位科技與媒體設計系。我專注於創造以使用者為中心的數位體驗，運用AI協作開發與現代化工具來實現設計概念。我的核心能力包括需求分析、產品設計、使用者體驗優化以及品質控制測試。透過系統性的設計思維和AI輔助開發，我將複雜的需求轉化為高品質的數位產品。我相信設計的力量在於解決問題並創造價值，每個專案都是學習與成長的機會。',
    coreSkills: '核心技能',
    uiDesign: {
      title: 'UI/UX 設計',
      description: '專注於使用者體驗設計，創造直觀且美觀的介面'
    },
    productDesign: {
      title: '產品設計',
      description: '專注於需求分析與產品規劃，將想法轉化為可行的數位解決方案'
    },
    qualityControl: {
      title: '品質控制',
      description: '透過系統性測試確保產品穩定性，優化使用者體驗'
    },
    aiCollaboration: {
      title: '與AI協作',
      description: '善於運用AI工具提升工作效率，具備良好的AI協作經驗'
    }
  },
  portfolio: {
    title: '我的 作品',
    subtitle: '精選專案',
    viewProject: '查看專案',
    viewCode: '查看程式碼',
    simpleNotes: {
      title: 'Simple Notes',
      description: '簡潔的筆記應用，專注於內容創作。透過AI協作快速建立基礎架構，再進行客製化調整'
    },
    resumecraft: {
      title: 'ResumeCraft',
      description: '專業履歷生成器，幫助求職者快速建立精美履歷。結合AI生成與人工優化，提升開發效率'
    },
    personalWebsite: {
      title: 'Kevin. - 個人網站',
      description: '響應式個人作品集網站，展示設計與開發能力。運用AI輔助開發，快速迭代優化使用者體驗'
    },
    weatherApp: {
      title: '天氣儀表板',
      description: '現代化天氣儀表板，提供即時天氣資訊與優雅的使用者介面。透過AI協作加速開發流程'
    },
    taskblue: {
      title: 'TaskBlue',
      description: '高效的任務管理應用程式，提供簡約現代的任務管理體驗。採用AI輔助開發模式，提升專案效率'
    },
    aiCollaboration: 'AI協作'
  },
  skills: {
    title: '技術 技能',
    subtitle: '專業能力',
    frontend: '前端開發',
    backend: '後端開發',
    design: '設計技能',
    tools: '工具與平台',
    other: '其他技能',
    agileDevelopment: '敏捷開發',
    projectManagement: '專案管理',
    teamCollaboration: '團隊協作',
    problemSolving: '問題解決',
    communication: '溝通表達',
    continuousLearning: '持續學習',
    creativeThinking: '創意思考',
    timeManagement: '時間管理',
    qualityControl: '品質控制'
  },
  contact: {
    title: '聯繫 我',
    subtitle: '讓我們開始對話',
    description: '有專案想法或合作機會？歡迎與我聯繫',
    contactInfo: '歡迎隨時聯繫我，討論專案需求或合作機會。',
    location: '彰化縣, 台灣',
    locationLabel: '位置',
    sendMessage: '發送訊息',
    name: '姓名',
    email: '電子郵件',
    subject: '主題',
    message: '訊息',
    namePlaceholder: '您的姓名',
    emailPlaceholder: 'your@email.com',
    subjectPlaceholder: '訊息主題',
    messagePlaceholder: '請描述您的需求或想法...',
    sending: '發送中...',
    success: '訊息已發送！',
    error: '發送失敗，請稍後再試'
  },
  footer: {
    description: '產品設計師 & 數位創作者，專注於創造以使用者為中心的數位體驗。運用AI協作開發與現代化工具，將設計概念轉化為高品質的數位產品。',
    quickLinks: '快速連結',
    contactInfo: '聯繫資訊',
    location: '彰化縣, 台灣',
    madeWith: 'Made with ❤️ by Kevin',
    copyright: '© 2024 Kevin. All rights reserved.'
  },
  socialMedia: {
    linkedin: 'LinkedIn',
    email: '電子郵件',
    socialMedia: '社群媒體'
  },
  share: {
    share: '分享',
    shareTo: '分享到',
    copyLink: '複製連結',
    copied: '已複製',
    email: 'Email'
  },
  search: {
    search: '搜索',
    openSearch: '打開搜索',
    placeholder: '搜索網站內容...',
    searching: '搜索中...',
    noResults: '沒有找到相關結果',
    tryDifferent: '試試其他關鍵字',
    startTyping: '開始輸入以搜索內容',
    aboutDescription: '了解我的背景、技能和專業經驗',
    portfolioDescription: '查看我的精選專案和作品集',
    skillsDescription: '了解我的技術能力和專業技能',
    contactDescription: '透過各種方式與我聯繫'
  },
}

// 英文翻譯資源
const enResources = {
  navigation: {
    home: 'Home',
    about: 'About',
    portfolio: 'Portfolio',
    skills: 'Skills',
    contact: 'Contact',
    kevin: 'Kevin.'
  },
  hero: {
    title: 'Kevin.',
    subtitle: 'Product Designer & Digital Creator',
    description: 'Graduated from Digital Technology and Media Design Department, focused on creating user-centered digital experiences.<br />Leveraging AI-assisted development and modern tools to transform design concepts into high-quality digital products.',
    viewWork: 'View Work',
    getInTouch: 'Get In Touch',
    downloadCV: 'Download CV'
  },
  about: {
    title: 'About Kevin',
    subtitle: 'Personal Introduction',
    content: 'Hello, I am Chen Zi-Jing (Kevin), graduated from WuFeng University of Technology, Department of Digital Technology and Media Design. I focus on creating user-centered digital experiences, leveraging AI-assisted development and modern tools to bring design concepts to life. My core competencies include requirements analysis, product design, user experience optimization, and quality control testing. Through systematic design thinking and AI-assisted development, I transform complex requirements into high-quality digital products. I believe the power of design lies in solving problems and creating value, and every project is an opportunity to learn and grow.',
    coreSkills: 'Core Skills',
    uiDesign: {
      title: 'UI/UX Design',
      description: 'Focused on user experience design, creating intuitive and beautiful interfaces'
    },
    productDesign: {
      title: 'Product Design',
      description: 'Focused on requirements analysis and product planning, transforming ideas into viable digital solutions'
    },
    qualityControl: {
      title: 'Quality Control',
      description: 'Ensuring product stability through systematic testing and user experience optimization'
    },
    aiCollaboration: {
      title: 'AI Collaboration',
      description: 'Skilled in using AI tools to improve work efficiency with good AI collaboration experience'
    }
  },
  portfolio: {
    title: 'My Portfolio',
    subtitle: 'Featured Projects',
    viewProject: 'View Project',
    viewCode: 'View Code',
    simpleNotes: {
      title: 'Simple Notes',
      description: 'Clean note-taking application focused on content creation. Built with AI collaboration for rapid prototyping and custom optimization'
    },
    resumecraft: {
      title: 'ResumeCraft',
      description: 'Professional resume generator helping job seekers create beautiful resumes quickly. Enhanced development efficiency through AI-assisted coding'
    },
    personalWebsite: {
      title: 'Kevin. - Personal Website',
      description: 'Responsive personal portfolio website showcasing design and development capabilities. Leveraged AI-assisted development for rapid iteration and UX optimization'
    },
    weatherApp: {
      title: 'Weather Dashboard',
      description: 'Modern weather dashboard providing real-time weather information with elegant user interface. Accelerated development through AI collaboration'
    },
    taskblue: {
      title: 'TaskBlue',
      description: 'Efficient task management application providing clean and modern task management experience. Developed using AI-assisted workflow for enhanced productivity'
    },
    aiCollaboration: 'AI Collaboration'
  },
  skills: {
    title: 'Technical Skills',
    subtitle: 'Professional Abilities',
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    design: 'Design Skills',
    tools: 'Tools & Platforms',
    other: 'Other Skills',
    agileDevelopment: 'Agile Development',
    projectManagement: 'Project Management',
    teamCollaboration: 'Team Collaboration',
    problemSolving: 'Problem Solving',
    communication: 'Communication',
    continuousLearning: 'Continuous Learning',
    creativeThinking: 'Creative Thinking',
    timeManagement: 'Time Management',
    qualityControl: 'Quality Control'
  },
  contact: {
    title: 'Contact Me',
    subtitle: 'Let\'s Start a Conversation',
    description: 'Have a project idea or collaboration opportunity? Feel free to contact me',
    contactInfo: 'Feel free to contact me anytime to discuss project requirements or collaboration opportunities.',
    location: 'Changhua County, Taiwan',
    locationLabel: 'Location',
    sendMessage: 'Send Message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    subjectPlaceholder: 'Message subject',
    messagePlaceholder: 'Please describe your needs or ideas...',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message, please try again later'
  },
  footer: {
    description: 'Product Designer & Digital Creator, focused on creating user-centered digital experiences. Leveraging AI-assisted development and modern tools to transform design concepts into high-quality digital products.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    location: 'Changhua County, Taiwan',
    madeWith: 'Made with ❤️ by Kevin',
    copyright: '© 2024 Kevin. All rights reserved.'
  },
  socialMedia: {
    linkedin: 'LinkedIn',
    email: 'Email',
    socialMedia: 'Social Media'
  },
  share: {
    share: 'Share',
    shareTo: 'Share to',
    copyLink: 'Copy Link',
    copied: 'Copied',
    email: 'Email'
  },
  search: {
    search: 'Search',
    openSearch: 'Open Search',
    placeholder: 'Search website content...',
    searching: 'Searching...',
    noResults: 'No results found',
    tryDifferent: 'Try different keywords',
    startTyping: 'Start typing to search content',
    aboutDescription: 'Learn about my background, skills and professional experience',
    portfolioDescription: 'View my featured projects and portfolio',
    skillsDescription: 'Understand my technical abilities and professional skills',
    contactDescription: 'Contact me through various methods'
  },
}

// 確保在客戶端環境中運行
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        zh: { translation: zhResources },
        en: { translation: enResources }
      },
      fallbackLng: 'zh',
      debug: false,
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
      }
    })
} else {
  // 服務端初始化，使用預設語言
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        zh: { translation: zhResources },
        en: { translation: enResources }
      },
      fallbackLng: 'zh',
      lng: 'zh', // 服務端預設使用中文
      debug: false,
      interpolation: {
        escapeValue: false
      }
    })
}

export default i18n
