import { useState } from "react";
import "./NewArrivals.css";
import products from "../../data/products";

function NewArrivals({ onAddToCart, onNavigate }) {
  const newProducts = products.slice(0, 4);
  // Track which product was just added
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (e, product) => {
    e.stopPropagation(); // Prevents opening product page if clicking button
    if (onAddToCart) {
      onAddToCart(product);
      setAddedId(product.id || product._id);

      // Reset button text after 2 seconds
      setTimeout(() => {
        setAddedId(null);
      }, 2000);
    }
  };

  return (
    <section id="new-arrivals" className="new-arrivals">
    
    <section className="new-arrivals">
      <div className="section-header">
        <span>🆕NEW COLLECTION</span>
        <p>Fresh styles just dropped.</p>
      </div>

      <div className="arrival-grid">
        {newProducts.map((product) => {
          const prodId = product.id || product._id;
          const isAdded = addedId === prodId;

          return (
            <div className="arrival-card" key={prodId}>
              <img src={product.image || product.images?.[0]} alt={product.name} />

              <div className="arrival-info">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <span>₹{product.price}</span>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button onClick={() => onNavigate('product', prodId)}>
                    View
                  </button>

                  <button 
                    onClick={(e) => handleAdd(e, product)}
                    style={{
                      backgroundColor: isAdded ? '#16a34a' : '#111827',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    {isAdded ? 'Added! ✅' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
    </section>
  );
}

export default NewArrivals;