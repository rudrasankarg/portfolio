import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Projects({ showAll = false }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const getProjectImage = (title) => {
    const t = title.toLowerCase();
    if (t.includes('lifeonline') || t.includes('healthcare')) return '/images/lifeonline.png';
    if (t.includes('hackforge') || t.includes('hackathon')) return '/images/hackforge.png';
    if (t.includes('nexabank') || t.includes('banking')) return '/images/nexabank.png';
    if (t.includes('heart') || t.includes('ecg')) return '/images/heartguard.png';
    if (t.includes('youtube')) return '/images/youtube.png';
    if (t.includes('amazon')) return '/images/amazon.png';
    return '';
  };

  const getProjectScreenshots = (title) => {
    const t = title.toLowerCase();
    if (t.includes('lifeonline') || t.includes('healthcare')) {
      return ['/images/lifeonline.png', '/images/lifeonline-1.png', '/images/lifeonline-2.png'];
    }
    if (t.includes('hackforge') || t.includes('hackathon')) {
      return ['/images/hackforge.png', '/images/hackforge-1.png', '/images/hackforge-2.png'];
    }
    if (t.includes('nexabank') || t.includes('banking')) {
      return ['/images/nexabank.png', '/images/nexabank-1.png', '/images/nexabank-2.png'];
    }
    if (t.includes('heart') || t.includes('ecg')) {
      return ['/images/heartguard.png', '/images/heartguard-1.png', '/images/heartguard-2.png'];
    }
    if (t.includes('youtube')) {
      return ['/images/youtube.png'];
    }
    if (t.includes('amazon')) {
      return ['/images/amazon.png', '/images/amazon-1.png', '/images/amazon-2.png'];
    }
    return [];
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
              <div key={project._id} className="project-card-container" onClick={() => showAll && setSelectedProject(project)} style={{ cursor: showAll ? 'pointer' : 'default' }}>
                <div className="glass-card project-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {imgUrl && (
                    <div className="project-card-image-container" style={{ width: '100%', height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)', backgroundColor: '#0b0b14' }}>
                      <img src={imgUrl} alt={project.title} className="project-card-image" style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      <div className="project-links" onClick={(e) => e.stopPropagation()}>
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

      {/* Project Details Modal */}
      {selectedProject && createPortal(
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            
            <div className="project-modal-header">
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="badge-type">{selectedProject.category === 'clones' ? 'REPLICATION PROJECT' : 'WEB PROJECT'}</span>
                <span className="badge-featured"><i className="bi bi-star-fill" style={{ marginRight: '4px' }}></i>FEATURED</span>
              </div>
              <h2 className="project-modal-title">{selectedProject.title}</h2>
            </div>
            
            <p className="project-modal-desc">{selectedProject.description}</p>
            
            <div className="project-modal-section">
              <h4 className="project-modal-section-title">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                  <path fillRule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                </svg>
                TECH STACK
              </h4>
              <div className="project-tech">
                {selectedProject.techStack && selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="tech-badge-large">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-modal-grid">
              <div className="project-modal-left">
                <h4 className="project-modal-section-title">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                    <path d="M12.736 14H5.668a.5.5 0 0 1-.49-.59L5.9 10H4.5a.5.5 0 0 1-.403-.797l6-8A.5.5 0 0 1 11 1.5h4.832a.5.5 0 0 1 .49.59l-1.5 6H16.5a.5.5 0 0 1 .403.797l-6 8a.5.5 0 0 1-.167.147z"/>
                  </svg>
                  KEY FEATURES
                </h4>
                {selectedProject.bulletPoints && selectedProject.bulletPoints.length > 0 && (
                  <ul className="project-modal-bullet-list">
                    {selectedProject.bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="project-modal-right">
                <h4 className="project-modal-section-title">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                    <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0z"/>
                  </svg>
                  PROJECT LINKS
                </h4>
                <p className="project-modal-links-desc">Access code repository and view deployments where active.</p>
                <div className="project-modal-links-container">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-modal-link btn-repo">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                      </svg>
                      View Repository
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-modal-link btn-live">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                      </svg>
                      Live Preview
                    </a>
                  )}
                </div>
              </div>
            </div>

            {getProjectScreenshots(selectedProject.title).length > 0 && (
              <div className="project-modal-section" style={{ marginTop: '2.5rem' }}>
                <h4 className="project-modal-section-title">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                    <path d="M10.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                  </svg>
                  SCREENSHOTS GALLERY
                </h4>
                <div className="project-modal-gallery">
                  {getProjectScreenshots(selectedProject.title).map((scr, idx) => (
                    <div key={idx} className="project-modal-gallery-item" onClick={() => setEnlargedImage(scr)} style={{ cursor: 'zoom-in' }}>
                      <img src={scr} alt={`Screenshot ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Enlarged Lightbox View */}
      {enlargedImage && createPortal(
        <div className="lightbox-overlay" onClick={() => setEnlargedImage(null)}>
          <button className="lightbox-close" onClick={() => setEnlargedImage(null)} aria-label="Close image">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={enlargedImage} alt="Enlarged screenshot" />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default Projects;
