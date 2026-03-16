const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function parseJsonBody(req) {
  if (req.body == null) {
    return {};
  }

  if (typeof req.body === 'string') {
    if (!req.body.trim()) {
      return {};
    }

    return JSON.parse(req.body);
  }

  if (typeof req.body === 'object') {
    return req.body;
  }

  return {};
}

function getSafeUpstreamDetails(payload) {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const details = {};

  if (typeof payload.code === 'string' && payload.code.trim()) {
    details.code = payload.code.trim();
  }

  if (typeof payload.message === 'string' && payload.message.trim()) {
    details.message = payload.message.trim().slice(0, 300);
  }

  return Object.keys(details).length > 0 ? details : undefined;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, {
      ok: false,
      error: 'method_not_allowed',
    });
  }

  let payload;

  try {
    payload = parseJsonBody(req);
  } catch {
    return sendJson(res, 400, {
      ok: false,
      error: 'invalid_json',
    });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!EMAIL_PATTERN.test(email)) {
    return sendJson(res, 400, {
      ok: false,
      error: 'invalid_email',
    });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return sendJson(res, 500, {
      ok: false,
      error: 'server_not_configured',
    });
  }

  let brevoResponse;

  try {
    brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });
  } catch {
    return sendJson(res, 502, {
      ok: false,
      error: 'upstream_unreachable',
    });
  }

  let upstreamPayload;

  try {
    upstreamPayload = await brevoResponse.json();
  } catch {
    upstreamPayload = null;
  }

  if (!brevoResponse.ok) {
    return sendJson(res, brevoResponse.status, {
      ok: false,
      error: 'brevo_request_failed',
      upstream: {
        status: brevoResponse.status,
        ...getSafeUpstreamDetails(upstreamPayload),
      },
    });
  }

  return sendJson(res, 200, {
    ok: true,
  });
}
