// Date formatting utilities

// Map language codes to locale codes
function getLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'tr': 'tr-TR',
    'ar': 'ar-SA',
    'fa': 'fa-IR',
    'ru': 'ru-RU',
  };
  return localeMap[lang] || lang;
}

export function formatDate(date: Date | string, lang: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const locale = getLocale(lang);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(date: Date | string, lang: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const locale = getLocale(lang);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateISO(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
