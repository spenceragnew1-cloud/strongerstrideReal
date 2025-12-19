type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/Logo_SS.png"
              alt="Stronger Stride Logo"
              className="h-12 w-auto"
            />
            <span className="text-xl font-semibold text-slate-900">Stronger Stride</span>
          </a>

          <nav className="flex items-center gap-8">
            <a
              href="/assessment"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('assessment');
              }}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'assessment'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Free Assessment
            </a>

            <a
              href="/programs"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('programs');
              }}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'programs'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Programs
            </a>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('blog');
              }}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Blog
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
