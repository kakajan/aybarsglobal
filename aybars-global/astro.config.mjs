import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Define all supported languages
const languages = ['en', 'tr', 'ar', 'fa', 'ru'];
const defaultLang = 'en';

// Generate custom pages for all languages
const pages = [
    '/',
    '/about',
    '/about/vision',
    '/about/mission',
    '/services',
    '/services/logistics',
    '/services/grain-supply',
    '/services/industrial-metals',
    '/company',
    '/events',
    '/press',
    '/contact',
];

// Generate all localized URLs
const customPages = [];
pages.forEach(page => {
    languages.forEach(lang => {
        const localizedPath = lang === defaultLang ? page : `/${lang}${page}`;
        customPages.push(`https://aybarsglobal.com${localizedPath}`);
    });
});

export default defineConfig({
    site: 'https://aybarsglobal.com',
    integrations: [
        tailwind(),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en-US',
                    tr: 'tr-TR',
                    ar: 'ar-SA',
                    fa: 'fa-IR',
                    ru: 'ru-RU',
                },
            },
            customPages,
            // Serialize function to add xhtml:link for hreflang
            serialize (item) {
                // Find the base path without language prefix
                const url = new URL(item.url);
                let basePath = url.pathname;

                // Remove language prefix to get base path
                for (const lang of languages) {
                    if (lang !== defaultLang && basePath.startsWith(`/${lang}`)) {
                        basePath = basePath.substring(lang.length + 1) || '/';
                        break;
                    }
                }

                // Generate xhtml:link entries for all languages
                const links = languages.map(lang => {
                    const localizedPath = lang === defaultLang ? basePath : `/${lang}${basePath}`;
                    return {
                        rel: 'alternate',
                        hreflang: lang,
                        href: `https://aybarsglobal.com${localizedPath}`,
                    };
                });

                // Add x-default pointing to English
                links.push({
                    rel: 'alternate',
                    hreflang: 'x-default',
                    href: `https://aybarsglobal.com${basePath}`,
                });

                return {
                    ...item,
                    links,
                };
            },
        }),
    ],
    vite: {
        ssr: {
            noExternal: [],
        },
        build: {
            rollupOptions: {
                onwarn (warning, warn) {
                    if (
                        warning?.code === 'UNUSED_EXTERNAL_IMPORT' &&
                        typeof warning?.id === 'string' &&
                        warning.id.includes('astro/dist/assets/utils/remotePattern.js')
                    ) {
                        return;
                    }
                    warn(warning);
                },
            },
        },
    },
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    },
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto',
    },
});
