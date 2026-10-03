/* Turns whatever you paste from LinkedIn into an official embed URL.

   Accepted:
     · the post link        https://www.linkedin.com/posts/<slug>-activity-7123456789012345678-AbCd/
     · the embed code       <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:712…" …>
     · the embed URL        https://www.linkedin.com/embed/feed/update/urn:li:activity:712…
     · a bare URN           urn:li:activity:7123456789012345678

   Returns null when nothing recognisable is in the text, so the UI can say so
   instead of rendering a broken frame. LinkedIn has no public API for a
   profile's posts; these embeds are their supported way to show one. */

const EMBED = 'https://www.linkedin.com/embed/feed/update/';

export function embedSrc(input) {
  const text = String(input || '').trim();
  if (!text) return null;

  // pasted embed code → take its src
  const iframe = text.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  const url = iframe ? iframe[1] : text;

  // already an embed URL
  if (/linkedin\.com\/embed\/feed\/update\//i.test(url)) return url.split('?')[0];

  // a bare or embedded URN (share / ugcPost / activity)
  const urn = url.match(/urn:li:(share|ugcPost|activity):(\d+)/i);
  if (urn) return `${EMBED}urn:li:${urn[1]}:${urn[2]}`;

  // a normal post link ends with …-activity-<id>-<hash>
  const activity = url.match(/activity[-:](\d{10,})/i);
  if (activity) return `${EMBED}urn:li:activity:${activity[1]}`;

  return null;
}

/* the public link to open the post itself, for the "View on LinkedIn" fallback */
export function postHref(input) {
  const text = String(input || '').trim();
  const direct = text.match(/https?:\/\/[^\s"']*linkedin\.com\/posts\/[^\s"']+/i);
  if (direct) return direct[0];
  const src = embedSrc(text);
  const urn = src && src.match(/urn:li:\w+:(\d+)/);
  return urn ? `https://www.linkedin.com/feed/update/urn:li:activity:${urn[1]}/` : null;
}
