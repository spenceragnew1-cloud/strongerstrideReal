type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Stronger Stride" className="h-10 w-10" />
            <span className="text-xl font-semibold text-slate-900">Stronger Stride</span>
          </button>

          <nav className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('assessment')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'assessment'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Free Assessment
            </button>

            <button
              onClick={() => onNavigate('programs')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'programs'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Programs
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'text-green-500'
                  : 'text-slate-700 hover:text-green-500'
              }`}
            >
              Blog
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
