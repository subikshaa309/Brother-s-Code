
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null;

  // ✅ Fix (Remove _id and id)
const {
  name,
    category,
    price,
    originalPrice,
    images,
    image,
    isNewArrival
  } = product;

  // Handles both single string 'image' or array 'images'
  const imageUrl = Array.isArray(images) && images.length > 0 
    ? images[0] 
    : image || '/placeholder.jpg';

  const categoryName = typeof category === 'object' ? category?.name : category;

  // Handle click on Add to Cart
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents navigating to product page when clicking button
    
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.warn("onAddToCart prop was not passed to ProductCard");
    }
  };

  return (
    <div className="bc-product-card">
      <div className="bc-card-image-wrapper">
        {isNewArrival && <span className="bc-badge-new">NEW</span>}
        <img 
          src={imageUrl} 
          alt={name} 
          className="bc-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Brother%27s+Code';
          }}
        />
        <div className="bc-card-overlay">
          <button 
            type="button" 
            className="bc-quick-add-btn" 
            onClick={handleAddToCartClick}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="bc-card-details">
        <span className="bc-card-category">{categoryName || "Men's Collection"}</span>
        <h3 className="bc-card-title">{name}</h3>
        
        <div className="bc-card-price-row">
          <span className="bc-card-price">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="bc-card-original-price">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;