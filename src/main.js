import './styles.css';

const waitlistEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();
const localStorageKey = 'iaSansJargonWaitlistDemo';
const languageStorageKey = 'iaSansJargonLanguage';
const supportedLanguages = ['fr', 'en'];

const translations = {
  fr: {
    metaTitle: 'IA, sans jargon — Ne vous sentez plus largué par l’IA',
    metaDescription:
      'Une porte d’entrée simple et pratique pour comprendre l’IA sans jargon. Rejoignez la liste d’attente et recevez les premiers contenus gratuits.',
    ogTitle: 'IA, sans jargon',
    ogDescription:
      'Ne vous sentez plus largué par l’IA. Des repères simples, des usages concrets, et les premiers contenus gratuits en avant-première.',
    ogLocale: 'fr_FR',
    brandAriaLabel: 'Retour en haut de page',
    brandName: 'IA, sans jargon',
    languageSwitcherAriaLabel: 'Changer la langue',
    navFaq: 'FAQ',
    navCta: 'Recevoir l’accès prioritaire',
    heroEyebrow: 'Simple, clair, utile',
    heroTitle: 'Ne vous sentez plus largué par l’IA.',
    heroText:
      'Rejoignez la liste pour recevoir les premiers contenus gratuits et un point d’entrée simple pour comprendre à quoi l’IA peut vraiment vous servir.',
    heroFormLabel: 'Recevez l’accès prioritaire',
    emailPlaceholder: 'Votre email',
    heroSubmit: 'Recevoir les premiers contenus',
    heroFormNote: 'Gratuit. Pas de spam. Juste le lancement et les contenus utiles.',
    heroPointOne: 'Sans jargon technique',
    heroPointTwo: 'Des exemples du quotidien',
    heroPointThree: 'Pas besoin d’être technique',
    launchEyebrow: 'Au lancement',
    launchTitle: 'Vous recevrez l’essentiel pour démarrer sans vous noyer.',
    launchCardOneTitle: 'Comprendre les bases',
    launchCardOneText: 'Les mots utiles, expliqués simplement.',
    launchCardTwoTitle: 'Voir des usages concrets',
    launchCardTwoText: 'Des exemples faciles à reprendre.',
    launchCardThreeTitle: 'Faire le tri',
    launchCardThreeText: 'Quoi tester, quoi ignorer, sans pression.',
    benefitsEyebrow: 'Pourquoi laisser votre email ?',
    benefitsTitle: 'Pour recevoir un point de départ clair, pas une couche de bruit en plus.',
    benefitOneTitle: 'Plus simple',
    benefitOneText: 'Vous gagnez un repère clair dans un sujet qui paraît souvent flou.',
    benefitTwoTitle: 'Plus concret',
    benefitTwoText: 'Vous voyez ce qui peut vraiment vous aider au quotidien.',
    benefitThreeTitle: 'Plus rassurant',
    benefitThreeText: 'Vous avancez sans avoir besoin de tout comprendre d’un coup.',
    ctaEyebrow: 'Accès prioritaire',
    ctaTitle: 'Recevez les premiers contenus gratuits dès l’ouverture.',
    ctaText: 'Inscrivez-vous maintenant pour être prévenu en premier.',
    footerFormLabel: 'Adresse email',
    footerSubmit: 'Je veux être prévenu',
    footerFormNote: 'Gratuit. Pas de spam.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Quelques réponses simples.',
    faqOneQuestion: 'Je pars de zéro. Est-ce pour moi ?',
    faqOneAnswer:
      'Oui. Le projet est pensé pour les personnes curieuses qui veulent enfin un point d’entrée simple.',
    faqTwoQuestion: 'Est-ce une formation technique ?',
    faqTwoAnswer:
      'Non. L’objectif est de comprendre l’essentiel et de tester des usages concrets sans jargon.',
    faqThreeQuestion: 'Qu’est-ce que je reçois en m’inscrivant ?',
    faqThreeAnswer:
      'Les nouvelles du lancement, l’accès prioritaire, et les premiers contenus gratuits.',
    footerText: 'IA, sans jargon — pour comprendre l’IA simplement, sans se sentir largué.',
    footerBackToTop: 'Revenir en haut ↑',
    statusInvalidEmail: 'Merci d’entrer une adresse email valide.',
    statusLiveSuccess:
      'Merci — votre inscription est confirmée. Vous recevrez les premiers contenus à l’ouverture.',
    statusDemoSuccess:
      'Merci — votre email a bien été enregistré en mode démo sur ce navigateur. Il ne manque plus qu’à connecter le service email.',
    statusError:
      'Impossible d’enregistrer votre email pour le moment. Réessayez dans un instant.',
    buttonLoading: 'Envoi…',
  },
  en: {
    metaTitle: 'AI, without jargon — Stop feeling left behind by AI',
    metaDescription:
      'A simple, practical way to understand AI without the jargon. Join the waitlist and get the first free resources.',
    ogTitle: 'AI, without jargon',
    ogDescription:
      'Stop feeling left behind by AI. Clear guidance, real-world use cases, and first access to free launch content.',
    ogLocale: 'en_US',
    brandAriaLabel: 'Back to top',
    brandName: 'AI, without jargon',
    languageSwitcherAriaLabel: 'Switch language',
    navFaq: 'FAQ',
    navCta: 'Get priority access',
    heroEyebrow: 'Simple, clear, useful',
    heroTitle: 'Stop feeling left behind by AI.',
    heroText:
      'Join the list to get the first free resources and a simple starting point to understand how AI can actually help you.',
    heroFormLabel: 'Get priority access',
    emailPlaceholder: 'Your email',
    heroSubmit: 'Get the first resources',
    heroFormNote: 'Free. No spam. Just the launch and genuinely useful content.',
    heroPointOne: 'No technical jargon',
    heroPointTwo: 'Everyday examples',
    heroPointThree: 'No technical background needed',
    launchEyebrow: 'At launch',
    launchTitle: 'You’ll get the essentials to start without feeling overwhelmed.',
    launchCardOneTitle: 'Understand the basics',
    launchCardOneText: 'The useful terms, explained simply.',
    launchCardTwoTitle: 'See practical use cases',
    launchCardTwoText: 'Easy examples you can reuse right away.',
    launchCardThreeTitle: 'Filter the noise',
    launchCardThreeText: 'What to test, what to ignore, without pressure.',
    benefitsEyebrow: 'Why leave your email?',
    benefitsTitle: 'To get a clear starting point, not another layer of noise.',
    benefitOneTitle: 'Simpler',
    benefitOneText: 'You get a clear reference point in a topic that often feels blurry.',
    benefitTwoTitle: 'More practical',
    benefitTwoText: 'You see what can genuinely help you in everyday life.',
    benefitThreeTitle: 'More reassuring',
    benefitThreeText: 'You move forward without needing to understand everything at once.',
    ctaEyebrow: 'Priority access',
    ctaTitle: 'Get the first free resources as soon as we launch.',
    ctaText: 'Sign up now to be the first to know.',
    footerFormLabel: 'Email address',
    footerSubmit: 'Notify me first',
    footerFormNote: 'Free. No spam.',
    faqEyebrow: 'FAQ',
    faqTitle: 'A few simple answers.',
    faqOneQuestion: 'I’m starting from zero. Is this for me?',
    faqOneAnswer:
      'Yes. The project is designed for curious people who want a genuinely simple way in.',
    faqTwoQuestion: 'Is this a technical course?',
    faqTwoAnswer:
      'No. The goal is to understand the essentials and try practical use cases without jargon.',
    faqThreeQuestion: 'What do I get when I sign up?',
    faqThreeAnswer:
      'Launch updates, priority access, and the first free resources.',
    footerText: 'AI, without jargon — understand AI simply, without feeling left behind.',
    footerBackToTop: 'Back to top ↑',
    statusInvalidEmail: 'Please enter a valid email address.',
    statusLiveSuccess:
      'Thanks — your signup is confirmed. You’ll receive the first resources when we launch.',
    statusDemoSuccess:
      'Thanks — your email was saved locally in demo mode on this browser. The only step left is connecting the email service.',
    statusError: 'We could not save your email right now. Please try again in a moment.',
    buttonLoading: 'Sending…',
  },
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 },
);

