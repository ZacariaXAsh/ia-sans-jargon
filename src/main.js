import './styles.css';
import {
  defaultLanguage,
  getPreferredLanguage,
  languageStorageKey,
  localStorageKey,
  supportedLanguages,
  t,
} from './i18n.js';

const waitlistEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const currentLanguage = getCurrentLanguage();

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

function getCurrentLanguage() {
  const pageLanguage = document.documentElement.lang?.toLowerCase();

  if (supportedLanguages.includes(pageLanguage)) {
    return pageLanguage;
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  const browserLanguages = [
    ...(Array.isArray(window.navigator.languages) ? window.navigator.languages : []),
    window.navigator.language,
  ].filter(Boolean);

  return getPreferredLanguage({ storedLanguage, browserLanguages });
}

function setStatus(form, statusKey = '', tone = 'neutral') {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;

  status.dataset.statusKey = statusKey;
  status.dataset.tone = tone;
  status.textContent = statusKey ? t(statusKey, currentLanguage) : '';
}

function lockForm(form, disabled) {
  const button = form.querySelector('button[type="submit"]');
  const input = form.querySelector('input[name="email"]');

  if (button) {
    if (!form.dataset.buttonLabel) {
      form.dataset.buttonLabel = button.textContent.trim();
    }

    button.disabled = disabled;
    button.textContent = disabled
      ? t('buttonLoading', currentLanguage)
      : form.dataset.buttonLabel || button.textContent;
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

for (const link of document.querySelectorAll('[data-lang-link]')) {
  link.addEventListener('click', (event) => {
    const nextLanguage = link.dataset.langLink;

    if (supportedLanguages.includes(nextLanguage)) {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const targetPath = link.dataset.targetPath;

    if (targetPath) {
      event.preventDefault();
      window.location.assign(targetPath);
    }
  });
}

for (const form of document.querySelectorAll('[data-waitlist-form]')) {
  const button = form.querySelector('button[type="submit"]');

  if (button) {
    form.dataset.buttonLabel = button.textContent.trim();
  }

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

document.documentElement.lang = currentLanguage || defaultLanguage;
