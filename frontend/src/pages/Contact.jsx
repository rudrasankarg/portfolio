import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Custom Math Captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2; // numbers from 2 to 9
    const num2 = Math.floor(Math.random() * 8) + 2;
    return { num1, num2, answer: num1 + num2 };
  };

  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

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

    // Verify Captcha
    if (parseInt(captchaInput) !== captcha.answer) {
      setStatus({ submitting: false, success: false, error: 'Incorrect answer. Please solve the math verification to send message.' });
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

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
        setCaptchaInput('');
        setCaptcha(generateCaptcha());

        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      })
      .catch((err) => {
        setStatus({ submitting: false, success: false, error: err.message });
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
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

          <div className="contact-method">
            <div className="contact-icon"><i className="bi bi-geo-alt"></i></div>
            <div className="contact-details">
              <h4>Location</h4>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>

          <div className="contact-method">
            <div className="contact-icon"><i className="bi bi-linkedin"></i></div>
            <div className="contact-details">
              <h4>LinkedIn</h4>
              <p><a href="https://www.linkedin.com/in/rudrasgd" target="_blank" rel="noopener noreferrer">Rudra Sankar Ghosh Dastidar</a></p>
            </div>
          </div>

          <div className="contact-method">
            <div className="contact-icon"><i className="bi bi-github"></i></div>
            <div className="contact-details">
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

            {/* Math Security Captcha */}
            <div className="form-group">
              <label htmlFor="captcha" className="form-label">
                Security Check: Solve {captcha.num1} + {captcha.num2} = ?
              </label>
              <input 
                type="number" 
                id="captcha" 
                name="captcha" 
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="form-input" 
                placeholder="Your Answer" 
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
                {status.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
