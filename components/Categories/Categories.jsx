
const categoriesList = [
  { 
    id: 'shirt', 
    name: 'Shirts', 
    image: "/p2.jpg"
  },
  { 
    id: 'pants', 
    name: 'Pants', 
    image: "/p3.jpg" 
  },
  { 
    id: 'jeans', 
    name: 'Jeans', 
    image: "/p7.jpg"
  },
  { 
    id: 'hoodies', 
    name: 'Hoodies', 
    image: "/p6.jpg"
  },
  { 
    id: 'tshirt', 
    name: 'T-Shirts', 
    image: "/p1.jpg" 
  },
  
  { 
    id: 'jogger', 
    name: 'Joggers', 
    image: "/p8.jpg" 
  },
];

function Categories({ onNavigate }) {
  const handleCategoryClick = (categoryId) => {
    if (onNavigate) {
      onNavigate('shop', categoryId);
    }
  };

  return (
    <section 
      id="shop-by-category" // Add this ID here
      style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}
    >
      {/* rest of your component */}
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', color: '#111', letterSpacing: '0.5px' }}>
        SHOP BY CATEGORY
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        {categoriesList.map((cat) => (
          <div key={cat.id} style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div style={{ width: '100%', height: '260px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
              <img 
                src={cat.image} 
                alt={cat.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/400/500';
                }}
              />
            </div>
            
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>
                {cat.name}
              </h3>
              <button 
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                Explore Category
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    </section>
  );
}

export default Categories;