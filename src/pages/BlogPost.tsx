import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';
import MetaTags from '../components/MetaTags';
import { generateArticleSchema, generateBreadcrumbSchema, getBlogSpecificSchemas } from '../lib/schema';
import { trackAssessmentButtonClick } from '../lib/analytics';
import { getPostBySlug, getRelatedPosts, BlogPost } from '../data/blog-posts';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface BlogPostProps {
  slug: string;
  onNavigate: (page: Page, options?: { slug?: string }) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostProps) {
  // Get post from local data (no async needed)
  const post: BlogPost | undefined = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  const handleAssessmentClick = () => {
    trackAssessmentButtonClick(`blog-post-${slug}`);
    onNavigate('assessment');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </button>
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-slate-600 mb-6">Post not found.</p>
            <button
              onClick={() => onNavigate('blog')}
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const authorName = post.author_name || post.author || 'StrongerStride Team';
  const publishedDate = post.published_at ? new Date(post.published_at) : null;
  const updatedDate = post.updated_at ? new Date(post.updated_at) : publishedDate;
  const canonicalUrl = `https://strongerstride.com/blog/${post.slug}`;
  const imageUrl = post.featured_image_url || 'https://strongerstride.com/logo.png';
  const shareUrl = `https://strongerstride.com/blog/${slug}`;

  const handleShare = (platform: string) => {
    const title = post?.title || '';
    const text = post?.excerpt || '';

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`
    };

    if (platform in urls) {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  // Generate schemas
  const schemas = [
    generateArticleSchema({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      authorName: authorName,
      authorBio: post.author_bio || '',
      publishedAt: publishedDate?.toISOString() || '',
      updatedAt: updatedDate?.toISOString(),
      featuredImageUrl: imageUrl,
      featuredImageAlt: post.featured_image_alt || post.title,
      metaDescription: post.meta_description || post.excerpt || '',
      keywords: post.seo_keywords || '',
    }),
    generateBreadcrumbSchema(post.title, post.slug),
    ...getBlogSpecificSchemas(post.slug),
  ];

  // Format title with site name
  const pageTitle = post.meta_title || post.title;
  const fullTitle = pageTitle.includes('|') ? pageTitle : `${pageTitle} | StrongerStride`;
  const metaDescription = post.meta_description || post.excerpt || '';

  return (
    <>
      <MetaTags
        title={fullTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        image={imageUrl}
        imageAlt={post.featured_image_alt || post.title}
        publishedTime={publishedDate?.toISOString()}
        modifiedTime={updatedDate?.toISOString()}
        author={authorName}
        keywords={post.seo_keywords || undefined}
        type="article"
      />
      <SchemaMarkup schemas={schemas} />
      <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gradient-to-br from-green-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </button>
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt || post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-900">{authorName}</span>
          </div>
          {post.reading_time && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <span>{post.reading_time}</span>
            </div>
          )}
          {publishedDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <time dateTime={publishedDate.toISOString()}>
                {publishedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}
        </div>

        {/* Share Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Share:</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('email')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-700 hover:text-white text-slate-600 transition-colors"
                aria-label="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Assessment Callout */}
        <div className="mb-8 bg-gradient-to-br from-green-50 to-slate-50 border-l-4 border-green-600 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Discover Your Running Strength Profile</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Before diving into this article, consider taking our free runner strength assessment. In just 10 minutes, you'll identify your specific weaknesses and receive personalized recommendations to help you run stronger and stay injury-free.
              </p>
              <button
                onClick={handleAssessmentClick}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Take the Free Assessment →
              </button>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-green-600 hover:prose-a:text-green-700">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Next Steps - Internal Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Take Your Next Step</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/assessment"
              onClick={(e) => {
                e.preventDefault();
                handleAssessmentClick();
              }}
              className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow text-left group block"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                Free Runner Strength Assessment →
              </h4>
              <p className="text-slate-600 text-sm">
                Identify your specific weaknesses in 10 minutes and get personalized recommendations.
              </p>
            </a>
            <a
              href="/programs"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('programs');
              }}
              className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow text-left group block"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                Strength Programs for Runners →
              </h4>
              <p className="text-slate-600 text-sm">
                Evidence-based 12-week strength programs designed specifically for runners.
              </p>
            </a>
          </div>
        </div>

        {/* Research Sources */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Research & Further Reading</h3>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <p className="text-slate-600 text-sm mb-3">
              The recommendations in this article are based on peer-reviewed research:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6315473/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Strength training for runners: scientific basis and practical recommendations (NCBI)
                </a>
              </li>
              <li>
                <a
                  href="https://bjsm.bmj.com/content/48/11/871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Effects of strength training on running economy (British Journal of Sports Medicine)
                </a>
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/24100287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Injury prevention programs reduce injury risk in runners (PubMed)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((relatedPost) => (
              <a
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blog-post', { slug: relatedPost.slug });
                }}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow text-left group block"
              >
                <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors text-sm">
                  {relatedPost.title.length > 60 ? relatedPost.title.substring(0, 60) + '...' : relatedPost.title} →
                </h4>
                <p className="text-slate-500 text-xs">
                  {relatedPost.excerpt ? relatedPost.excerpt.substring(0, 80) + '...' : ''}
                </p>
              </a>
            ))}
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('blog');
              }}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow text-left group block"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors text-sm">
                View All Articles →
              </h4>
              <p className="text-slate-500 text-xs">
                Browse our complete library of evidence-based running content.
              </p>
            </a>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-3">About the Author</h3>
          <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6">
            <p className="text-slate-700 leading-relaxed">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Dr. Spencer Agnew, DPT
              </a>
              {' '}is a Doctor of Physical Therapy specializing in running biomechanics and performance. He is the creator of{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Stronger Stride
              </a>
              {' '}and founder of{' '}
              <a 
                href="https://ascentendurancegroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Ascent Endurance Group
              </a>
              .
            </p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Want to Know If This Applies to You?</h2>
          <p className="text-green-50 mb-6 text-lg leading-relaxed">
            Take our free strength assessment to identify your specific weaknesses and get personalized recommendations. In just 10 minutes, you'll discover which areas need attention to help you run stronger and stay injury-free.
          </p>
          <button
            onClick={handleAssessmentClick}
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
          >
            Take the Free Assessment →
          </button>
        </div>

      </article>
    </div>
    </>
  );
}
