import { useState, useEffect } from 'react';
import { FastForward } from 'lucide-react';

export default function Typewriter({ content, speed = 30 }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayedContent('');
    setIsFinished(false);
    
    const interval = setInterval(() => {
      setDisplayedContent(content.slice(0, i + 1));
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed]);

  const skipAnimation = () => {
    setDisplayedContent(content);
    setIsFinished(true);
  };

  return (
    <div className="relative">
      <div className="whitespace-pre-wrap font-handwriting text-[1.35rem] md:text-2xl leading-[1.6] md:leading-relaxed text-stone-800 dark:text-stone-200">
        {displayedContent}
      </div>
      
      {!isFinished && (
        <button
          onClick={skipAnimation}
          className="absolute -top-12 right-0 flex items-center gap-1 text-xs md:text-sm text-stone-400 hover:text-rose-500 font-sans border border-stone-200 dark:border-stone-700 px-3 py-1 rounded-full bg-white/50 dark:bg-black/50"
        >
          <FastForward size={14} /> Skip
        </button>
      )}
    </div>
  );
}
