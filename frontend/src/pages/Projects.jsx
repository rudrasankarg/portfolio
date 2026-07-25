import React, { useState, useEffect } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
        <h1 className="section-title">Featured Projects</h1>
        <p className="section-subtitle">A collection of full-stack systems, research experiments, and interface recreations.</p>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>Full-Stack</button>
        <button className={`filter-btn ${filter === 'ai-iot' ? 'active' : ''}`} onClick={() => setFilter('ai-iot')}>AI & IoT</button>
        <button className={`filter-btn ${filter === 'clones' ? 'active' : ''}`} onClick={() => setFilter('clones')}>Clones</button>
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
          {filteredProjects.map(project => (
            <div key={project._id} className="project-card-container">
              <div className="glass-card project-card">
                <div className="project-meta">
                  <span className="project-year">{project.year}</span>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Source">
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="External Link">
                        <i className="bi bi-journal-text"></i>
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                {project.bulletPoints && project.bulletPoints.length > 0 && (
                  <ul className="project-bullet-list">
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
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
