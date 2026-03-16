import './styles.css';

const waitlistEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();
const localStorageKey = 'iaSansJargonWaitlistDemo';

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

function setStatus(form, message, tone = 'neutral') {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function lockForm(form, disabled) {
  const button = form.querySelector('button[type="submit"]');
  const input = form.querySelector('input[name="email"]');

  if (button) {
    button.disabled = disabled;
    button.textContent = disabled ? 'Envoi…' : form.dataset.buttonLabel || button.textContent;
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

for (const form of document.querySelectorAll('[data-waitlist-form]')) {
  const button = form.querySelector('button[type="submit"]');
  if (button) {
    form.dataset.buttonLabel = button.textContent;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim().toLowerCase();

    if (!emailPattern.test(email)) {
      setStatus(form, 'Merci d’entrer une adresse email valide.', 'error');
      return;
    }

    setStatus(form, '');
    lockForm(form, true);

    try {
      const result = await submitLead(email);
      form.reset();

      if (result.mode === 'live') {
        setStatus(form, 'Merci — votre inscription est confirmée. Vous recevrez les premiers contenus à l’ouverture.', 'success');
      } else {
        setStatus(form, 'Merci — votre email a bien été enregistré en mode démo sur ce navigateur. Il ne manque plus qu’à connecter le service email.', 'success');
      }
    } catch (error) {
      console.error(error);
      setStatus(
        form,
        'Impossible d’enregistrer votre email pour le moment. Réessayez dans un instant.',
        'error',
      );
    } finally {
      lockForm(form, false);
    }
  });
}
