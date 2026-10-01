import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { letters } from '../data/letters';
import { Lock, Heart, BookOpen } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Contents() {
  const navigate = useNavigate();
  const [readProgress] = useLocalStorage('readLetters', []);
  
  const handleOpenLetter = (index) => {
    navigate('/read', { state: { startPage: index * 2 + 2 } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-6 pt-20 pb-24 z-10 relative max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-5xl font-elegant text-rose-500 mb-2">Chapters of Us</h1>
        <p className="font-handwriting text-2xl text-stone-600 dark:text-stone-400">
          You have read {readProgress.length} of {letters.length} letters 💖
        </p>
        <div className="w-full bg-rose-100 dark:bg-stone-800 h-2 rounded-full mt-4 max-w-xs mx-auto">
          <div 
            className="bg-rose-400 h-full rounded-full transition-all duration-1000"
            style={{ width: `${(readProgress.length / letters.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {letters.map((letter, i) => {
          const isRead = readProgress.includes(letter.id);

          return (
            <motion.div 
              key={letter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenLetter(i)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between bg-white dark:bg-stone-800 border-rose-100 dark:border-rose-900 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-700`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-stone-700 flex items-center justify-center text-2xl">
                  {letter.emoji}
                </div>
                <div>
                  <h3 className={`font-sans font-semibold text-lg text-stone-800 dark:text-stone-200`}>
                    {letter.title}
                  </h3>
                </div>
              </div>
              {isRead && <Heart className="text-rose-300 mr-2" size={20} fill="currentColor" />}
              {!isRead && <BookOpen className="text-rose-200 mr-2" size={20} />}
            </motion.div>
          );
        })}

        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/open-when')}
          className="p-4 rounded-2xl border-2 border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-stone-800 transition-all cursor-pointer flex items-center justify-center mt-8 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💌</span>
            <h3 className="font-sans font-bold text-lg text-rose-600 dark:text-rose-400">
              "Open When..." Letters
            </h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
