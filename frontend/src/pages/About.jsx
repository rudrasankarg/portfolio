import React from 'react';

function About() {
  return (
    <section id="about" className="fade-in" style={{ scrollMarginTop: '8rem' }}>
      <div className="section-header">
        <span className="section-number">01. ABOUT ME</span>
        <h1 className="section-title">Designing the Digital Interface</h1>
        <p className="section-subtitle">A glimpse into my background, academic path, and the tools I use to build systems.</p>
      </div>

      <div className="about-grid">
        {/* Bio and Education Timeline */}
        <div>
          <div className="bio-text">
            <p style={{ marginBottom: '1.5rem' }}>
              I am a second-year Computer Science and Engineering undergraduate student at VIT-AP University. 
              My interests lie at the intersection of software engineering, web application architecture, and 
              applied computing research.
            </p>
            <p>
              I spend my time reconstructing real-world applications to master frontend layout and backend infrastructure, 
              as well as writing research initiatives like IoT-based biomedical systems. I focus on developing clean, 
              responsive interfaces with highly modular code structures.
            </p>
            <div className="about-socials" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <a href="mailto:rudrasankarg@gmail.com" className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zM16 4.697v7.104l-5.803-3.558z"/>
                </svg>
                Email
              </a>
              <a href="https://github.com/rudrasankarg" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rudra-sankar-ghosh-dastidar-5a0263326/" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 4.148 2.4 4.859c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>Education</h3>
          <div className="education-timeline">
            <div className="timeline-item">
              <span className="timeline-date">2024 – Present</span>
              <h4 className="timeline-title">B.Tech in Computer Science and Engineering</h4>
              <p className="timeline-institution">VIT-AP University, Amaravati, Andhra Pradesh</p>
              <p className="timeline-desc">CGPA: 9.00 / 10.00</p>
            </div>
            
            <div className="timeline-item">
              <span className="timeline-date">2016 – 2024</span>
              <h4 className="timeline-title">Higher Secondary Education</h4>
              <p className="timeline-institution">South Point High School, Kolkata, India (CBSE)</p>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '2rem', fontFamily: 'var(--font-title)', fontWeight: 700, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Technical Toolbox</h3>
          
          <div className="skills-container">
            <div className="skills-category">
              <h4 className="skills-category-title">Languages</h4>
              <div className="skills-tags">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">HTML & CSS</span>
              </div>
            </div>

            <div className="skills-category">
              <h4 className="skills-category-title">Libraries & Frameworks</h4>
              <div className="skills-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
              </div>
            </div>

            <div className="skills-category">
              <h4 className="skills-category-title">Databases & Tools</h4>
              <div className="skills-tags">
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Git & GitHub</span>
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">WebRTC</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">MATLAB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hobbies & Other Activities */}
        <div className="hobbies-section">
          <h3 style={{ marginBottom: '2rem', fontFamily: 'var(--font-title)', fontWeight: 700, textAlign: 'center' }}>Beyond the Code</h3>
          <div className="hobbies-grid">
            <div className="glass-card">
              <div style={{ fontSize: '2.2rem', color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.895 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/>
                  <path fillRule="evenodd" d="M14 11V2h1v9zM6 3l9-2v1l-9 2z"/>
                </svg>
              </div>
              <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, marginBottom: '0.5rem' }}>BONGOJO Music Lead</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Lead the state of West Bengal for the State Rally event at the university's cultural fest. Coordinate music performances, direct theatre events, and manage creative activities.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ fontSize: '2.2rem', color: 'var(--color-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                </svg>
              </div>
              <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, marginBottom: '0.5rem' }}>Entrepreneurship Club</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Active member of the Documentation Team. Responsible for drafting event reports, project proposals, and maintaining detailed logs of club activities.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ fontSize: '2.2rem', color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h-1zm1.5 1.5h-1v1h1zm-1.5 1.5h1v1h-1zm3-1.5h-1v1h1z"/>
                  <path d="M3.5 6h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m0 3h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1"/>
                  <path d="M6 3.5c0 1.29-.69 2.42-1.71 3-.1-.58-.4-1.1-.86-1.49.5-.47.82-1.13.82-1.87A2.5 2.5 0 0 0 1.75 1C.78 1 0 1.78 0 2.75A2.75 2.75 0 0 0 2.75 5.5c.34 0 .67-.06.97-.17a4 4 0 0 1 4.57.17H6v-2zm-3 1a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5"/>
                </svg>
              </div>
              <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, marginBottom: '0.5rem' }}>Interests & Lifestyles</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Enthusiastic about sports, music production, and exploring new hardware technologies. Fluent in English and Bengali, intermediate in Hindi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
