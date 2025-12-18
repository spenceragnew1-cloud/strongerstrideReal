type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <img
                src="/Logo_SS.png"
                alt="StrongerStride Logo"
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-lg font-semibold">StrongerStride</span>
            </button>
            <p className="text-slate-400 text-sm">
              Evidence-based strength training for runners. Created by a Doctor of Physical Therapy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Free Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  About Dr. Agnew
                </button>
              </li>
              <li>
                <a
                  href="https://ascentendurancegroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Ascent Endurance Group
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Connect
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Questions about strength training for runners?
            </p>
            <button
              onClick={() => onNavigate('assessment')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Start Free Assessment
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} StrongerStride. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => onNavigate('about')}
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                About
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Blog
              </button>
              <button
                onClick={() => onNavigate('assessment')}
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

