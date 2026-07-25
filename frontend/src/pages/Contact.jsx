import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    otp: ''
  });
  
  // OTP UI states
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [demoCode, setDemoCode] = useState('');

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

  // Request OTP from server
  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setStatus({ submitting: false, success: false, error: 'Please enter your email address first.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    setOtpSending(true);
    setStatus({ submitting: false, success: false, error: null });
    setDemoCode('');

    fetch('/api/contact/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to request OTP');
        
        setOtpSending(false);
        setOtpRequested(true);
        setStatus({ submitting: false, success: false, error: null });
        
        if (data.demo && data.code) {
          setDemoCode(data.code);
        }
      })
      .catch((err) => {
        setOtpSending(false);
        setStatus({ submitting: false, success: false, error: err.message });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    // Verify OTP input exists
    if (!formData.otp) {
      setStatus({ submitting: false, success: false, error: 'Please enter the verification OTP sent to your email.' });
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
        setFormData({ name: '', email: '', message: '', otp: '' });
        setOtpRequested(false);
        setDemoCode('');

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
                disabled={otpRequested}
              />
            </div>

            {/* Email Field with Send OTP Button */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="email@example.com" 
                  required 
                  disabled={otpRequested}
                  style={{ flexGrow: 1 }}
                />
                {!otpRequested && (
                  <button 
                    onClick={handleRequestOtp} 
                    className="btn-secondary" 
                    disabled={otpSending}
                    style={{ 
                      padding: '0 1.5rem', 
                      fontSize: '0.85rem', 
                      whiteSpace: 'nowrap', 
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {otpSending ? 'Sending...' : 'Get OTP'}
                  </button>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                className="form-input" 
                rows="4" 
                placeholder="How can I help you?" 
                style={{ resize: 'none' }} 
                required 
                disabled={otpRequested}
              />
            </div>

            {/* OTP Verification Code Input */}
            {otpRequested && (
              <div className="form-group fade-in">
                <label htmlFor="otp" className="form-label" style={{ color: 'var(--color-primary)' }}>
                  Verification Code (OTP)
                </label>
                <input 
                  type="text" 
                  id="otp" 
                  name="otp" 
                  value={formData.otp}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Enter 6-digit code" 
                  maxLength={6}
                  required 
                  style={{ borderColor: 'var(--color-primary)' }}
                />
                
                {demoCode && (
                  <p style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    <strong>[Demo Mode]</strong> Check server logs or use code: <strong>{demoCode}</strong>
                  </p>
                )}
                
                <button 
                  onClick={() => setOtpRequested(false)} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-muted)', 
                    fontSize: '0.8rem', 
                    textDecoration: 'underline', 
                    marginTop: '0.5rem',
                    textAlign: 'left',
                    cursor: 'pointer' 
                  }}
                >
                  Edit contact details
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-submit"
              disabled={status.submitting || !otpRequested}
              style={status.success ? { background: 'linear-gradient(135deg, #00C9FF, #92FE9D)' } : {}}
            >
              {status.submitting ? 'Verifying...' : status.success ? 'Message Sent Successfully!' : 'Send Message'}
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
