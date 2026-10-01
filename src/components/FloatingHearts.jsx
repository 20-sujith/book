import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const emojis = ['💖', '💕', '💗', '💓'];
    const generateHearts = () => {
      const newHearts = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        size: 1 + Math.random() * 1.5,
      }));
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: '100vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: -50,
            x: Math.random() * 100 - 50,
            opacity: [0, 0.6, 0.6, 0],
            rotate: Math.random() > 0.5 ? 45 : -45,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ left: `${h.left}%`, fontSize: `${h.size}rem` }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}
