/* Public configuration. Turnstile Site Keys are intentionally public.
   The private TURNSTILE_SECRET must exist ONLY in Cloudflare Worker secrets.
   Public release must follow successful protected backend activation. */
window.LEARNCODE_AI_TUTOR = Object.freeze({
  apiUrl: 'https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev/api/tutor',
  turnstileSiteKey: '0x4AAAAAAFT61DFoIObxrqHQ',
  enabled: true
});
