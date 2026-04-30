import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = "https://test-siap-kerja.vercel.app";
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

export default function PageMeta({ title, description, canonicalPath, schema }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: `${SITE_URL}${canonicalPath}` });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: OG_IMAGE_URL });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: OG_IMAGE_URL });

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${canonicalPath}`;

    const schemaId = "page-json-ld";
    const previous = document.getElementById(schemaId);
    if (previous) previous.remove();

    if (schema) {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const injectedSchema = document.getElementById(schemaId);
      if (injectedSchema) {
        injectedSchema.remove();
      }
    };
  }, [canonicalPath, description, schema, title]);

  return null;
}
