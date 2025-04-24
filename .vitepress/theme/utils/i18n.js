import { computed } from 'vue'
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

export function useI18n() {
  const { theme } = useData()

  const currentLang = computed(() => theme.value.siteMeta?.lang || 'en-US')

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

  return {
    i18n,
    currentLang
  }
}
