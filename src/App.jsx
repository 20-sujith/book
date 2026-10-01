import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Moon, Sun, Heart, Music, VolumeX } from 'lucide-react';
import { config } from './data/config';

import Home from './pages/Home';
import Contents from './pages/Contents';
import BookReader from './pages/BookReader';
import OpenWhen from './pages/OpenWhen';

import PasswordGate from './components/PasswordGate';
import SparkleTrail from './components/SparkleTrail';
import PetalRain from './components/PetalRain';
import FloatingHearts from './components/FloatingHearts';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [isPlaying, setIsPlaying] = useState(!config.password);
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser. Play on first interaction.
          const startPlay = () => {
            if (isPlaying) audio.play().catch(e => console.log("Audio play error:", e));
            document.removeEventListener('click', startPlay);
          };
          document.addEventListener('click', startPlay);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, location.pathname]); // Re-trigger check if needed

  const toggleMusic = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <audio ref={audioRef} src={config.backgroundMusic} loop />
      <SparkleTrail />
      <PetalRain />
      <FloatingHearts />
      
      {/* Navigation / Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button 
          onClick={toggleMusic}
          className="p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-md text-rose-500 hover:scale-110 transition-transform"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
      
      {/* Bottom Nav for mobile friendly access */}
      {location.pathname !== '/' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-2 px-6 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg border border-rose-100 dark:border-rose-900">
          <button onClick={() => navigate('/contents')} className="text-stone-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 text-sm font-medium">Chapters</button>
          <button onClick={() => navigate('/open-when')} className="text-stone-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 text-sm font-medium">Open When</button>
        </div>
      )}

      <PasswordGate onUnlock={() => setIsPlaying(true)}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/read" element={<BookReader />} />
            <Route path="/open-when" element={<OpenWhen />} />
          </Routes>
        </AnimatePresence>
      </PasswordGate>
    </div>
  );
}

export default App;
