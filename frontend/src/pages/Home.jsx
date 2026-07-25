import React from 'react';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';

function Home() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="hero-section fade-in" style={{ position: 'relative', paddingBottom: '6rem' }}>
        <div className="status-badge">
          <i className="bi bi-circle-fill" style={{ fontSize: '8px', verticalAlign: 'middle', marginRight: '6px', animation: 'blink 1.5s infinite' }}></i>
          Open for Opportunities
        </div>
        
        <h1 className="hero-title">
          Secure Systems.<br />
          <span>Scalable AI.</span>
        </h1>
        
        <p className="hero-subtitle">
          Hi, I'm Rudra Sankar Ghosh Dastidar. A second-year Computer Science undergrad @ VIT-AP, 
          passionate about full-stack web development, IoT research, and machine learning innovation.
        </p>
        
        <div className="hero-cta" style={{ zIndex: 10, position: 'relative' }}>
          <button onClick={() => scrollToSection('projects')} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
            Explore My Work
          </button>
          <button onClick={() => scrollToSection('about')} className="btn-secondary" style={{ cursor: 'pointer' }}>
            More About Me
          </button>
        </div>
        
        <div className="scroll-indicator" onClick={() => scrollToSection('about')} style={{ cursor: 'pointer', zIndex: 10 }}>
          <span>Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Embedded sections for smooth scrolling */}
      <About />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}

export default Home;
