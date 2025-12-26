# AYBARS GLOBAL TRADING - Website OpenSpec

## Project Overview

**Project Name:** AYBARS GLOBAL TRADING Corporate Website
**Version:** 2.0
**Date:** December 26, 2025
**Client:** AYBARS GLOBAL TRADING
**Technology Stack:** Astro 4.x, TailwindCSS, TypeScript, JSON-LD, Sitemap Generator

---

## 1. Executive Summary

AYBARS GLOBAL TRADING requires a comprehensive, professional corporate website that reflects their position as a leader in international trade. The website will showcase their three core business divisions: International Transportation & Logistics, Grain Procurement & Supply, and Metals & Industrial Materials Supply.

### Key Objectives

- Establish strong digital presence for international trading company
- Showcase services, expertise, and global reach
- Provide investor relations and press information
- Optimize for international SEO and search visibility
- Create a professional, trustworthy brand image

---

## 2. Technical Architecture

### 2.1 Technology Stack

| Technology       | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| Astro 4.x        | Static site generation with Islands architecture |
| TailwindCSS      | Utility-first CSS framework                      |
| TypeScript       | Type-safe JavaScript                             |
| @astrojs/sitemap | Automatic sitemap generation                     |
| astro-seo        | SEO meta tags management                         |
| JSON-LD          | Structured data for search engines               |

### 2.2 Directory Structure

```
aybars-global/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── MobileMenu.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── ServiceCards.astro
│   │   │   ├── AboutSection.astro
│   │   │   ├── CoreSectors.astro
│   │   │   └── CTASection.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── SectionTitle.astro
│   │   │   └── ContactInfo.astro
│   │   └── seo/
│   │       ├── JsonLd.astro
│   │       └── SEOHead.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about/
│   │   │   ├── index.astro
│   │   │   ├── vision.astro
│   │   │   └── mission.astro
│   │   ├── services/
│   │   │   ├── index.astro
│   │   │   ├── logistics.astro
│   │   │   ├── grain-supply.astro
│   │   │   └── industrial-metals.astro
│   │   ├── company/
│   │   │   └── index.astro
│   │   ├── events/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── press/
│   │   │   ├── index.astro
│   │   │   ├── releases/
│   │   │   │   └── [slug].astro
│   │   │   └── financial/
│   │   │       └── [slug].astro
│   │   └── contact/
│   │       └── index.astro
│   ├── content/
│   │   ├── events/
│   │   ├── press-releases/
│   │   └── financial-releases/
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   ├── seo.ts
│   │   └── formatDate.ts
│   └── data/
│       ├── services.ts
│       ├── team.ts
│       └── company.ts
├── public/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── favicon/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 3. Page Specifications

### 3.1 Homepage (`/`)

#### Hero Section

- **Headline:** "A Leader in International Trade, Rooted in Trust and Innovation"
- **Subheadline:** Company description (30+ years experience)
- **CTA Buttons:** "Our Services" | "Contact Us"
- **Background:** Professional trading/logistics imagery with overlay

#### Service Cards Section

Three prominent cards with icons:

1. **Ground Shipping** - "Reliable, Cost-Effective Land Transport"
2. **Air Delivery** - "Fastest Way to Move Your Cargo"
3. **Sea Delivery** - "Economical Shipping for Large Volumes"

#### Core Sectors Section

Three detailed sections:

1. **International Transportation & Logistics**
2. **Grain Procurement & Supply**
3. **Metals & Industrial Materials Supply**

#### About Teaser

- Brief company introduction
- Vision & Mission snippets
- Link to full about page

#### Stats/Trust Indicators

- Years of experience: 30+
- Countries served: 50+
- Successful deliveries: 10,000+
- Global partners: 200+

### 3.2 Company Page (`/company`)

- Full company history
- Leadership team
- Core values
- Global presence map
- Certifications & accreditations

### 3.3 About Pages

- **Vision (`/about/vision`):** Future aspirations
- **Mission (`/about/mission`):** Current objectives

### 3.4 Services Pages

#### Logistics (`/services/logistics`)

- Land transport details
- Sea freight services
- Air cargo solutions
- Customs clearance
- Warehousing

#### Grain Supply (`/services/grain-supply`)

- Wheat procurement
- Corn supply
- Barley sourcing
- Soybeans trading
- Quality control processes

#### Industrial Metals (`/services/industrial-metals`)

- Rebar supply
- Copper procurement
- Aluminum trading
- Steel distribution
- Alloys supply

### 3.5 Events Page (`/events`)

- Upcoming trade shows
- Industry conferences
- Company events
- Event cards with date, location, description

### 3.6 Press Center (`/press`)

- Press releases listing
- Financial releases listing
- Media kit download
- Contact for media inquiries

### 3.7 Contact Page (`/contact`)

- Contact form
- Office locations
- Phone numbers
- Email addresses
- Google Maps integration

---

## 4. Design System

### 4.1 Color Palette

```css
:root {
  --primary: #0A1628;       /* Deep Navy - Trust & Stability */
  --secondary: #1E3A5F;     /* Ocean Blue - Logistics */
  --accent: #C9A227;        /* Gold - Premium/Quality */
  --accent-light: #E8D48A;  /* Light Gold */
  --success: #10B981;       /* Green - Growth */
  --text-dark: #1F2937;     /* Dark Gray */
  --text-light: #6B7280;    /* Medium Gray */
  --background: #FFFFFF;    /* White */
  --background-alt: #F8FAFC;/* Light Gray */
}
```

### 4.2 Typography

- **Headings:** Inter (Bold/Semibold)
- **Body:** Inter (Regular/Medium)
- **Accent:** Playfair Display (for taglines)

### 4.3 Spacing System

- Base unit: 4px
- Section padding: 80px-120px
- Container max-width: 1280px

### 4.4 Component Styles

- Cards: Soft shadows, rounded corners (8px)
- Buttons: Primary/Secondary variants, hover states
- Icons: Custom SVG icons for services

---

## 5. SEO Strategy

### 5.1 On-Page SEO

- Semantic HTML5 structure
- Optimized meta titles and descriptions
- Open Graph tags for social sharing
- Twitter Card metadata
- Canonical URLs

### 5.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AYBARS GLOBAL TRADING",
  "description": "International trade company specializing in logistics, grain procurement, and industrial metals",
  "url": "https://aybarsglobal.com",
  "logo": "https://aybarsglobal.com/images/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "HUZUR NH. AZERBAYCAN AVE, SKYLAND B 4B, NO: 65",
    "addressLocality": "SARIYER",
    "addressRegion": "ISTANBUL",
    "addressCountry": "TR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-212-830-28-38",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.linkedin.com/company/aybarsglobal",
    "https://twitter.com/aybarsglobal"
  ]
}
```

