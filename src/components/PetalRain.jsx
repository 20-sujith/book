import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PetalRain() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const emojis = ['🌸', '🌹', '🌷', '✨'];
    const generatePetals = () => {
      const newPetals = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        size: 1 + Math.random() * 1.5,
      }));
      setPetals(newPetals);
    };
    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '100vh',
            x: Math.random() * 100 - 50,
            opacity: [0, 0.8, 0.8, 0],
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ left: `${p.left}%`, fontSize: `${p.size}rem` }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
