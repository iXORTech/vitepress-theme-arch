import { computed, ref } from 'vue'
import { useData } from 'vitepress'

// Import language files
import enUsYaml from '../locales/en-US.yaml'
import zhCnYaml from '../locales/zh-CN.yaml'

const translations = {
  'en': enUsYaml,
  'en-US': enUsYaml,
  'zh': zhCnYaml,
  'zh-CN': zhCnYaml
}

// Create a reactive language reference that can be updated
const userSelectedLang = ref(null)

export function useI18n() {
  const { theme } = useData()

  // Use user selected language if available, otherwise fall back to theme config
  const currentLang = computed(() => 
    userSelectedLang.value || theme.value.siteMeta?.lang || 'en-US'
  )

  // Function to change language
  const setLanguage = (lang) => {
    if (translations[lang]) {
      userSelectedLang.value = lang
      // Optionally save to localStorage for persistence
      localStorage.setItem('preferred-language', lang)
    } else {
      console.warn(`Language ${lang} is not supported`)
    }
  }

  // Initialize from localStorage if available
  if (!userSelectedLang.value && typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang && translations[savedLang]) {
      userSelectedLang.value = savedLang
    }
  }

  const i18n = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    if (!value) {
      console.warn(`No translations found for language: ${currentLang.value}`)
      value = translations['en'] // Fallback to English
    }

    for (const k of keys) {
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = value[k]
    }

    return value
  }

  // Get available languages
  const availableLanguages = computed(() => {
    return [
      { code: 'en-US', name: 'English' },
      { code: 'zh-CN', name: '中文' }
    ]
  })

  // Get the navigation menu for the current language
  const navMenu = computed(() => {
    const lang = currentLang.value
    // Check if we have a localized navigation for the current language
    if (theme.value.navLocales && theme.value.navLocales[lang]) {
      return theme.value.navLocales[lang]
    }
    // Fallback to the default nav if no localized version exists
    return theme.value.nav || []
  })

  // Get the navMore menu for the current language
  const navMore = computed(() => {
    const lang = currentLang.value
    // Check if we have a localized navMore for the current language
    if (theme.value.navMoreLocales && theme.value.navMoreLocales[lang]) {
      return theme.value.navMoreLocales[lang]
    }
    // Fallback to the default navMore if no localized version exists
    return theme.value.navMore || []
  })

  // Get the sitemap for the current language
  const sitemap = computed(() => {
    const lang = currentLang.value
    // Check if we have a localized sitemap for the current language
    if (theme.value.footer?.sitemapLocales && theme.value.footer.sitemapLocales[lang]) {
      return theme.value.footer.sitemapLocales[lang]
    }
    // Fallback to the default sitemap if no localized version exists
    return theme.value.footer?.sitemap || []
  })

  // Get localized title for the current language if available
  const getLocalizedTitle = (frontmatter) => {
    if (!frontmatter) return null

    if (frontmatter.localizedTitle && frontmatter.localizedTitle[currentLang.value]) {
      return frontmatter.localizedTitle[currentLang.value]
    }
    return frontmatter.title
  }

  // Get localized description for the current language if available
  const getLocalizedDescription = (frontmatter) => {
    if (!frontmatter) return null

    if (frontmatter.localizedDescription && frontmatter.localizedDescription[currentLang.value]) {
      return frontmatter.localizedDescription[currentLang.value]
    }
    return frontmatter.description
  }

  // Get localized site title for the current language
  const getLocalizedSiteTitle = () => {
    if (theme.value.siteMeta?.localizedTitle &&
        theme.value.siteMeta.localizedTitle[currentLang.value]) {
      return theme.value.siteMeta.localizedTitle[currentLang.value]
    }
    return theme.value.siteMeta?.title
  }

  // Get localized site description for the current language
  const getLocalizedSiteDescription = () => {
    if (theme.value.siteMeta?.localizedDescription &&
        theme.value.siteMeta.localizedDescription[currentLang.value]) {
      return theme.value.siteMeta.localizedDescription[currentLang.value]
    }
    return theme.value.siteMeta?.description
  }

  // Get localized welcome message for the current language
  const getLocalizedWelcomeMessage = () => {
    if (theme.value.siteMeta?.localizedWelcomeMessage &&
        theme.value.siteMeta.localizedWelcomeMessage[currentLang.value]) {
      return theme.value.siteMeta.localizedWelcomeMessage[currentLang.value]
    }

    if (theme.value.siteMeta?.welcomeMessage) {
      return theme.value.siteMeta.welcomeMessage
    }

    // If no welcome message is set, return null and let component handle default
    return null
  }

  return {
    i18n,
    currentLang,
    setLanguage,
    availableLanguages,
    navMenu,
    navMore,
    sitemap,
    getLocalizedTitle,
    getLocalizedDescription,
    getLocalizedSiteTitle,
    getLocalizedSiteDescription,
    getLocalizedWelcomeMessage
  }
}
