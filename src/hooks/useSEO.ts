import { useEffect } from "react";

const BASE_URL = "https://practicerxconsulting.com";
const DEFAULT_TITLE =
  "PracticeRx Consulting | Launch Your DPC or Concierge Practice in 90 Days";
const DEFAULT_DESCRIPTION =
  "PracticeRx Consulting helps physicians launch profitable DPC and concierge practices in 90 days. Get expert guidance on business formation, membership pricing, EMR selection, and patient acquisition — without the guesswork.";

interface SEOOptions {
  /** Page title — " | PracticeRx Consulting" is appended automatically unless you include it */
  title?: string;
  /** Meta description (max ~160 chars) */
  description?: string;
  /** Canonical path, e.g. "/services". Defaults to current pathname. */
  path?: string;
  /** Full og:image URL */
  ogImage?: string;
}

/**
 * Sets <title>, <meta name="description">, <link rel="canonical">,
 * <meta property="og:url">, and optionally <meta property="og:image">
 * for the current page. Resets to defaults on unmount.
 */
export function useSEO({
  title,
  description,
  path,
  ogImage,
}: SEOOptions = {}) {
  useEffect(() => {
    /* ── title ── */
    const fullTitle = title
      ? title.includes("PracticeRx")
        ? title
        : `${title} | PracticeRx Consulting`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    /* ── meta description ── */
    const desc = description || DEFAULT_DESCRIPTION;
    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;

    /* ── canonical ── */
    const canonicalUrl =
      path !== undefined
        ? `${BASE_URL}${path}`
        : `${BASE_URL}${window.location.pathname}`;
    let canon = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = canonicalUrl;

    /* ── og:url ── */
    let ogUrl = document.querySelector(
      'meta[property="og:url"]'
    ) as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;

    /* ── og:title ── */
    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    ) as HTMLMetaElement | null;
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    /* ── og:description ── */
    let ogDesc = document.querySelector(
      'meta[property="og:description"]'
    ) as HTMLMetaElement | null;
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = desc;

    /* ── og:image (optional) ── */
    if (ogImage) {
      let ogImg = document.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement | null;
      if (!ogImg) {
        ogImg = document.createElement("meta");
        ogImg.setAttribute("property", "og:image");
        document.head.appendChild(ogImg);
      }
      ogImg.content = ogImage;
    }

    /* ── cleanup on unmount ── */
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = DEFAULT_DESCRIPTION;
      if (canon) canon.href = `${BASE_URL}/`;
      if (ogUrl) ogUrl.content = `${BASE_URL}/`;
      if (ogTitle) ogTitle.content = DEFAULT_TITLE;
      if (ogDesc) ogDesc.content = DEFAULT_DESCRIPTION;
    };
  }, [title, description, path, ogImage]);
}
