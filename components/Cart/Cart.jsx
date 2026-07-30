import React from 'react';
import './Cart.css';

function Cart({ cartItems = [], setCartItems, onNavigate }) {
  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          const itemId = item.id || item._id;
          if (itemId === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  const handleProductClick = (id) => {
    if (onNavigate && id) {
      onNavigate('product', id);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '24px', textAlign: 'left' }}>
        YOUR SHOPPING CART ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your cart is currently empty.</p>
          <button
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* CART ITEMS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map((item) => {
              const itemId = item.id || item._id;
              const prodImg = Array.isArray(item.images) && item.images.length > 0 
                ? item.images[0] 
                : item.image;

              return (
                <div
                  key={itemId}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Clickable Image */}
                    <img
                      src={prodImg}
                      alt={item.name}
                      onClick={() => handleProductClick(itemId)}
                      style={{
                        width: '80px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x100?text=Product';
                      }}
                    />

                    <div style={{ textAlign: 'left' }}>
                      {/* Clickable Title */}
                      <h3
                        onClick={() => handleProductClick(itemId)}
                        style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          margin: '0 0 4px 0',
                          cursor: 'pointer',
                          color: '#111'
                        }}
                      >
                        {item.name}
                      </h3>

                      {item.selectedSize && (
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 6px 0' }}>
                          Size: <strong>{item.selectedSize}</strong>
                        </p>
                      )}

                      <p style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 10px 0' }}>
                        ₹{item.price}
                      </p>

                      {/* Quantity & Delete Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                          <button
                            onClick={() => handleQuantityChange(itemId, -1)}
                            style={{ padding: '2px 8px', border: 'none', background: '#f3f4f6', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '0.9rem', fontWeight: '600' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(itemId, 1)}
                            style={{ padding: '2px 8px', border: 'none', background: '#f3f4f6', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(itemId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc2626',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>
                    ₹{(Number(item.price) || 0) * (item.quantity || 1)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '24px',
              height: 'fit-content'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px', textAlign: 'left' }}>
              ORDER SUMMARY
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem', marginBottom: '20px' }}>
              <span>Total Amount</span>
              <span>₹{subtotal}</span>
            </div>

            <button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello! I would like to place an order:\n\n${cartItems
                    .map((item) => `- ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`)
                    .join('\n')}\n\nTotal: ₹${subtotal}`
                );
                window.open(`https://wa.me/?text=${message}`, '_blank');
              }}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#25d366',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              💬 ORDER ALL ITEMS VIA WHATSAPP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;