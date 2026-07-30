import React from 'react';

const features = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    desc: 'Free delivery on all orders above ₹999.'
  },
  {
    icon: '💳',
    title: 'Secure Payment',
    desc: '100% safe & encrypted online payments.'
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    desc: '7-day hassle-free return policy.'
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    desc: 'High-quality fabrics with tailored stitching.'
  }
];

function WhyChoose() {
  return (
    <section style={{
      width: '100vw',
      backgroundColor: '#ffffff',
      padding: '60px 24px',
      boxSizing: 'border-box',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      borderTop: '1px solid #f3f4f6',
      borderBottom: '1px solid #f3f4f6'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '800',
          letterSpacing: '1.5px',
          color: '#25d366',
          textTransform: 'uppercase'
        }}>
          WHY CHOOSE US
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', margin: '8px 0 32px 0' }}>
          Experience Premium Fashion
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {features.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#f8fafc',
              padding: '28px 20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;