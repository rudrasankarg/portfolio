import React, { useState, useEffect } from 'react';

function Projects({ showAll = false }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProjectImage = (title) => {
    const t = title.toLowerCase();
    if (t.includes('lifeonline') || t.includes('healthcare')) return '/images/lifeonline.png';
    if (t.includes('hackforge') || t.includes('hackathon')) return '/images/hackforge.png';
    if (t.includes('nexabank') || t.includes('banking')) return '/images/nexabank.png';
    if (t.includes('heart') || t.includes('ecg')) return '/images/heartguard.png';
    return '';
  };

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then(data => {
        let activeProjects;
        if (showAll) {
          activeProjects = data; // Show all including clones on Projects page
        } else {
          activeProjects = data.filter(p => p.category !== 'clones'); // Hide clones on Home page
        }
        setProjects(activeProjects);
        setFilteredProjects(activeProjects);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [showAll]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  }, [filter, projects]);

  return (
    <section id="projects" className="fade-in" style={{ scrollMarginTop: '8rem' }}>
      <div className="section-header">
        <span className="section-number">02. PORTFOLIO</span>
        <h1 className="section-title">{showAll ? 'All Projects' : 'Featured Projects'}</h1>
        <p className="section-subtitle">
          {showAll 
            ? 'A complete collection of my full-stack systems, research experiments, and interface recreations.' 
            : 'A collection of full-stack systems, research experiments, and interface recreations.'}
        </p>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>Full-Stack</button>
        <button className={`filter-btn ${filter === 'ai-iot' ? 'active' : ''}`} onClick={() => setFilter('ai-iot')}>AI & IoT</button>
        {showAll && (
          <button className={`filter-btn ${filter === 'clones' ? 'active' : ''}`} onClick={() => setFilter('clones')}>Clones</button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <div className="status-badge" style={{ display: 'inline-block' }}>Loading projects...</div>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b6b' }}>
          <p>Error loading projects: {error}</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => {
            const imgUrl = getProjectImage(project.title);
            return (
              <div key={project._id} className="project-card-container">
                <div className="glass-card project-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {imgUrl && (
                    <div className="project-card-image-container" style={{ width: '100%', height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                      <img src={imgUrl} alt={project.title} className="project-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      <div className="project-links">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Source">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                            </svg>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="External Link">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    
                    {project.bulletPoints && project.bulletPoints.length > 0 && (
                      <ul className="project-bullet-list" style={{ flexGrow: 1 }}>
                        {project.bulletPoints.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-tech">
                      {project.techStack && project.techStack.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Projects;
