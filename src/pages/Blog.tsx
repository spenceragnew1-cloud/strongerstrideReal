import { useEffect, useState } from 'react';
import { supabase, BlogPost } from '../lib/supabase';
import { ArrowRight, Calendar } from 'lucide-react';
import MetaTags from '../components/MetaTags';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface BlogProps {
  onNavigate: (page: Page, options?: { slug?: string }) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error loading blog posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title="Running Strength & Training Blog | StrongerStride"
        description="Evidence-based insights on injury prevention, training strategies, and runner health. Learn from research-backed articles on strength training for runners."
        canonical="https://strongerstride.com/blog"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Running Strength & Training Blog
          </h1>
          <p className="text-lg text-slate-600">
            Evidence-based insights on injury prevention, training strategies, and runner health
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-slate-600 mb-6">
              Blog posts coming soon! Check back for evidence-based training content.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-slate-200"
              >
                <div className="flex flex-col md:flex-row">
                  {post.featured_image_url && (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                    />
                  )}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Unpublished'}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{post.title}</h2>
                      <p className="text-slate-600 mb-3">{post.excerpt}</p>
                      {post.seo_keywords && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.seo_keywords.split(',').map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                            >
                              {keyword.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onNavigate('blog-post', { slug: post.slug })}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors w-fit"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
