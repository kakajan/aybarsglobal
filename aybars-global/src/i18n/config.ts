// i18n Configuration
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    locale: 'en-US',
    flag: '🇺🇸',
  },
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    dir: 'ltr',
    locale: 'tr-TR',
    flag: '🇹🇷',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    locale: 'ar-SA',
    flag: '🇸🇦',
  },
  fa: {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    dir: 'rtl',
    locale: 'fa-IR',
    flag: '🇮🇷',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
    locale: 'ru-RU',
    flag: '🇷🇺',
  },
} as const

export type Language = keyof typeof languages
export type LanguageConfig = (typeof languages)[Language]

export const defaultLang: Language = 'en'
export const supportedLanguages = Object.keys(languages) as Language[]

// RTL languages
export const rtlLanguages: Language[] = ['ar', 'fa']

export function isRTL(lang: Language): boolean {
  return rtlLanguages.includes(lang)
}

export function getLanguageConfig(lang: Language): LanguageConfig {
  return languages[lang] || languages[defaultLang]
}

// Get the language from URL path
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/')
  if (lang in languages) {
    return lang as Language
  }
  return defaultLang
}

// Generate localized path
export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash and any existing language prefix
  const cleanPath = path.replace(/^\//, '').replace(/^(en|tr|ar|fa|ru)\//, '')
  
  if (lang === defaultLang) {
    return `/${cleanPath}`
  }
  
  return `/${lang}/${cleanPath}`
}

// Get all localized versions of a path (for hreflang)
export function getAllLocalizedPaths(path: string): Record<Language, string> {
  const result = {} as Record<Language, string>
  
  for (const lang of supportedLanguages) {
    result[lang] = getLocalizedPath(path, lang)
  }
  
  return result
}

// Base URL for canonical/hreflang
export const siteUrl = 'https://aybarsglobal.com'

export function getCanonicalUrl(path: string, lang: Language): string {
  const localizedPath = getLocalizedPath(path, lang)
  return `${siteUrl}${localizedPath}`
}
