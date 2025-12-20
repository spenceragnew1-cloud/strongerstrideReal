import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine currentPage from pathname
  const getCurrentPage = (): string => {
    if (currentPath === '/') return 'home';
    if (currentPath === '/assessment') return 'assessment';
    if (currentPath === '/programs') return 'programs';
    if (currentPath === '/blog') return 'blog';
    if (currentPath.startsWith('/blog/')) return 'blog-post';
    if (currentPath === '/results') return 'results';
    if (currentPath === '/admin') return 'admin';
    return 'home';
  };

  const currentPage = getCurrentPage();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/Logo_SS.png"
              alt="Stronger Stride Logo"
              className="h-12 w-auto"
            />
            <span className="text-xl font-semibold text-slate-900">Stronger Stride</span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              to="/assessment"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'assessment'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Free Assessment
            </Link>

            <Link
              to="/programs"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'programs'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Programs
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
