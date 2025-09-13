import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 確保在客戶端環境中運行
if (typeof window !== 'undefined') {

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
    subtitle: '設計師 & 開發者',
    description: '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />結合設計美感與技術實作能力，將設計概念轉化為互動式的網頁應用。',
    viewWork: '查看作品',
    getInTouch: '聯繫我',
    downloadCV: '下載履歷'
  },
  about: {
    title: '關於 Kevin',
    subtitle: '個人簡介',
    content: '您好，我是陳梓敬 (Kevin)，畢業於吳鳳科技大學數位科技與媒體設計系。在設計領域中，我專注於創造以使用者為中心的數位體驗。透過系統性的設計思維，我將複雜的需求轉化為簡潔優雅的解決方案。我相信設計的力量在於解決問題並創造價值。每個專案都是學習與成長的機會，我期待能與您合作，一起打造令人印象深刻的設計作品。',
    coreSkills: '核心技能',
    uiDesign: {
      title: 'UI/UX 設計',
      description: '專注於使用者體驗設計，創造直觀且美觀的介面'
    },
    frontendDev: {
      title: '前端開發',
      description: '使用現代化技術建構響應式網頁應用'
    },
    prototyping: {
      title: '原型設計',
      description: '快速驗證設計概念，確保產品方向正確'
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
      description: '簡潔的筆記應用，專注於內容創作'
    },
    resumecraft: {
      title: 'ResumeCraft',
      description: '專業履歷生成器，幫助求職者快速建立精美履歷'
    },
    personalWebsite: {
      title: 'Kevin. - 個人網站',
      description: '響應式個人作品集網站，展示設計與開發能力'
    }
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
    description: '設計師 & 開發者，專注於創造以使用者為中心的數位體驗。結合設計美感與技術實作，將想法轉化為現實。',
    quickLinks: '快速連結',
    contactInfo: '聯繫資訊',
    location: '彰化縣, 台灣',
    madeWith: 'Made with ❤️ by Kevin',
    copyright: '© 2024 Kevin. All rights reserved.'
  }
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
    subtitle: 'Designer & Developer',
    description: 'Graduated from Digital Technology and Media Design Department, focused on creating user-centered digital experiences.<br />Combining design aesthetics with technical implementation to transform design concepts into interactive web applications.',
    viewWork: 'View Work',
    getInTouch: 'Get In Touch',
    downloadCV: 'Download CV'
  },
  about: {
    title: 'About Kevin',
    subtitle: 'Personal Introduction',
    content: 'Hello, I am Chen Zi-Jing (Kevin), graduated from WuFeng University of Technology, Department of Digital Technology and Media Design. In the field of design, I focus on creating user-centered digital experiences. Through systematic design thinking, I transform complex requirements into simple and elegant solutions. I believe the power of design lies in solving problems and creating value. Every project is an opportunity to learn and grow, and I look forward to working with you to create impressive design works.',
    coreSkills: 'Core Skills',
    uiDesign: {
      title: 'UI/UX Design',
      description: 'Focused on user experience design, creating intuitive and beautiful interfaces'
    },
    frontendDev: {
      title: 'Frontend Development',
      description: 'Building responsive web applications using modern technologies'
    },
    prototyping: {
      title: 'Prototyping',
      description: 'Rapidly validating design concepts to ensure correct product direction'
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
      description: 'Clean note-taking application focused on content creation'
    },
    resumecraft: {
      title: 'ResumeCraft',
      description: 'Professional resume generator helping job seekers create beautiful resumes quickly'
    },
    personalWebsite: {
      title: 'Kevin. - Personal Website',
      description: 'Responsive personal portfolio website showcasing design and development capabilities'
    }
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
    description: 'Designer & Developer, focused on creating user-centered digital experiences. Combining design aesthetics with technical implementation to turn ideas into reality.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    location: 'Changhua County, Taiwan',
    madeWith: 'Made with ❤️ by Kevin',
    copyright: '© 2024 Kevin. All rights reserved.'
  }
}

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
}

export default i18n
