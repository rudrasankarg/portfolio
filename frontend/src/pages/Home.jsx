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
      <section id="home" className="hero-section fade-in" style={{ position: 'relative', paddingBottom: '10rem' }}>
        <div className="status-badge">
          <i className="bi bi-circle-fill" style={{ fontSize: '8px', verticalAlign: 'middle', marginRight: '6px', animation: 'blink 1.5s infinite' }}></i>
          Open for Opportunities
        </div>
        
        <h1 className="hero-title">
          Software Engineering.<br />
          <span>Full-Stack & IoT.</span>
        </h1>
        
        <p className="hero-subtitle">
          Hi, I'm Rudra Sankar Ghosh Dastidar. A third-year Computer Science undergrad @ VIT-AP, 
          passionate about full-stack web development, IoT research, and machine learning innovation.
        </p>
        
        <div className="hero-cta" style={{ zIndex: 10, position: 'relative', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => scrollToSection('projects')} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
            Explore My Work
          </button>
          <button onClick={() => scrollToSection('about')} className="btn-secondary" style={{ cursor: 'pointer' }}>
            More About Me
          </button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
            </svg>
            Download Resume
          </a>
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
