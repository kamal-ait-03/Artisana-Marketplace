import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show the button if we've scrolled a bit
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        // Optional: keep it visible but maybe faded or pointing down
        setIsVisible(true); 
      }

      // Check if we are near the bottom to flip direction
      if (scrollY + windowHeight > documentHeight - 100) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAction = () => {
    if (window.scrollY > 300) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleAction}
      className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[60] p-0 rounded-2xl bg-[#00B4D8] text-white shadow-[0_10px_40px_rgba(0,180,216,0.3)] border-2 border-white transition-all duration-700 hover:scale-110 active:scale-95 group ${
        window.scrollY > 100 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-0'
      }`}
      aria-label="Scroll Up or Down"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center relative overflow-hidden">
        {/* Rotating Artisana Logo */}
        <div className={`transition-all duration-700 transform ${window.scrollY > 300 ? 'rotate-0' : 'rotate-180'}`}>
          <svg width="28" height="28" viewBox="0 0 60 60" fill="currentColor">
              <path d="M30 0l15 15-15 15-15-15L30 0z M30 30l15 15-15 15-15-15L30 30z M0 30l15-15 15 15-15 15L0 30z M60 30l-15-15-15 15 15 15 15-15z" />
          </svg>
        </div>

        {/* Hover Arrow Layer */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          {window.scrollY > 300 ? (
            <ChevronUp size={32} className="text-white drop-shadow-md animate-bounce" />
          ) : (
            <ChevronDown size={32} className="text-white drop-shadow-md animate-bounce" />
          )}
        </div>
      </div>
    </button>
  );
};

export default BackToTop;
