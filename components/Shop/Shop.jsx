import { useState } from 'react';
import products from '../../data/products';

const Shop = ({ selectedCategory, onNavigate, onAddToCart }) => {
  const [currentFilter, setCurrentFilter] = useState(selectedCategory || 'All');
  const [addedId, setAddedId] = useState(null);

  // Extract all unique category names for filter tabs
  const categoriesList = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products by active category
  const filteredProducts = currentFilter === 'All' 
    ? products 
    : products.filter((p) => p.category?.toLowerCase() === currentFilter.toLowerCase());

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      const prodId = product.id || product._id;
      setAddedId(prodId);

      setTimeout(() => {
        setAddedId(null);
      }, 2000);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '80vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header & Back Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: 0 }}>
            {currentFilter === 'All' ? 'ALL PRODUCTS' : currentFilter.toUpperCase()} ({filteredProducts.length})
          </h1>
          <button 
            onClick={() => onNavigate('home')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ← Back to Home
          </button>
        </div>

        {/* Category Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setCurrentFilter(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: currentFilter.toLowerCase() === cat.toLowerCase() ? '1px solid #111' : '1px solid #d1d5db',
                backgroundColor: currentFilter.toLowerCase() === cat.toLowerCase() ? '#111' : '#fff',
                color: currentFilter.toLowerCase() === cat.toLowerCase() ? '#fff' : '#111',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => {
              const prodId = product.id || product._id;
              const prodImg = Array.isArray(product.images) && product.images.length > 0 
                ? product.images[0] 
                : product.image;
              const isAdded = addedId === prodId;

              return (
                <div key={prodId} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <img 
                      src={prodImg} 
                      alt={product.name}
                      style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Brother%27s+Code'; }}
                    />
                    <div style={{ padding: '16px', textAlign: 'left' }}>
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '800' }}>
                        {product.category || 'COLLECTION'}
                      </span>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#111', margin: '4px 0' }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111', margin: '0 0 12px 0' }}>
                        ₹{product.price}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 16px 16px 16px', display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => onNavigate('product', prodId)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>

                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: isAdded ? '#16a34a' : '#25d366',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      {isAdded ? 'Added! ✅' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;