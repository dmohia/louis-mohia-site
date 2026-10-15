import fr from './fr.json';
import en from './en.json';

const translations = { fr, en } as const;

export type Lang = keyof typeof translations;
export const defaultLang: Lang = 'fr';
export const languages = ['fr', 'en'] as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'fr';
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value ?? key;
  };
}

export function getRelativeLocaleUrl(lang: Lang, path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (lang === 'fr') {
    return `/${cleanPath}`;
  }

  return `/en/${cleanPath}`;
}

// Get the alternate language path for language switching
export function getAlternateLanguagePath(currentPath: string, targetLang: Lang): string {
  // Remove leading slash and potential 'en/' prefix
  let path = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;

  if (path.startsWith('en/')) {
    path = path.slice(3);
  } else if (path === 'en') {
    path = '';
  }

  // Map French paths to English paths and vice versa
  const pathMappings: Record<string, string> = {
    'services': 'services',
    'cas-clients': 'case-studies',
    'case-studies': 'cas-clients',
    'contact': 'contact',
    'blog': 'blog'
  };

  // Handle path translation
  const pathParts = path.split('/');
  if (pathParts[0] && pathMappings[pathParts[0]]) {
    if (targetLang === 'en' && pathParts[0] === 'cas-clients') {
      pathParts[0] = 'case-studies';
    } else if (targetLang === 'fr' && pathParts[0] === 'case-studies') {
      pathParts[0] = 'cas-clients';
    }
    path = pathParts.join('/');
  }

  if (targetLang === 'fr') {
    return `/${path}`;
  }

  return `/en/${path}`;
}
