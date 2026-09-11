import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/services/infrastructure',
    '/services/auditing',
    '/services/governance',
    '/services/strategy',
    '/services/competitions',
    '/services/project-management',
    '/expert-network',
    '/expert-network/apply',
    '/insights',
    '/partner-with-us',
    '/discuss-a-project',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/insights' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.8 : 0.7,
  }));
}