### 5.3 Technical SEO

- XML Sitemap generation
- Robots.txt configuration
- Image optimization (WebP format)
- Core Web Vitals optimization
- Mobile-first responsive design

### 5.4 International SEO

- hreflang tags for multi-language support (future)
- Geotargeting configuration
- Local business schema for Istanbul office

---

## 6. Performance Targets

| Metric                   | Target |
| ------------------------ | ------ |
| Lighthouse Performance   | > 95   |
| Lighthouse SEO           | 100    |
| First Contentful Paint   | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive      | < 3.0s |
| Cumulative Layout Shift  | < 0.1  |

---

## 7. Content Requirements

### 7.1 Images Needed

- Hero background (logistics/trade themed)
- Service icons (transport modes)
- Team photos
- Office images
- Industry-specific imagery (grain, metals, shipping)
- Logo variations (light/dark)

### 7.2 Copy Requirements

- All pages require professional copywriting
- Multilingual support consideration (EN/TR)
- Legal pages (Privacy Policy, Terms)

---

## 8. Development Phases

### Phase 1: Foundation (Week 1)

- [X] Project setup with Astro
- [X] Design system implementation
- [X] Component library creation
- [X] Layout templates

### Phase 2: Core Pages (Week 2)

- [X] Homepage development
- [X] Services pages
- [X] About/Company pages
- [X] Contact page

### Phase 3: Content & Features (Week 3)

- [X] Events page
- [X] Press releases section
- [X] Financial releases section
- [X] CMS integration for dynamic content

### Phase 4: SEO & Launch (Week 4)

- [X] SEO optimization
- [X] Performance optimization
- [X] Testing & QA
- [X] Deployment

---

## 9. Deliverables

1. Complete Astro-based website
2. All specified pages and components
3. SEO-optimized content structure
4. JSON-LD structured data
5. XML Sitemap
6. Responsive design (mobile, tablet, desktop)
7. Documentation

---

## 10. Contact Information

**AYBARS GLOBAL TRADING**
HUZUR MAH. AZERBAYCAN CAD.SKYLAND B NO:4B İÇKAPI NO:65 SARİYER/İSTANBUL ‎

- Phone:
- +902128302838‎
- +902128305838‎
  +902128302038
- Email: info@aybarsglobal.com
- Website: https://aybarsglobal.com
  Phone Numbers:‎
