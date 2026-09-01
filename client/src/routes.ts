import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blogPosts";
import xt4Image from "@assets/EVOLUTION_D-MAX_XT4_RED_1768250430375.png";
import xt6Image from "@assets/EVOLUTION_D-MAX_XT6_RED_1768250430374.png";

export interface RouteMeta {
  /** Path as mounted by the router, always starting with "/". */
  path: string;
  title: string;
  description: string;
  /** Bundled or public image used for og:image / twitter:image. */
  image: string;
  ogType: "website" | "article";
  /** Sitemap hints. */
  priority: string;
  changefreq: string;
  lastmod?: string;
}

const DEFAULT_IMAGE = "/og-image.png";

export const siteTitle =
  "ALL Seasons Golf Carts | Premium 4X4 Electric Golf Carts - EVolution D-MAX XT4 & XT6";

export const siteDescription =
  "Discover ALL Seasons Golf Carts featuring EVolution D-MAX XT4 and XT6 models. Premium 4X4 electric golf carts built for Winter, Spring, Summer, and Fall. Dual-motor 4WD, street-legal capability, and luxury features.";

const corePages: RouteMeta[] = [
  {
    path: "/",
    title: siteTitle,
    description: siteDescription,
    image: DEFAULT_IMAGE,
    ogType: "website",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/evolution-d-max-xt4",
    title:
      "EVolution D-MAX XT4 | 4-Passenger 4X4 Electric Golf Cart | ALL Seasons Golf Carts",
    description:
      "The EVolution D-MAX XT4 is a 4-passenger 4X4 electric golf cart with dual 6.3kW AC motors, on-demand 4WD, a 10.1-inch touchscreen with Apple CarPlay and Android Auto, and street-legal LSV options.",
    image: xt4Image,
    ogType: "website",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/evolution-d-max-xt6",
    title:
      "EVolution D-MAX XT6 | 6-Passenger 4X4 Electric Golf Cart | ALL Seasons Golf Carts",
    description:
      "The EVolution D-MAX XT6 is a 6-passenger 4X4 electric golf cart with a selectable 4x2/4x4 drive system, dual 6.3kW AC motors, a 10.1-inch touchscreen with Apple CarPlay and Android Auto, and street-legal LSV options.",
    image: xt6Image,
    ogType: "website",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/financing",
    title:
      "All Seasons Golf Cart Financing | 0% Financing Available | ALL Seasons Golf Carts",
    description:
      "0% financing on ALL Seasons Golf Carts. Multiple financing options including no credit impact prequalification, rent-to-own, and business financing. Get your EVolution D-MAX 4X4 golf cart today.",
    image: DEFAULT_IMAGE,
    ogType: "website",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "Contact ALL Seasons Golf Carts | Test Drives & Nationwide Delivery",
    description:
      "Contact ALL Seasons Golf Carts about the EVolution D-MAX XT4 and XT6 4X4 electric golf carts. Schedule a test drive, ask about nationwide delivery, or call (844) 884-6744.",
    image: DEFAULT_IMAGE,
    ogType: "website",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/blog",
    title:
      "Blog | All Seasons Golf Carts - 4WD Electric Golf Cart News & Guides",
    description:
      "Explore the All Seasons Golf Carts blog for expert guides on 4WD electric golf carts, seasonal driving tips, off-road adventures, and EVolution D-MAX XT4 & XT6 insights.",
    image: DEFAULT_IMAGE,
    ogType: "website",
    priority: "0.8",
    changefreq: "weekly",
  },
];

const blogRoutes: RouteMeta[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: post.seoTitle,
  description: post.metaDescription,
  image: post.heroImage,
  ogType: "article" as const,
  priority: "0.7",
  changefreq: "monthly",
  lastmod: post.publishDate,
}));

const locationRoutes: RouteMeta[] = locations.map((loc) => ({
  path: `/${loc.slug}`,
  title: `All Seasons Golf Cart in ${loc.name} | EVolution D-MAX 4X4`,
  description: `Premium 4X4 electric golf carts available in ${loc.name}. EVolution D-MAX XT4 and XT6 with dual-motor all-season capability, street-legal LSV options. Call (844) 884-6744.`,
  image: DEFAULT_IMAGE,
  ogType: "website" as const,
  priority: "0.6",
  changefreq: "monthly",
}));

/** Every route that gets its own pre-rendered HTML file and sitemap entry. */
export const routes: RouteMeta[] = [
  ...corePages,
  ...blogRoutes,
  ...locationRoutes,
];

const routesByPath = new Map(routes.map((route) => [route.path, route]));

export function getRouteMeta(path: string): RouteMeta | undefined {
  const normalized =
    path.length > 1 ? path.replace(/\/+$/, "") || "/" : path || "/";
  return routesByPath.get(normalized);
}
