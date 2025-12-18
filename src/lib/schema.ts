// Schema.org structured data generators for SEO

export interface BlogPostSchemaData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorBio: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  metaDescription: string;
  keywords?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

const SITE_URL = 'https://strongerstride.com';
const ORGANIZATION_NAME = 'StrongerStride';
const ORGANIZATION_LOGO = `${SITE_URL}/logo.png`;

export function generateArticleSchema(data: BlogPostSchemaData) {
  const wordCount = data.content.split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.metaDescription,
    image: data.featuredImageUrl || `${SITE_URL}/logo.png`,
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
    author: {
      '@type': 'Person',
      name: data.authorName,
      description: data.authorBio,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${data.slug}`,
    },
    articleBody: data.content.replace(/<[^>]*>/g, ''),
    wordCount: wordCount,
    keywords: data.keywords || '',
  };
}

export function generateBreadcrumbSchema(title: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Spencer Agnew',
    jobTitle: 'Doctor of Physical Therapy',
    description: 'Dr. Spencer Agnew is a Doctor of Physical Therapy specializing in running biomechanics and performance. He has worked with over 500 runners as both a physical therapist and coach, helping them overcome injuries and achieve their performance goals.',
    url: `${SITE_URL}/about`,
    sameAs: [
      'https://ascentendurancegroup.com',
      // Add social media profiles here when available (LinkedIn, Instagram, etc.)
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'StrongerStride',
      url: SITE_URL,
    },
    affiliation: {
      '@type': 'Organization',
      name: 'Ascent Endurance Group',
      url: 'https://ascentendurancegroup.com',
    },
    knowsAbout: [
      'Running Biomechanics',
      'Physical Therapy',
      'Strength Training for Runners',
      'Injury Prevention',
      'Sports Rehabilitation',
    ],
  };
}

// Specific FAQ data for the heavy weights blog post
export const HEAVY_WEIGHTS_FAQS: FAQItem[] = [
  {
    question: 'How do I know what weight to use?',
    answer: 'Start with a weight where you can complete the prescribed reps with 1-3 reps left in reserve. If the program calls for 5 reps, you should feel like you could do 6-8 reps if you had to. Add 5-10 pounds when you can complete all sets with good form and 1-2 reps in reserve.',
  },
  {
    question: 'What if I\'ve never lifted before?',
    answer: 'Start with a 4-week "preparation phase" using lighter weights (60-70% 1-RM) and higher reps (10-12) to learn movement patterns. Then transition to heavy loads. Consider 1-2 sessions with a qualified strength coach to learn proper form on the basic lifts.',
  },
  {
    question: 'Can I do this during race season?',
    answer: 'Yes, but modify: reduce frequency to 1x per week during peak racing, keep loads heavy but reduce total volume by 25-30%, don\'t lift within 5-7 days of A-priority races, and maintain strength during base/build phases with 2x per week.',
  },
  {
    question: 'What about injury risk?',
    answer: 'Heavy strength training actually REDUCES injury risk by approximately 50% compared to runners who don\'t strength train. The key is: learn proper form first, progress gradually, use appropriate safety equipment, and listen to your body.',
  },
  {
    question: 'I\'m a masters runner (40+). Does this still apply?',
    answer: 'Yes! In fact, strength training may be EVEN MORE important for masters runners because age-related muscle loss begins around age 30, tendon stiffness decreases with age, and injury risk increases with age. You may need slightly longer recovery between sessions (48-72 hours instead of 48), but the programming is the same.',
  },
];

// Specific How-To steps for the heavy weights blog post
export const HEAVY_WEIGHTS_HOWTO: HowToStep[] = [
  {
    name: 'Get assessed',
    text: 'Know your specific weaknesses - weak calves, hip instability, or poor mobility. Take the StrongerStride assessment to identify your deficits.',
  },
  {
    name: 'Choose a program',
    text: 'Select an evidence-based program with proper heavy loading parameters (80-90% 1-RM, 3-6 reps per set).',
  },
  {
    name: 'Learn the lifts',
    text: 'Master the fundamental movement patterns: squat, deadlift, split squat, and calf raise. Consider working with a qualified coach for 1-2 sessions.',
  },
  {
    name: 'Start conservative',
    text: 'Week 1 should feel easier than you expect. Begin with lighter loads to learn proper form and build a foundation.',
  },
  {
    name: 'Progress gradually',
    text: 'Add weight when you can complete all sets with 1-2 reps in reserve. Typical progression is 5-10 pounds per session for lower body lifts.',
  },
  {
    name: 'Give it time',
    text: 'Expect to see measurable results in 6-12 weeks. Neural adaptations come first (2-4 weeks), followed by strength gains (6-8 weeks), and performance improvements (8-12 weeks).',
  },
];

// Get schema data for specific blog posts
export function getBlogSpecificSchemas(slug: string) {
  const schemas: Record<string, unknown>[] = [];

  switch (slug) {
    case 'heavy-weights-vs-high-reps-for-runners':
      schemas.push(generateFAQSchema(HEAVY_WEIGHTS_FAQS));
      schemas.push(generateHowToSchema(
        'How to Start Heavy Lifting for Runners',
        'A step-by-step guide to implementing heavy strength training for improved running performance',
        HEAVY_WEIGHTS_HOWTO
      ));
      break;

    case 'it-band-syndrome-runners-hip-strength':
      // IT Band post already has FAQ schema - will add if needed
      break;

    case 'hip-strength-running-performance':
      // Can add specific schemas for hip strength post
      break;

    case 'calf-strength-distance-runners':
      // Can add specific schemas for calf strength post
      break;
  }

  return schemas;
}
