import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/projects', '/ai', '/message', '/design'];
  return [...paths, ...projects.map(project => `/projects/${project.id}`)]
    .map(path => ({ url: new URL(path, SITE_URL).href }));
}
