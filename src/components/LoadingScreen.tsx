import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ 
            fontSize: 'clamp(5rem, 20vw, 15rem)', 
            fontWeight: 900,
            fontFamily: 'var(--font-main)',
            lineHeight: 1
          }}
        >
          {count}%
        </motion.div>
        
        {/* Progress Bar */}
        <div style={{ width: '300px', height: '2px', background: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            style={{ height: '100%', background: 'var(--text-primary)' }}
          />
        </div>
        
        <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>
          Initializing Premium Experience
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