for (const element of document.querySelectorAll('.reveal')) {
  observer.observe(element);
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  if (supportedLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguages = [
    ...(Array.isArray(window.navigator.languages) ? window.navigator.languages : []),
    window.navigator.language,
  ].filter(Boolean);

  for (const browserLanguage of browserLanguages) {
    const normalizedLanguage = String(browserLanguage).toLowerCase();

    if (normalizedLanguage.startsWith('fr')) {
      return 'fr';
    }

    if (normalizedLanguage.startsWith('en')) {
      return 'en';
    }
  }

  return 'fr';
}

function t(key, language = currentLanguage) {
  return translations[language]?.[key] ?? translations.fr[key] ?? '';
}

function setStatus(form, statusKey = '', tone = 'neutral') {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;

  status.dataset.statusKey = statusKey;
  status.dataset.tone = tone;
  status.textContent = statusKey ? t(statusKey) : '';
}

function refreshStatuses() {
  for (const status of document.querySelectorAll('[data-form-status]')) {
    const statusKey = status.dataset.statusKey;
    if (!statusKey) continue;
    status.textContent = t(statusKey);
  }
}

function syncFormButtons() {
  for (const form of document.querySelectorAll('[data-waitlist-form]')) {
    const button = form.querySelector('button[type="submit"]');
    if (!button) continue;

    form.dataset.buttonLabel = t(button.dataset.i18n);

    if (button.disabled) {
      button.textContent = t('buttonLoading');
    }
  }
}

function applyLanguage(language, { persist = true } = {}) {
  currentLanguage = supportedLanguages.includes(language) ? language : 'fr';

  if (persist) {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
  }

  document.documentElement.lang = currentLanguage;
  document.title = t('metaTitle');

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', t('metaDescription'));
  }

  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute('content', t('ogTitle'));
  }

  const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionMeta) {
    ogDescriptionMeta.setAttribute('content', t('ogDescription'));
  }

  const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
  if (ogLocaleMeta) {
    ogLocaleMeta.setAttribute('content', t('ogLocale'));
  }

  for (const element of document.querySelectorAll('[data-i18n]')) {
    element.textContent = t(element.dataset.i18n);
  }

  for (const element of document.querySelectorAll('[data-i18n-placeholder]')) {
    element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
  }

  for (const element of document.querySelectorAll('[data-i18n-aria-label]')) {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  }

  for (const button of document.querySelectorAll('[data-lang-switch]')) {
    const isActive = button.dataset.langSwitch === currentLanguage;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }

  syncFormButtons();
  refreshStatuses();
}

