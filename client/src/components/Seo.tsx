import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { getRouteMeta, siteDescription, siteTitle } from "@/routes";
import { absoluteAssetUrl, canonicalUrl } from "@/lib/site";

/**
 * Renders the per-route <title>, description, canonical and social tags.
 *
 * The same tags are emitted by the pre-render step at build time, so crawlers
 * see them in the served HTML without running any JavaScript; this component
 * keeps them correct during client-side navigation.
 */
export function Seo() {
  const [path] = useLocation();
  const meta = getRouteMeta(path);

  if (!meta) {
    return (
      <Helmet>
        <title>Page Not Found | ALL Seasons Golf Carts</title>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    );
  }

  const url = canonicalUrl(meta.path);
  const image = absoluteAssetUrl(meta.image);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={meta.ogType} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ALL Seasons Golf Carts" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
