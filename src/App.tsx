import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Programs from './pages/Programs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AssessmentResults from './pages/AssessmentResults';
import Admin from './pages/Admin';
import About from './pages/About';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'admin' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('');
  const [assessmentId, setAssessmentId] = useState<string>('');

  const handleURLChange = () => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (path === '/' || path === '') {
      setCurrentPage('home');
    } else if (path === '/assessment') {
      setCurrentPage('assessment');
    } else if (path === '/programs') {
      setCurrentPage('programs');
    } else if (path === '/blog') {
      setCurrentPage('blog');
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      setCurrentPage('blog-post');
      setSelectedBlogSlug(slug);
    } else if (path === '/results') {
      setCurrentPage('results');
      const aId = params.get('assessment_id');
      if (aId) setAssessmentId(aId);
    } else if (path === '/admin') {
      setCurrentPage('admin');
    } else if (path === '/about') {
      setCurrentPage('about');
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleURLChange();

    window.addEventListener('popstate', handleURLChange);

    return () => {
      window.removeEventListener('popstate', handleURLChange);
    };
  }, []);

  const handleNavigate = (page: Page, options?: { slug?: string; assessmentId?: string }) => {
    setCurrentPage(page);
    if (options?.slug) setSelectedBlogSlug(options.slug);
    if (options?.assessmentId) setAssessmentId(options.assessmentId);

    let url = '/';
    if (page === 'home') url = '/';
    else if (page === 'assessment') url = '/assessment';
    else if (page === 'programs') url = '/programs';
    else if (page === 'blog') url = '/blog';
    else if (page === 'blog-post' && options?.slug) url = `/blog/${options.slug}`;
    else if (page === 'results' && options?.assessmentId) url = `/results?assessment_id=${options.assessmentId}`;
    else if (page === 'admin') url = '/admin';
    else if (page === 'about') url = '/about';

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
        {currentPage === 'admin' && <Admin onNavigate={handleNavigate} />}
        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
      </main>
    </div>
  );
}

export default App;
