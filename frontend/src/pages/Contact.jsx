import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to submit form');
        
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      })
      .catch((err) => {
        setStatus({ submitting: false, success: false, error: err.message });
      });
  };

  return (
    <section id="contact" className="fade-in" style={{ scrollMarginTop: '8rem' }}>
      <div className="section-header">
        <span className="section-number">04. CONTACT</span>
        <h1 className="section-title">Start a Conversation</h1>
        <p className="section-subtitle">Let's discuss collaborative research, development opportunities, or just connect.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Cards */}
        <div className="contact-info">
          <div className="contact-method">
            <div className="contact-icon"><i className="bi bi-envelope"></i></div>
            <div className="contact-details">
              <h4>Email</h4>
              <p><a href="mailto:rudrasankarg@gmail.com">rudrasankarg@gmail.com</a></p>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-icon"><i class="bi bi-geo-alt"></i></div>
            <div class="contact-details">
              <h4>Location</h4>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>



          <div class="contact-method">
            <div class="contact-icon"><i class="bi bi-linkedin"></i></div>
            <div class="contact-details">
              <h4>LinkedIn</h4>
              <p><a href="https://www.linkedin.com/in/rudra-sankar-ghosh-dastidar-5a0263326/" target="_blank" rel="noopener noreferrer">Rudra Sankar Ghosh Dastidar</a></p>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-icon"><i class="bi bi-github"></i></div>
            <div class="contact-details">
              <h4>GitHub</h4>
              <p><a href="https://github.com/rudrasankarg" target="_blank" rel="noopener noreferrer">github.com/rudrasankarg</a></p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="form-input" 
                placeholder="Your Name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="form-input" 
                placeholder="email@example.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                className="form-input" 
                rows="5" 
                placeholder="How can I help you?" 
                style={{ resize: 'none' }} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={status.submitting}
              style={status.success ? { background: 'linear-gradient(135deg, #00C9FF, #92FE9D)' } : {}}
            >
              {status.submitting ? 'Sending...' : status.success ? 'Message Sent Successfully!' : 'Send Message'}
            </button>

            {status.error && (
              <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
                Error: {status.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
