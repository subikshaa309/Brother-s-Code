import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    city: 'Chennai',
    rating: 5,
    comment: 'Excellent quality! The oversized t-shirt fits perfectly and the fabric feels ultra-premium.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    name: 'Aman Verma',
    city: 'Mumbai',
    rating: 5,
    comment: 'Quick delivery via WhatsApp order and top-notch stitching. Definitely buying again!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    name: 'Vikram Patel',
    city: 'Bangalore',
    rating: 5,
    comment: 'The streetwear hoodie is absolute fire. True to size and super comfortable.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200'
  }
];

function Testimonials() {
  return (
    <section style={{
      width: '100vw',
      backgroundColor: '#f8fafc',
      padding: '60px 24px',
      boxSizing: 'border-box',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '800',
          letterSpacing: '1.5px',
          color: '#25d366',
          textTransform: 'uppercase'
        }}>
          OUR CUSTOMERS
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', margin: '8px 0 8px 0' }}>
          What People Say
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '36px' }}>
          Thousands of happy customers trust Brother's Code.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <img 
                src={rev.image} 
                alt={rev.name}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '12px',
                  border: '2px solid #25d366'
                }} 
              />
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>
                {rev.name}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>
                {rev.city}
              </span>

              {/* Star Rating */}
              <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '12px' }}>
                {'★'.repeat(rev.rating)}
              </div>

              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: '1.6', italic: 'true' }}>
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;