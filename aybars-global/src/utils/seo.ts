---
// SEO utilities for meta tags and structured data
export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function generateTitle(pageTitle: string, siteTitle: string = 'AYBARS GLOBAL TRADING'): string {
  return pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
}

export function generateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

export function generateKeywords(keywords: string[]): string {
  return keywords.join(', ');
}
---
