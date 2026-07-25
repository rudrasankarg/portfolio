import React from 'react';

function Experience() {
  return (
    <section id="experience" className="fade-in" style={{ scrollMarginTop: '8rem' }}>
      <div className="section-header">
        <span className="section-number">03. EXPERIENCE</span>
        <h1 className="section-title">Research & Academic History</h1>
        <p className="section-subtitle">A summary of my academic achievements, published papers, and certifications.</p>
      </div>

      {/* Publication Section */}
      <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-title)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="bi bi-book" style={{ color: 'var(--color-primary)' }}></i> Academic Publications
      </h2>
      
      <div className="glass-card publication-card">
        <span className="publication-journal">STAPS Journal — Paper STAPS-3761 F, 2025</span>
        <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3 }}>
          Heart Abnormality Detection System Using Arduino-Based ECG Monitoring
        </h3>
        <p className="publication-authors">
          Rudra Sankar Ghosh Dastidar, Amar Sankar Maitra, Shubham Kumar, Srijan Ghosh, Tanish Chauhan, Shikhar Dwivedi.
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Published academic research describing a low-cost, portable electrocardiogram (ECG) acquisition setup. 
          The system extracts vital PQRST wave signals using Arduino UNO and passes the digitized data to a 
          neural network model (TensorFlow Lite) to classify beats into normal or abnormal cardiac profiles in real-time.
        </p>
        <a href="https://drive.google.com/file/d/1ZQLLqvIugWzZLVaY16ZUDjCt7QS5AyzN/view" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.8rem', fontSize: '0.9rem' }}>
          <i className="bi bi-file-earmark-pdf"></i> Read Full Publication
        </a>
      </div>

      {/* Coursework Section */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="bi bi-award" style={{ color: 'var(--color-secondary)' }}></i> Relevant Coursework
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Acquired core concepts under my B.Tech Computer Science and Engineering track:</p>
        
        <div className="coursework-grid">
          <div className="course-item">Data Structures & Algorithms</div>
          <div className="course-item">Object-Oriented Programming</div>
          <div className="course-item">Database Management (DBMS)</div>
          <div className="course-item">Software Engineering</div>
          <div className="course-item">Discrete Mathematics</div>
          <div className="course-item">Digital Logic & Design</div>
          <div className="course-item">Computer Architecture</div>
          <div className="course-item">Machine Learning & AI</div>
        </div>
      </div>

      {/* Certifications Section */}
      <div style={{ marginTop: '5rem' }}>
        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-title)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="bi bi-patch-check" style={{ color: 'var(--color-primary)' }}></i> Certifications
        </h2>
        
        <div className="certifications-grid">
          {/* Cert 1 */}
          <div className="glass-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase' }}>DeepLearning.AI</span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0' }}>Machine Learning Specialization</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Completed coursework on Coursera encompassing supervised learning (regression, classification), 
              neural networks, clustering, recommender systems, and practical machine learning workflows.
            </p>
          </div>

          {/* Cert 2 */}
          <div className="glass-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Wadhwani Foundation</span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0' }}>Entrepreneurship Program</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Acquired certification detailing innovative execution, developing startup roadmaps, understanding user personas, 
              and refining entrepreneurial pitch models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
