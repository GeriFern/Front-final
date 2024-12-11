import React from 'react'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <p>Powered by</p>
        <img src="/images/DH.PNG" alt='DH-logo' className="logo" />
      </div>
      
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/ico-facebook.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/ico-instagram.png" alt="Instagram" className="social-icon" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/ico-tiktok.png" alt="TikTok" className="social-icon" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/ico-whatsapp.png" alt="WhatsApp" className="social-icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
