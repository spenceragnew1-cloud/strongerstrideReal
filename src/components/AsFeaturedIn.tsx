/**
 * As Featured In Component
 * 
 * Displays media features and recognition for authority/trust building.
 * Uses clean, semantic HTML with accessible markup.
 */

export default function AsFeaturedIn() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200" aria-label="Media features and recognition">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Spencer Agnew has been featured and quoted in{' '}
            <a
              href="https://www.runnersworld.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-semibold underline"
            >
              Runner's World
            </a>
            {' '}and leading outdoor publications for his expertise in running biomechanics and performance.
          </p>
        </div>
      </div>
    </section>
  );
}

