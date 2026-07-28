import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

function PageWrapper({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
      {children}
    </div>
  );
}

function MainLayout() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Custom Cursor Refs
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const followerCoords = useRef({ x: 0, y: 0 });

  // Scroll to section helper
  const scrollToSection = (id) => {
    setNavActive(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Handle Scroll Header background toggle and section observation
  useEffect(() => {
    const handleScroll = () => {
      // Toggle header bg
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section based on scroll offset
      const sections = ['about', 'projects', 'experience', 'contact'];
      let currentSection = 'home';
      
      const scrollPosition = window.scrollY + 250; // offset threshold (header height + margin)
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            currentSection = id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle Custom Cursor Coordinates
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Follower smooth animations
    let animationFrameId;
    const animateFollower = () => {
      const ease = 0.15;
      followerCoords.current.x += (mouseCoords.current.x - followerCoords.current.x) * ease;
      followerCoords.current.y += (mouseCoords.current.y - followerCoords.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerCoords.current.x}px`;
        followerRef.current.style.top = `${followerCoords.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Set Hover effects on interactive elements
  useEffect(() => {
    const addHover = () => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.classList.add('hovered');
        followerRef.current.classList.add('hovered');
      }
    };

    const removeHover = () => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.classList.remove('hovered');
        followerRef.current.classList.remove('hovered');
      }
    };

    const setupListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .filter-btn, .skill-tag');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    const timer = setTimeout(setupListeners, 100);

    return () => {
      clearTimeout(timer);
      const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .filter-btn, .skill-tag');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [activeSection]); // Re-setup listeners on section changes to ensure dynamically loaded list items are registered

  return (
    <div className={navActive ? 'nav-active' : ''}>
      {/* Background decorations */}
      <div className="background-grid"></div>
      <div className="background-glow"></div>
      <div className="background-glow-secondary"></div>

      {/* Custom Cursor Followers */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-follower" ref={followerRef}></div>

      {/* Header Navigation */}
      <header className={scrolled ? 'scrolled' : ''}>
        <Link to="/" onClick={() => scrollToSection('home')} className="logo">
          <span>RUDRA</span> SANKAR
        </Link>
        
        <button 
          className="nav-toggle" 
          aria-label="Toggle navigation"
          onClick={() => setNavActive(!navActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', listStyle: 'none', gap: '2rem', margin: 0, padding: 0 }}>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setNavActive(false)}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setNavActive(false)}>About</Link>
            </li>
            <li>
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''} onClick={() => setNavActive(false)}>Projects</Link>
            </li>
            <li>
              <Link to="/experience" className={location.pathname === '/experience' ? 'active' : ''} onClick={() => setNavActive(false)}>Experience</Link>
            </li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-resume" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'var(--transition-fast)' }}>
              Resume
            </a>
            <Link to="/contact" className="btn-contact" onClick={() => setNavActive(false)}>Get In Touch</Link>
          </div>
        </nav>
      </header>

      {/* Main Single Page View */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-socials" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <a href="https://github.com/rudrasankarg" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/rudrasgd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 4.148 2.4 4.859c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
          </a>
          <a href="mailto:rudrasankarg@gmail.com" aria-label="Email" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zM16 4.697v7.104l-5.803-3.558z"/>
            </svg>
          </a>
        </div>
        <p>&copy; 2026 Rudra Sankar Ghosh Dastidar. Crafted with precision.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
