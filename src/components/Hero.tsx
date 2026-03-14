import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from './Reveal';
import Magnetic from './Magnetic';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="section" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Parallax Watermark */}
      <motion.div 
        className="watermark"
        style={{ 
          top: '10%',
          left: '5%',
          y: y1,
        }}
      >
        FWD-26
      </motion.div>

      <div className="grid-layout">
        <div style={{ gridColumn: '1 / -1', zIndex: 10 }}>
          <Reveal width="100%">
            <h1 style={{ fontSize: 'clamp(3.5rem, 15vw, 18rem)', lineHeight: 0.8, color: 'var(--text-primary)' }}>
              Freelance<br />WebDev
            </h1>
          </Reveal>
        </div>
      </div>

      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          padding: '2rem var(--container-padding)',
          marginTop: '2rem',
          zIndex: 20
        }}
        className="md:absolute md:inset-0 md:pointer-events-none md:p-0 md:m-0"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          style={{ textAlign: 'left', y: y2 }}
          className="md:absolute md:top-8 md:right-[var(--container-padding)] md:text-right"
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5 }}>STATUS</div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>AVAILABLE FOR HIRE</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7 }}
          style={{ textAlign: 'left', y: y2 }}
          className="md:absolute md:bottom-32 md:left-[var(--container-padding)]"
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5 }}>LOCATION</div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>India Based / Remote</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          style={{ maxWidth: '300px', textAlign: 'left', y: y2 }}
          className="md:absolute md:bottom-32 md:right-[var(--container-padding)] md:pointer-events-auto"
        >
          <Reveal>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 500, lineHeight: 1.4, marginBottom: '2rem' }}>
              Crafting high-end digital experiences with a focus on motion and visual excellence.
            </p>
          </Reveal>
          
          <Magnetic>
            <button 
              className="brutalist-button"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Work <ArrowDown size={20} />
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:absolute { position: absolute; }
          .md\\:inset-0 { inset: 0; }
          .md\\:pointer-events-none { pointer-events: none; }
          .md\\:pointer-events-auto { pointer-events: auto; }
          .md\\:top-8 { top: 2rem; }
          .md\\:bottom-32 { bottom: 8rem; }
          .md\\:left-\\[var\\(--container-padding\\)\\] { left: var(--container-padding); }
          .md\\:right-\\[var\\(--container-padding\\)\\] { right: var(--container-padding); }
          .md\\:text-right { text-align: right; }
          .md\\:p-0 { padding: 0; }
          .md\\:m-0 { margin: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
