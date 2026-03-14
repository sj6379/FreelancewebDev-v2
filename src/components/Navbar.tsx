import { motion } from 'framer-motion';
import { Home, Briefcase, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';
import { FreelanceLogo } from './Logo';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('#hero');
  
  const navItems = [
    { label: 'Home', icon: Home, href: '#hero' },
    { label: 'Work', icon: Briefcase, href: '#work' },
    { label: 'Connect', icon: Mail, href: '#contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['hero', 'work', 'contact'];
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="pill-nav glass"
      initial={{ y: 100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ delay: 1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0 0.5rem' }}>
        <Magnetic>
          <a href="#hero" className="flex items-center" aria-label="Go to home">
            <FreelanceLogo size={32} />
          </a>
        </Magnetic>
        <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 0.5rem' }} />
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Magnetic key={item.label}>
              <a
                href={item.href}
                aria-label={`Navigate to ${item.label}`}
                className={`flex items-center gap-2 text-xs md:text-sm font-black uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none ${
                  activeItem === item.href ? 'text-accent-yellow scale-110' : 'hover:opacity-70'
                }`}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: activeItem === item.href ? 'rgba(0,0,0,0.05)' : 'transparent'
                }}
              >
                <item.icon size={16} />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
