import { useRef, useEffect, useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { letters } from '../data/letters';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import confetti from 'canvas-confetti';
import Typewriter from '../components/Typewriter';

const Page = forwardRef((props, ref) => {
  return (
    <div className="demoPage bg-paper-light dark:bg-stone-800 border-r border-rose-100 dark:border-stone-900 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.05)] overflow-hidden relative p-4 sm:p-8" ref={ref} data-density="soft">
      {/* Decorative vines/flowers */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="absolute top-2 left-2 text-2xl">🌹</div>
      <div className="absolute bottom-2 right-2 text-2xl">🌿</div>
      <div className="h-full overflow-y-auto pr-2 pb-10 hide-scrollbar relative z-10 flex flex-col">
        {props.children}
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center text-rose-300 font-sans text-xs">
        - {props.number} -
      </div>
    </div>
  );
});

export default function BookReader() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookRef = useRef();
  const mobileBookRef = useRef();
  const [readProgress, setReadProgress] = useLocalStorage('readLetters', []);
  const [notes, setNotes] = useLocalStorage('letterNotes', {});
  const [activeNoteLetter, setActiveNoteLetter] = useState(null);
  const [noteText, setNoteText] = useState("");
  const startPage = location.state?.startPage || 0;

  const handleFlip = (e) => {
    // Desktop layout has 2 pages per letter plus 2 cover pages.
    // e.data is current page index
    let letterIndex = Math.floor((e.data - 2) / 2);
    if (window.innerWidth < 768) {
       letterIndex = e.data; // Mobile has 1 page per letter
    }

    if (letters[letterIndex]) {
      const id = letters[letterIndex].id;
      if (!readProgress.includes(id)) {
        setReadProgress([...readProgress, id]);
        
        if (letterIndex === letters.length - 1) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#f472b6', '#fb7185', '#fda4af', '#fff1f2']
          });
        }
      }
    }
  };

  const saveNote = (id) => {
    setNotes({ ...notes, [id]: noteText });
    setActiveNoteLetter(null);
  };

  const openNote = (id) => {
    setActiveNoteLetter(id);
    setNoteText(notes[id] || "");
  };

  // Prepare pages array for desktop
  const desktopPages = [
    <Page number={0} key="cover-1">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-6xl font-elegant text-rose-600 dark:text-rose-400 mb-6 mt-12">My Love Letters</h1>
        <p className="font-handwriting text-2xl text-stone-600 dark:text-stone-400">Open your heart</p>
      </div>
    </Page>,
    <Page number={1} key="cover-2">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="font-handwriting text-2xl text-stone-500">A collection of moments, thoughts, and infinite love.</p>
      </div>
    </Page>
  ];

  letters.forEach((letter, i) => {
    desktopPages.push(
      <Page number={i*2 + 2} key={`title-${letter.id}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <span className="text-4xl">{letter.emoji}</span>
            <div className="flex gap-2">
              <button onClick={() => openNote(letter.id)} className="p-2 text-stone-400 hover:text-rose-400 hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </button>
            </div>
          </div>
          <h2 className="text-4xl font-elegant text-rose-600 dark:text-rose-400 mb-8">{letter.title}</h2>
          
          {activeNoteLetter === letter.id ? (
            <div className="flex-1 flex flex-col bg-rose-50 dark:bg-stone-700/50 rounded-xl p-4 border border-rose-200 dark:border-rose-900/50">
              <h3 className="font-sans text-sm font-semibold text-rose-500 mb-2">Your Note:</h3>
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 w-full bg-transparent border-none outline-none resize-none font-handwriting text-xl text-stone-700 dark:text-stone-300"
                placeholder="Write your thoughts here baby..."
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setActiveNoteLetter(null)} className="px-3 py-1 text-sm text-stone-500 font-sans">Cancel</button>
                <button onClick={() => saveNote(letter.id)} className="px-3 py-1 text-sm bg-rose-400 text-white rounded-lg font-sans">Save Note</button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center opacity-50">
              <p className="font-handwriting text-2xl text-stone-400 text-center px-8">
                Turn the page to read my heart...
              </p>
            </div>
          )}
        </div>
      </Page>
    );
    desktopPages.push(
      <Page number={i*2 + 3} key={`content-${letter.id}`}>
        <div className="h-full relative">
          <Typewriter content={letter.content} speed={20} />
        </div>
        {i === letters.length - 1 && (
          <div className="mt-12 text-center pb-8">
            <p className="font-elegant text-4xl text-rose-500">Forever Yours 💞</p>
          </div>
        )}
      </Page>
    );
  });

  desktopPages.push(
    <Page number={letters.length * 2 + 2} key="end-1">
      <div className="flex items-center justify-center h-full">
        <p className="font-elegant text-3xl text-rose-400">The End... for now.</p>
      </div>
    </Page>,
    <Page number={letters.length * 2 + 3} key="end-2">
      <div className="bg-rose-50 dark:bg-stone-800 h-full"></div>
    </Page>
  );

  // Mobile pages
  const mobilePages = letters.map((letter, i) => {
    return (
      <Page number={i + 1} key={`mobile-${letter.id}`}>
        <div className="flex flex-col h-full relative">
          <div className="flex justify-between items-start mb-4">
            <span className="text-3xl">{letter.emoji}</span>
          </div>
          <h2 className="text-3xl font-elegant text-rose-600 dark:text-rose-400 mb-4">{letter.title}</h2>
          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            <div className="relative mt-8">
              <Typewriter content={letter.content} speed={20} />
            </div>
            {i === letters.length - 1 && (
              <div className="mt-8 text-center pb-8">
                <p className="font-elegant text-4xl text-rose-500">Forever Yours 💞</p>
              </div>
            )}
          </div>
        </div>
      </Page>
    );
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 pt-16 z-10 relative overflow-hidden"
    >
      <button 
        onClick={() => navigate('/contents')}
        className="absolute top-6 left-6 z-50 p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-md text-rose-500 hover:scale-110 transition-transform"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Desktop Book */}
      <div className="hidden md:flex items-center justify-center w-full h-[85vh] relative">
        <button 
          onClick={() => bookRef.current?.pageFlip().flipPrev()} 
          className="absolute left-8 lg:left-16 z-50 px-4 py-3 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md text-rose-500 hover:scale-105 transition-transform flex items-center gap-2 font-medium"
        >
          <ChevronLeft size={24} />
          Previous
        </button>

        <HTMLFlipBook 
          width={450} 
          height={650} 
          size="stretch"
          minWidth={350}
          maxWidth={500}
          minHeight={400}
          maxHeight={750}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={handleFlip}
          className="book-shadow"
          startPage={startPage}
          useMouseEvents={false}
          ref={bookRef}
        >
          {desktopPages}
        </HTMLFlipBook>

        <button 
          onClick={() => bookRef.current?.pageFlip().flipNext()} 
          className="absolute right-8 lg:right-16 z-50 px-4 py-3 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md text-rose-500 hover:scale-105 transition-transform flex items-center gap-2 font-medium"
        >
          Next
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile Book */}
      <div className="md:hidden flex flex-col items-center justify-center w-full h-[80vh] relative">
         <HTMLFlipBook 
          width={window.innerWidth - 32} 
          height={window.innerHeight - 160} 
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={800}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-shadow mx-auto"
          startPage={Math.max(0, Math.floor((startPage - 2) / 2))}
          useMouseEvents={false}
          ref={mobileBookRef}
        >
          {mobilePages}
        </HTMLFlipBook>

        <div className="flex justify-between w-full max-w-[500px] px-4 mt-6 z-50">
          <button 
            onClick={() => mobileBookRef.current?.pageFlip().flipPrev()}
            className="px-5 py-3 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-md shadow-lg text-rose-500 hover:scale-105 transition-transform flex items-center gap-2 font-medium border border-rose-100 dark:border-stone-700"
          >
            <ChevronLeft size={24} />
            Previous
          </button>
          <button 
            onClick={() => mobileBookRef.current?.pageFlip().flipNext()}
            className="px-5 py-3 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-md shadow-lg text-rose-500 hover:scale-105 transition-transform flex items-center gap-2 font-medium border border-rose-100 dark:border-stone-700"
          >
            Next
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
