import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { config } from '../data/config';
import { Heart } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      navigate('/contents');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, rotateY: -90, x: -100 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="preserve-3d perspective-1000"
          >
            <div className="w-80 sm:w-96 h-[32rem] sm:h-[36rem] bg-gradient-to-br from-rose-400 to-pink-500 rounded-r-3xl rounded-l-md shadow-2xl relative flex flex-col items-center justify-center p-8 border-l-8 border-rose-800 book-shadow">
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 text-3xl animate-bloom">🌸</div>
              <div className="absolute top-4 right-4 text-3xl animate-bloom" style={{animationDelay: '0.2s'}}>🌹</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-bloom" style={{animationDelay: '0.4s'}}>🌺</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-bloom" style={{animationDelay: '0.6s'}}>🌷</div>

              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 mt-12"
              >
                <Heart fill="currentColor" className="w-16 h-16 text-white opacity-80" />
              </motion.div>

              <h1 className="text-5xl sm:text-6xl text-white font-elegant text-center drop-shadow-lg mb-4">
                {config.bookTitle}
              </h1>
              
              <p className="text-white/80 font-handwriting text-3xl mb-12 text-center">
                For {config.herName}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="mt-auto bg-white/20 backdrop-blur-md border border-white/40 text-white font-sans px-8 py-3 rounded-full hover:bg-white/30 transition-colors shadow-lg flex items-center gap-2 mb-4"
              >
                Open the Book 💌
              </motion.button>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
