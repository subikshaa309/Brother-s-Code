import { useState } from 'react';
import products from '../../data/products';
import './ProductDetails.css';

const ProductDetails = ({ productId, setCartItems, onNavigate }) => {
  // Find the selected product from your data array
  const product = products.find((p) => String(p.id || p._id) === String(productId)) || products[0];

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      // Check if item with same ID and size already exists
      const existingIndex = prevItems.findIndex(
        (item) => (item._id || item.id) === (product._id || product.id) && item.size === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            _id: product._id || product.id,
            id: product.id || product._id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            quantity: quantity,
            image: product.image || product.images?.[0],
            images: product.images || [product.image]
          }
        ];
      }
    });

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  if (!product) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => onNavigate('home')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="pd-container">
      <div className="pd-wrapper">
        {/* Back Button */}
        <button className="pd-back-btn" onClick={() => onNavigate('home')}>
          ← Back to Shop
        </button>

        <div className="pd-grid">
          {/* Left: Product Image */}
          <div className="pd-image-box">
            <img 
              src={product.image || product.images?.[0]} 
              alt={product.name} 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Brother%27s+Code'; }}
            />
          </div>

          {/* Right: Product Details & Actions */}
          <div className="pd-info-box">
            <span className="pd-category">{product.category || "Men's Fashion"}</span>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-price">₹{product.price}</p>

            <p className="pd-description">
              {product.description || "Premium quality cotton blend tailored for maximum comfort and streetwear styling."}
            </p>

            <div className="pd-divider" />

            {/* Size Selector */}
            <div className="pd-section">
              <label className="pd-label">Select Size:</label>
              <div className="pd-size-grid">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="pd-section">
              <label className="pd-label">Quantity:</label>
              <div className="pd-qty-box">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="pd-add-cart-btn" onClick={handleAddToCart}>
              🛒 ADD TO CART • ₹{product.price * quantity}
            </button>

            {addedMessage && (
              <div className="pd-success-alert">
                ✅ Added to cart! <span onClick={() => onNavigate('cart')} style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>View Cart</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;