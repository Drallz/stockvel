import React, { useState } from 'react';
import '../index.css';   // ensure this is imported

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks! We'll notify ${email} when we launch.`);
    setEmail('');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>💰</span>
          <span>StokvelHub</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#benefits">Benefits</a>
          <a href="#community">Community</a>
          <button className="btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Start a circle</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🇿🇦 South Africa's #1 Digital Stokvel</div>
        <h1 className="hero-title">Grow your money <br />together, not alone</h1>
        <p className="hero-subtitle">
          Join a trusted community rotating savings plan. Save as a group, earn payouts, and reach your goals faster — fully transparent.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">🚀 Create a circle</button>
          <button className="btn-secondary">▶️ Watch demo</button>
        </div>
        <div className="hero-stats">
          <div className="stat">🔒 Insured funds</div>
          <div className="stat">📈 +12% avg growth</div>
          <div className="stat">👥 50k+ active members</div>
        </div>
        <div className="floating-icon">
          <span style={{ fontSize: '3rem' }}>💰</span>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="section-title">
          <span>SIMPLE & TRANSPARENT</span>
          <h2>How StokvelHub works</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">👥</div>
            <h3>1. Join or start a circle</h3>
            <p>Invite friends, family or colleagues. Set monthly contribution (R100 – R5000). Everyone agrees on payout rotation.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">💸</div>
            <h3>2. Contribute monthly</h3>
            <p>Automated EFT or card deductions. See real-time pot grow. No hidden fees, 100% goes to the circle.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🎁</div>
            <h3>3. Get your lump sum</h3>
            <p>On your rotation month, receive the full pot (e.g. R12,000 for 12 members @ R1000). Then cycle repeats.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section" style={{ background: '#fefaf0' }}>
        <div className="section-title">
          <span>WHY CHOOSE US</span>
          <h2>Why you'll love saving with us</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div style={{ fontSize: '2rem' }}>🔒</div>
            <h3>Bank-level security</h3>
            <p>Funds held in a dedicated FSCA-regulated trust account.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem' }}>📊</div>
            <h3>Automated savings</h3>
            <p>Never miss a contribution. Set & forget with debit order.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem' }}>📅</div>
            <h3>Flexible rotation</h3>
            <p>Choose monthly, bi-monthly or quarterly payouts.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem' }}>📈</div>
            <h3>Bonus interest</h3>
            <p>We add 2% annual interest on total pot — extra growth.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="community" className="section">
        <div className="testimonial">
          <div className="testimonial-quote">“StokvelHub changed how my friends and I save. We bought a fridge, paid school fees, and still had leftover. The group accountability is real!”</div>
          <div className="testimonial-author">— Nosipho L., Soweto Stokvel Captain</div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta">
        <h2>Ready to start your stokvel journey?</h2>
        <p>Join thousands of South Africans who are saving smarter, together. It takes 2 minutes to create a circle.</p>
        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={{ background: 'var(--gold)', color: 'var(--dark-green)' }}>
            ✨ Notify me
          </button>
        </form>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>No credit check • Cancel anytime • Zero setup fee</p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>StokvelHub</h4>
            <p style={{ fontSize: '0.85rem' }}>Building stronger communities through rotating savings & investments.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href="#">Pricing</a>
            <a href="#">For group admins</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About us</a>
            <a href="#">Safety & security</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">POPIA</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 StokvelHub (Pty) Ltd — Empowering South African stokvels.
        </div>
      </footer>
    </>
  );
};

export default LandingPage;