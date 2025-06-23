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

  return {
    i18n,
    currentLang,
    setLanguage,
    availableLanguages,
    navMenu,
    sitemap
  }
}
