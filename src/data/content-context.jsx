import React from 'react';
import { defaultContent } from './content.jsx';

/* Merges the admin's saved overrides over the static defaults and exposes
   the effective content tree. Sections read their slice from here (via App),
   so admin edits go live on the public site. */

const ContentCtx = React.createContext(null);

export function mergeContent(overrides) {
  const o = overrides || {};
  const arr = (v, d) => (Array.isArray(v) && v.length ? v : d);
  return {
    hero: { ...defaultContent.hero, ...(o.hero || {}) },
    about: { ...defaultContent.about, ...(o.about || {}) },
    contact: { ...defaultContent.contact, ...(o.contact || {}) },
    experience: arr(o.experience, defaultContent.experience),
    stack: arr(o.stack, defaultContent.stack),
    projects: arr(o.projects, defaultContent.projects),
    writings: arr(o.writings, defaultContent.writings),
  };
}

export function ContentProvider({ children }) {
  const [content, setContent] = React.useState(() => mergeContent());

  React.useEffect(() => {
    let alive = true;
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => { if (alive) setContent(mergeContent(data)); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return <ContentCtx.Provider value={content}>{children}</ContentCtx.Provider>;
}

export function useContent() {
  return React.useContext(ContentCtx) ?? mergeContent();
}