function lockForm(form, disabled) {
  const button = form.querySelector('button[type="submit"]');
  const input = form.querySelector('input[name="email"]');

  if (button) {
    button.disabled = disabled;
    button.textContent = disabled ? t('buttonLoading') : form.dataset.buttonLabel || button.textContent;
  }

  if (input) {
    input.disabled = disabled;
  }
}

function saveDemoLead(email) {
  const existing = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
  const next = [
    ...existing.filter((entry) => entry.email !== email),
    {
      email,
      source: 'landing-page',
      submittedAt: new Date().toISOString(),
      mode: 'demo',
    },
  ];

  window.localStorage.setItem(localStorageKey, JSON.stringify(next));
}

async function submitLead(email) {
  const payload = {
    email,
    source: 'landing-page',
    submittedAt: new Date().toISOString(),
  };

  if (!waitlistEndpoint) {
    saveDemoLead(email);
    return { mode: 'demo' };
  }

  const response = await fetch(waitlistEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`waitlist_request_failed:${response.status}`);
  }

  return { mode: 'live' };
}

for (const switcher of document.querySelectorAll('[data-lang-switch]')) {
  switcher.addEventListener('click', () => {
    applyLanguage(switcher.dataset.langSwitch);
  });
}

for (const form of document.querySelectorAll('[data-waitlist-form]')) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim().toLowerCase();

    if (!emailPattern.test(email)) {
      setStatus(form, 'statusInvalidEmail', 'error');
      return;
    }

    setStatus(form, '');
    lockForm(form, true);

    try {
      const result = await submitLead(email);
      form.reset();

      if (result.mode === 'live') {
        setStatus(form, 'statusLiveSuccess', 'success');
      } else {
        setStatus(form, 'statusDemoSuccess', 'success');
      }
    } catch (error) {
      console.error(error);
      setStatus(form, 'statusError', 'error');
    } finally {
      lockForm(form, false);
    }
  });
}

applyLanguage(currentLanguage, { persist: false });
