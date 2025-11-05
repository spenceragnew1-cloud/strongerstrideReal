import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Programs from './pages/Programs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AssessmentResults from './pages/AssessmentResults';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('');
  const [assessmentId, setAssessmentId] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') as Page;
    const slug = params.get('slug');
    const aId = params.get('assessment_id');

    if (page && ['home', 'assessment', 'programs', 'blog', 'blog-post', 'results'].includes(page)) {
      setCurrentPage(page);
    }
    if (slug) setSelectedBlogSlug(slug);
    if (aId) setAssessmentId(aId);
  }, []);

  const handleNavigate = (page: Page, options?: { slug?: string; assessmentId?: string }) => {
    setCurrentPage(page);
    if (options?.slug) setSelectedBlogSlug(options.slug);
    if (options?.assessmentId) setAssessmentId(options.assessmentId);

    const url = `/?page=${page}${options?.slug ? `&slug=${options.slug}` : ''}${options?.assessmentId ? `&assessment_id=${options.assessmentId}` : ''}`;
    window.history.pushState({}, '', url);

    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-PPM0SYFPKH', {
        page_path: url,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'assessment' && <Assessment onNavigate={handleNavigate} />}
        {currentPage === 'programs' && <Programs onNavigate={handleNavigate} />}
        {currentPage === 'blog' && <Blog onNavigate={handleNavigate} />}
        {currentPage === 'blog-post' && <BlogPost slug={selectedBlogSlug} onNavigate={handleNavigate} />}
        {currentPage === 'results' && assessmentId && <AssessmentResults assessmentId={assessmentId} onNavigate={handleNavigate} />}
      </main>
    </div>
  );
}

export default App;
