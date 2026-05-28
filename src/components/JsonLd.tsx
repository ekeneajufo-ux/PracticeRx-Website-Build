import { useEffect } from "react";

/**
 * Injects a JSON-LD structured data script into <head>.
 * Cleans up on unmount so SPA route changes don't stack schemas.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return null;
}
