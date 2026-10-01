import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { config } from '../data/config';
import { useNavigate } from 'react-router-dom';

export default function PasswordGate({ children, onUnlock }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Every time we refresh, if we are not unlocked and there is a password, we redirect to home
    if (config.password && !isUnlocked) {
      navigate('/');
    }
  }, []);

  if (!config.password || isUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === config.password.toLowerCase()) {
      setIsUnlocked(true);
      if (onUnlock) onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 dark:bg-stone-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-xl border border-rose-100 dark:border-rose-900/50 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 to-pink-400" />
        
        <Lock className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h2 className="text-2xl font-elegant text-rose-600 dark:text-rose-400 mb-2 text-4xl">Welcome, {config.herName}</h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 font-sans">
          This book is just for you. Enter the secret code to open it.
        </p>

        <form onSubmit={handleSubmit}>
          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors font-sans
                ${error ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-rose-200 focus:border-rose-400 dark:border-stone-700 dark:bg-stone-900'}
                dark:text-white`}
              placeholder="Enter password..."
            />
          </motion.div>
          {error && <p className="text-red-500 text-sm mt-2 font-medium">Oops, that's not it baby! 🥺</p>}
          <p className="text-xs text-stone-400 mt-3">{config.passwordHint}</p>
          
          <button 
            type="submit"
            className="w-full mt-6 bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Unlock My Heart 💖
          </button>
        </form>
      </motion.div>
    </div>
  );
}
