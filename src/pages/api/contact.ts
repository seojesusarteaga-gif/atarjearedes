import type { APIRoute } from 'astro';
import { RESEND_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from 'astro:env/server';
import { LEADS } from '../../data/site';
import { notificarLead, validarLead } from '../../lib/leads';

/**
 * Endpoint del formulario de /contacto (Fase RR3).
 *
 * Es la UNICA ruta bajo demanda del sitio: las 48 paginas siguen
 * prerenderizadas. Codigos de respuesta:
 *   200  enviado por al menos un canal (o bot descartado por el honeypot)
 *   400  datos no validos           413  cuerpo demasiado grande
 *   415  no es JSON                 500  fallaron los dos canales
 */
export const prerender = false;

const MAX_BYTES = 16 * 1024;

function responder(status: number, cuerpo: Record<string, unknown>): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // Solo JSON. Un formulario HTML de otra web no puede mandar JSON sin que el
  // navegador pida permiso antes (preflight), y aqui no se concede.
  const tipo = (request.headers.get('content-type') ?? '').toLowerCase();
  if (!tipo.startsWith('application/json')) {
    return responder(415, { ok: false, error: 'Formato no admitido' });
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BYTES) {
    return responder(413, { ok: false, error: 'Mensaje demasiado largo' });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return responder(400, { ok: false, error: 'Datos no válidos' });
  }

  // Honeypot: una persona nunca ve este campo. Si llega relleno es un bot, y se
  // le responde 200 como si nada para no darle pistas.
  const trampa = (body as Record<string, unknown> | null)?.botcheck;
  if (typeof trampa === 'string' && trampa.trim() !== '') {
    console.warn('[contact] honeypot relleno: envío descartado');
    return responder(200, { ok: true });
  }

  const validacion = validarLead(body);
  if ('error' in validacion) {
    return responder(400, { ok: false, error: validacion.error });
  }

  const resultados = await notificarLead(validacion.lead, {
    telegramToken: TELEGRAM_BOT_TOKEN,
    telegramChatId: TELEGRAM_CHAT_ID,
    resendApiKey: RESEND_API_KEY,
    remitente: LEADS.remitente,
    destinatario: LEADS.destinatario,
  });

  for (const r of resultados) {
    if (!r.ok) console.error(`[contact] fallo en ${r.canal}: ${r.error}`);
  }
  // Traza de cada lead sin datos personales: canal, resultado e id del envio.
  console.log(
    '[contact] lead procesado',
    JSON.stringify(
      resultados.map((r) => (r.ok ? { canal: r.canal, ok: true, id: r.id } : { canal: r.canal, ok: false })),
    ),
  );

  if (!resultados.some((r) => r.ok)) {
    return responder(500, { ok: false, error: 'No se pudo enviar el mensaje' });
  }
  return responder(200, { ok: true });
};

/** Cualquier otro metodo: 405. */
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST' } });
