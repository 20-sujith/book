import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { openWhenEnvelopes } from '../data/milestones';
import { Mail, MailOpen, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OpenWhen() {
  const [openedId, setOpenedId] = useState(null);

  const handleOpen = (id) => {
    setOpenedId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185']
    });
  };

  return (
    <div className="min-h-screen p-6 pt-20 pb-24 z-10 relative max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-elegant text-rose-600 dark:text-rose-400 mb-2">Open When...</h1>
        <p className="font-handwriting text-2xl text-stone-600 dark:text-stone-400">
          Letters for every moment you need me.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {openWhenEnvelopes.map((env) => (
          <motion.div
            key={env.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpen(env.id)}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-br from-rose-100 to-rose-200 dark:from-stone-700 dark:to-stone-800 p-6 rounded-xl shadow-md border-2 border-rose-300 dark:border-stone-600 relative overflow-hidden flex flex-col items-center justify-center text-center aspect-[4/3]">
              {/* Envelope flap decor */}
              <div className="absolute top-0 w-0 h-0 border-l-[100px] border-r-[100px] border-t-[80px] border-l-transparent border-r-transparent border-t-rose-300/30 dark:border-t-stone-900/30"></div>
              
              <Mail className="w-12 h-12 text-rose-500 mb-3" />
              <h3 className="font-sans font-semibold text-stone-800 dark:text-stone-200 text-lg px-4 z-10">
                {env.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-paper-light dark:bg-stone-800 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full relative"
            >
              <button 
                onClick={() => setOpenedId(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-rose-500"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-6">
                <MailOpen className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                <h2 className="text-3xl font-elegant text-rose-600 dark:text-rose-400 mb-6">
                  {openWhenEnvelopes.find(e => e.id === openedId).title}
                </h2>
              </div>
              
              <div className="font-handwriting text-2xl text-stone-700 dark:text-stone-300 leading-relaxed text-center">
                {openWhenEnvelopes.find(e => e.id === openedId).content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
