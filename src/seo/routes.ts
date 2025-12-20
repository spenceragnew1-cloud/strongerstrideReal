// src/seo/routes.ts
export interface RouteConfig {
  path: string;
  title: string;
  description: string;
}

export const staticRoutes: RouteConfig[] = [
  {
    path: '/',
    title: 'StrongerStride - Strength Training for Runners',
    description: 'Take a 10-minute, research-based assessment to discover which weaknesses are affecting your running—and get a personalized 12-week program to fix them.',
  },
  {
    path: '/assessment',
    title: 'Free Running Strength Assessment | StrongerStride',
    description: 'Take our free 10-minute movement assessment to identify your specific weaknesses and get personalized strength training recommendations.',
  },
  {
    path: '/programs',
    title: 'Strength Programs for Runners | StrongerStride',
    description: 'Evidence-based 12-week strength programs designed to target specific deficits and improve your running performance and injury resilience.',
  },
  {
    path: '/blog',
    title: 'Running Strength & Training Blog | StrongerStride',
    description: 'Evidence-based insights on injury prevention, training strategies, and runner health.',
  },
];

// Blog post routes will be added at build time
export interface BlogPostRoute extends RouteConfig {
  slug: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
}

export type AllRoutes = (RouteConfig | BlogPostRoute)[];

