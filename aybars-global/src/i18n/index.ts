// Main i18n index - Translation loader and utilities
import { en, type Translations } from './translations/en'
import { tr } from './translations/tr'
import { ar } from './translations/ar'
import { fa } from './translations/fa'
import { ru } from './translations/ru'
import { type Language, defaultLang, languages, isRTL } from './config'

// All translations object
export const translations: Record<Language, Translations> = {
  en,
  tr,
  ar,
  fa,
  ru,
}

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations[defaultLang]
}

/**
 * Get a specific translation key with dot notation support
 * e.g., t('nav.home', 'en') => 'Home'
 */
export function t(key: string, lang: Language = defaultLang): string {
  const keys = key.split('.')
  let value: unknown = translations[lang] || translations[defaultLang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      // Fallback to default language
      value = translations[defaultLang]
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey]
        } else {
          return key // Return key if translation not found
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}

/**
 * Create a translation function bound to a specific language
 */
export function useTranslations(lang: Language) {
  const currentTranslations = getTranslations(lang)
  
  return {
    t: (key: string) => t(key, lang),
    translations: currentTranslations,
    lang,
    isRTL: isRTL(lang),
    dir: isRTL(lang) ? 'rtl' : 'ltr',
  }
}

// Re-export everything from config
export * from './config'
export type { Translations } from './translations/en'
