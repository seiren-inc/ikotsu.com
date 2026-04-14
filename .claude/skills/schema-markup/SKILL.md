---
name: schema-markup
description: Use for any JSON-LD structured data task. Covers Organization, WebSite, WebPage, LocalBusiness, and BreadcrumbList types relevant to a corporate site.
---

# Schema Markup

## Schema Types for Corporate Site

| Page | Schema |
|------|--------|
| Home | `Organization` + `WebSite` |
| About / Company | `Organization` |
| Any page | `WebPage` + `BreadcrumbList` |

## Required Base Fields

```json
{ "@context": "https://schema.org", "@type": "...", "@id": "...", "url": "...",
  "name": "...", "description": "...", "inLanguage": "ja" }
```

## Workflow

1. Identify schema type for the page
2. Implement in `<script type="application/ld+json">` tag
3. Run Rich Results Test
4. Confirm H1 / title / schema name alignment
5. Report: type used, reason, validation result

Rules: JSON-LD only. Match displayed content exactly. One primary type per page.
