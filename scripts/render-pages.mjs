import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultLanguage,
  languageStorageKey,
  supportedLanguages,
  translations,
} from '../src/i18n.js';

const rootDir = new URL('../', import.meta.url);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderLanguageLink(pageLanguage, targetLanguage, label) {
  const isActive = pageLanguage === targetLanguage;
  const classes = ['language-link'];
  const href =
    pageLanguage === targetLanguage ? './index.html' : `../${targetLanguage}/index.html`;

  if (isActive) {
    classes.push('is-active');
  }

  const current = isActive ? ' aria-current="page"' : '';

  return `<a class="${classes.join(' ')}" href="${href}" lang="${targetLanguage}" hreflang="${targetLanguage}" aria-label="${escapeHtml(
    label,
  )}" data-lang-link="${targetLanguage}" data-target-path="/${targetLanguage}/"${current}>${targetLanguage.toUpperCase()}</a>`;
}

function renderLocalePage(language) {
  const copy = translations[language];
  const alternateLanguage = language === 'fr' ? 'en' : 'fr';

  return `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(copy.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(copy.metaDescription)}" />
    <meta property="og:title" content="${escapeHtml(copy.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(copy.ogDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${escapeHtml(copy.ogLocale)}" />
    <meta property="og:locale:alternate" content="${escapeHtml(translations[alternateLanguage].ogLocale)}" />
    <meta name="theme-color" content="#f5f1ea" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap"
      rel="stylesheet"
    />
    <script type="module" src="/src/main.js"></script>
  </head>
  <body>
    <div class="page-shell">
      <header class="site-header">
        <nav class="nav container">
          <a class="brand" href="#top" aria-label="${escapeHtml(copy.brandAriaLabel)}">
            <span class="brand-mark">✦</span>
            <span>${escapeHtml(copy.brandName)}</span>
          </a>

          <div class="nav-actions">
            <div class="language-switcher">
              <span class="sr-only">${escapeHtml(copy.languageSwitcherLabel)}</span>
              ${renderLanguageLink(language, 'fr', copy.languageLinkFr)}
              <span class="language-divider" aria-hidden="true">/</span>
              ${renderLanguageLink(language, 'en', copy.languageLinkEn)}
            </div>

            <div class="nav-links">
              <a href="#start">${escapeHtml(copy.navStart)}</a>
              <a href="#faq">${escapeHtml(copy.navFaq)}</a>
              <a class="nav-cta" href="#attente">${escapeHtml(copy.navCta)}</a>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        <section class="hero">
          <div class="hero-glow" aria-hidden="true"></div>
          <div class="container hero-grid">
            <div class="hero-copy reveal">
              <p class="eyebrow">${escapeHtml(copy.heroEyebrow)}</p>
              <h1>${escapeHtml(copy.heroTitle)}</h1>
              <p class="hero-text">${escapeHtml(copy.heroText)}</p>

              <div class="hero-actions">
                <a class="button-link button-link-primary" href="#start">${escapeHtml(copy.heroPrimary)}</a>
                <a class="button-link button-link-secondary" href="#attente">${escapeHtml(copy.heroSecondary)}</a>
              </div>

              <ul class="hero-points">
                <li>${escapeHtml(copy.heroPointOne)}</li>
                <li>${escapeHtml(copy.heroPointTwo)}</li>
                <li>${escapeHtml(copy.heroPointThree)}</li>
              </ul>
            </div>

            <div class="hero-panel reveal">
              <div class="card hero-card">
                <p class="card-kicker">${escapeHtml(copy.heroCardEyebrow)}</p>
                <h2>${escapeHtml(copy.heroCardTitle)}</h2>
                <p class="card-intro">${escapeHtml(copy.heroCardIntro)}</p>
                <div class="mini-stack">
                  <article>
                    <h3>${escapeHtml(copy.heroCardOneTitle)}</h3>
                    <p>${escapeHtml(copy.heroCardOneText)}</p>
                  </article>
                  <article>
                    <h3>${escapeHtml(copy.heroCardTwoTitle)}</h3>
                    <p>${escapeHtml(copy.heroCardTwoText)}</p>
                  </article>
                  <article>
                    <h3>${escapeHtml(copy.heroCardThreeTitle)}</h3>
                    <p>${escapeHtml(copy.heroCardThreeText)}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="start" class="section soft-section">
          <div class="container">
            <div class="section-heading reveal">
              <p class="eyebrow">${escapeHtml(copy.pathEyebrow)}</p>
              <h2>${escapeHtml(copy.pathTitle)}</h2>
              <p>${escapeHtml(copy.pathText)}</p>
            </div>

            <div class="grid three-col path-grid">
              <article class="info-card reveal path-card">
                <p class="card-meta">${escapeHtml(copy.pathCardOneMeta)}</p>
                <h3>${escapeHtml(copy.pathCardOneTitle)}</h3>
                <p>${escapeHtml(copy.pathCardOneText)}</p>
              </article>
              <article class="info-card reveal path-card">
                <p class="card-meta">${escapeHtml(copy.pathCardTwoMeta)}</p>
                <h3>${escapeHtml(copy.pathCardTwoTitle)}</h3>
                <p>${escapeHtml(copy.pathCardTwoText)}</p>
              </article>
              <article class="info-card reveal path-card">
                <p class="card-meta">${escapeHtml(copy.pathCardThreeMeta)}</p>
                <h3>${escapeHtml(copy.pathCardThreeTitle)}</h3>
                <p>${escapeHtml(copy.pathCardThreeText)}</p>
              </article>
            </div>
          </div>
        </section>

        <section class="section white-section">
          <div class="container">
            <div class="section-heading reveal section-heading-compact">
              <p class="eyebrow">${escapeHtml(copy.benefitsEyebrow)}</p>
              <h2>${escapeHtml(copy.benefitsTitle)}</h2>
            </div>

            <div class="grid three-col compact-grid">
              <article class="info-card reveal">
                <h3>${escapeHtml(copy.benefitOneTitle)}</h3>
                <p>${escapeHtml(copy.benefitOneText)}</p>
              </article>
              <article class="info-card reveal">
                <h3>${escapeHtml(copy.benefitTwoTitle)}</h3>
                <p>${escapeHtml(copy.benefitTwoText)}</p>
              </article>
              <article class="info-card reveal">
                <h3>${escapeHtml(copy.benefitThreeTitle)}</h3>
                <p>${escapeHtml(copy.benefitThreeText)}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="attente" class="section cta-section">
          <div class="container cta-wrap reveal">
            <div class="cta-copy">
              <p class="eyebrow">${escapeHtml(copy.ctaEyebrow)}</p>
              <h2>${escapeHtml(copy.ctaTitle)}</h2>
              <p>${escapeHtml(copy.ctaText)}</p>
            </div>

            <form class="waitlist-form waitlist-form-compact card" data-waitlist-form>
              <label class="sr-only" for="footer-email">${escapeHtml(copy.footerFormLabel)}</label>
              <div class="form-row form-row-stacked-mobile">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  inputmode="email"
                  autocomplete="email"
                  placeholder="${escapeHtml(copy.emailPlaceholder)}"
                  required
                />
                <button type="submit">${escapeHtml(copy.footerSubmit)}</button>
              </div>
              <p class="form-note">${escapeHtml(copy.footerFormNote)}</p>
              <p class="form-status" data-form-status aria-live="polite"></p>
            </form>
          </div>
        </section>

        <section id="faq" class="section white-section">
          <div class="container faq-wrap">
            <div class="section-heading reveal section-heading-compact">
              <p class="eyebrow">${escapeHtml(copy.faqEyebrow)}</p>
              <h2>${escapeHtml(copy.faqTitle)}</h2>
            </div>
            <div class="faq-list reveal">
              <details>
                <summary>${escapeHtml(copy.faqOneQuestion)}</summary>
                <p>${escapeHtml(copy.faqOneAnswer)}</p>
              </details>
              <details>
                <summary>${escapeHtml(copy.faqTwoQuestion)}</summary>
                <p>${escapeHtml(copy.faqTwoAnswer)}</p>
              </details>
              <details>
                <summary>${escapeHtml(copy.faqThreeQuestion)}</summary>
                <p>${escapeHtml(copy.faqThreeAnswer)}</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="container footer-inner">
          <p>${escapeHtml(copy.footerText)}</p>
          <a href="#top">${escapeHtml(copy.footerBackToTop)}</a>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
}

function renderRedirectPage() {
  const localeStorageKey = JSON.stringify(languageStorageKey);
  const localeList = JSON.stringify(supportedLanguages);
  const fallbackLanguage = JSON.stringify(defaultLanguage);

  return `<!doctype html>
<html lang="${defaultLanguage}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IA, sans jargon</title>
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=/fr/" />
    <script>
      (function () {
        var storageKey = ${localeStorageKey};
        var supported = ${localeList};
        var fallback = ${fallbackLanguage};
        var stored = window.localStorage.getItem(storageKey);

        if (supported.indexOf(stored) !== -1) {
          window.location.replace('/' + stored + '/');
          return;
        }

        var browserLanguages = [];

        if (Array.isArray(window.navigator.languages)) {
          browserLanguages = browserLanguages.concat(window.navigator.languages);
        }

        if (window.navigator.language) {
          browserLanguages.push(window.navigator.language);
        }

        for (var i = 0; i < browserLanguages.length; i += 1) {
          var normalized = String(browserLanguages[i]).toLowerCase();

          if (normalized.indexOf('fr') === 0) {
            window.location.replace('/fr/');
            return;
          }

          if (normalized.indexOf('en') === 0) {
            window.location.replace('/en/');
            return;
          }
        }

        window.location.replace('/' + fallback + '/');
      })();
    </script>
  </head>
  <body>
    <noscript>
      <p><a href="/fr/">Continuer en français</a></p>
      <p><a href="/en/">Continue in English</a></p>
    </noscript>
  </body>
</html>
`;
}

async function writeFile(relativePath, content) {
  const filePath = new URL(relativePath, rootDir);
  const fileSystemPath = fileURLToPath(filePath);
  await fs.mkdir(path.dirname(fileSystemPath), { recursive: true });
  await fs.writeFile(fileSystemPath, content, 'utf8');
}

await writeFile('index.html', renderRedirectPage());

for (const language of supportedLanguages) {
  await writeFile(`${language}/index.html`, renderLocalePage(language));
}
