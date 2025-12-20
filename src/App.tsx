import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Programs from './pages/Programs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AssessmentResults from './pages/AssessmentResults';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();

  // Track page views for analytics
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-PPM0SYFPKH', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/results" element={<AssessmentResults />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
