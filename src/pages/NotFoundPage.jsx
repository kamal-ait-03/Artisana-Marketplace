import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="bg-[var(--color-bg)] min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="relative mb-8">
        {/* Moroccan themed 404 illustration text */}
        <h1 className="font-heading text-[150px] md:text-[200px] font-bold text-[var(--color-primary)] opacity-20 leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-6xl">🐪</span>
        </div>
      </div>
      
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
        Oops! You got lost in the souk.
      </h2>

      <p className="text-gray-600 font-body max-w-md mx-auto mb-8">
        The page you are looking for seems to be missing. It might have been moved or never existed.
      </p>

      <Link
        to="/"
        className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#6b3510] transition-colors shadow-warm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
