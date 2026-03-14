import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';
import { Reveal } from './Reveal';
import Magnetic from './Magnetic';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/sj6379' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-jacob-80ba9b34b/' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/samueljacob887/' },
  ];

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="section" 
      style={{ 
        paddingBottom: 'clamp(8rem, 15vw, 12rem)', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Watermark */}
      <motion.div 
        className="watermark"
        style={{ 
          bottom: '10%',
          right: '0',
          x,
          opacity: 0.03
        }}
      >
        CONNECT-CONNECT
      </motion.div>

      <div className="grid-layout">
        <div style={{ gridColumn: '1 / -1', marginBottom: 'clamp(4rem, 8vw, 6rem)', zIndex: 10 }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(3rem, 10vw, 12rem)', lineHeight: 0.8 }}>LET'S<br />CREATE</h2>
          </Reveal>
        </div>

        <div style={{ gridColumn: '1 / -1', zIndex: 10 }}>
          <Reveal width="100%">
            <a 
              href="mailto:samueljacob637@gmail.com" 
              aria-label="Send an email to samueljacob637@gmail.com"
              style={{ 
                fontSize: 'clamp(1.5rem, 6vw, 6rem)', 
                fontWeight: 900, 
                textDecoration: 'none', 
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                wordBreak: 'break-all',
                lineHeight: 1
              }}
              className="focus-visible:ring-4 focus-visible:ring-accent-yellow outline-none rounded-lg"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-yellow)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              samueljacob637@gmail.com
              <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24" strokeWidth={3} />
            </a>
          </Reveal>
        </div>

        <div 
          style={{ 
            gridColumn: '1 / -1', 
            marginTop: 'clamp(4rem, 10vw, 8rem)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            zIndex: 10
          }}
        >
          {socialLinks.map((social) => (
            <Magnetic key={social.label}>
              <motion.a
                href={social.href}
                aria-label={`Open ${social.label} profile`}
                className="glass focus-visible:ring-4 focus-visible:ring-accent-yellow outline-none"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 800,
                  fontSize: '1.25rem'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: 'var(--text-primary)', 
                  color: 'white',
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <social.icon size={24} />
                  {social.label}
                </div>
                <ArrowUpRight size={24} />
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <div 
          style={{ 
            gridColumn: '1 / -1', 
            marginTop: 'clamp(8rem, 20vw, 12rem)', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1.5rem',
            opacity: 0.3, 
            fontSize: '0.875rem', 
            fontWeight: 800,
            zIndex: 10
          }}
          className="md:flex-row md:justify-between"
        >
          <div>© 2026 FREELANCE WEB DEV. ALL RIGHTS RESERVED.</div>
          <div className="md:text-right">India Based / Remote</div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:flex-row { flex-direction: row; }
          .md\\:justify-between { justify-content: space-between; }
          .md\\:text-right { text-align: right; }
          .md\\:w-24 { width: 6rem; }
          .md\\:h-24 { height: 6rem; }
        }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
      `}</style>
    </section>
  );
};

export default Contact;
