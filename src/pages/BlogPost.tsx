import { useEffect, useState } from 'react';
import { supabase, BlogPost } from '../lib/supabase';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface BlogPostProps {
  slug: string;
  onNavigate: (page: Page) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } else if (!data) {
        setNotFound(true);
      } else {
        setPost(data);

        // Set page title and meta description for SEO
        if (data.meta_title) {
          document.title = data.meta_title;
        }
        if (data.meta_description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.meta_description);
        }
      }
      setLoading(false);
    };

    loadPost();

    // Reset title on unmount
    return () => {
      document.title = 'StrongerStride - Strength Training for Runners';
    };
  }, [slug]);

  const shareUrl = `https://strongerstride.com/blog/${slug}`;

  const handleShare = (platform: string) => {
    const title = post?.title || '';
    const text = post?.excerpt || '';

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`
    };

    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
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

  if (!post) return null;

  const authorName = post.author_name || post.author || 'StrongerStride Team';
  const publishedDate = post.published_at ? new Date(post.published_at) : null;

  console.log('Post content first 200 chars:', post.content.substring(0, 200));
  console.log('Content type:', typeof post.content);

  return (
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

        {/* Article Body */}
        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-green-600 hover:prose-a:text-green-700">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author Bio */}
        {post.author_bio && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-3">About the Author</h3>
            <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6">
              <p className="text-slate-700 leading-relaxed">{post.author_bio}</p>
            </div>
          </div>
        )}

        {/* CTA Box */}
        <div className="mt-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Want to Find Your Specific Weaknesses?</h2>
          <p className="text-green-50 mb-6 text-lg leading-relaxed">
            Take our free 10-minute strength assessment to identify which areas are putting you at risk for IT band syndrome and other running injuries. You'll get your personalized score and specific recommendations for where to focus your training.
          </p>
          <button
            onClick={() => onNavigate('assessment')}
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
          >
            Take the Free Assessment →
          </button>
        </div>

        {/* Related Articles Placeholder */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Why Hip Strength Matters More Than You Think</h4>
              <p className="text-sm text-slate-600">Coming soon...</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Should Runners Lift Weights? What Research Says</h4>
              <p className="text-sm text-slate-600">Coming soon...</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">The 10-Minute Assessment for Runners</h4>
              <p className="text-sm text-slate-600">Coming soon...</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
