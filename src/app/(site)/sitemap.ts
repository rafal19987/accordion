import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000';

const staticRoutes: string[] = ['/'];

function generateStaticRoutesSitemap() {
  return staticRoutes.map((route) => ({
    url: BASE_URL + route,
    lastModifed: new Date(),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutesSitemap = generateStaticRoutesSitemap();

  return [...publicRoutesSitemap];
}
