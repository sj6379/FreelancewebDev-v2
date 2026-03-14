import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from './Reveal';

const projects = [
  {
    title: 'ONYX COFFEE',
    type: 'Luxury E-commerce',
    tags: ['Next.js', 'Framer Motion', 'Webgl'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'PULSE DASH',
    type: 'FinTech Dashboard',
    tags: ['React', 'TypeScript', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'ECHOES ARCH',
    type: 'Architecture Portfolio',
    tags: ['Three.js', 'GSAP', 'Vite'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'VANTAGE UI',
    type: 'Design System',
    tags: ['Tailwind', 'Storybook', 'React'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
  },
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        gridColumn: '1 / -1',
        marginBottom: '4rem',
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
    >
      <motion.div 
        className="glass" 
        style={{ 
          borderRadius: '16px', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          style={{ 
            width: '100%', 
            height: 'clamp(300px, 50vw, 600px)', 
            borderRadius: '12px', 
            overflow: 'hidden',
            marginBottom: '2rem',
            position: 'relative',
            backgroundColor: '#eee'
          }}
        >
          <motion.img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.75rem' }}>{project.type}</div>
            <Reveal>
              <h3 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em' }}>{project.title}</h3>
            </Reveal>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.tags.map((tag: string) => (
              <span 
                key={tag} 
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--accent)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '4px', 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="work" className="section" style={{ position: 'relative' }}>
      {/* Background Watermark */}
      <div className="watermark" style={{ top: '0', right: '-10%', transform: 'rotate(90deg)', transformOrigin: 'right top', opacity: 0.02 }}>
        SELECTED WORKS
      </div>

      <div className="grid-layout">
        <div style={{ gridColumn: '1 / -1', marginBottom: 'clamp(4rem, 12vw, 8rem)' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', lineHeight: 0.8 }}>SELECTED<br />WORKS</h2>
          </Reveal>
        </div>
        
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
