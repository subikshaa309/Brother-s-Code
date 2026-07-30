
import "./OfferProducts.css";
import productsData from "../../data/products";

function OfferProducts({ products = productsData, onAddToCart }) {
  // Use passed products prop if available, otherwise fallback to local dataset
  const displayProducts = products && products.length > 0 ? products : productsData;

  const handleCartClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.warn("onAddToCart prop was not passed to OfferProducts");
    }
  };

  return (
    <section className="offer-products" id="offer-products">
      <div className="section-header">
        <span>🔥HOT DEALS</span>
        <h2>Special Offer Products</h2>
        <p>Grab the best deals before they're gone.</p>
      </div>

      <div className="product-grid">
        {displayProducts.map((product) => {
          const productId = product._id || product.id;
          const displayPrice = product.price;
          const previousPrice = product.oldPrice || product.originalPrice;
          const discountLabel = product.discount || (previousPrice ? `${Math.round(((previousPrice - displayPrice) / previousPrice) * 100)}% OFF` : null);
          const imageUrl = Array.isArray(product.images) && product.images.length > 0 
            ? product.images[0] 
            : product.image;

          return (
            <div className="product-card" key={productId}>
              <div className="product-image">
                <img 
                  src={imageUrl} 
                  alt={product.name} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500?text=Brother%27s+Code';
                  }}
                />

                {discountLabel && (
                  <div className="discount">
                    {discountLabel}
                  </div>
                )}
              </div>

              <div className="product-info">
                <p className="category">{typeof product.category === 'object' ? product.category?.name : product.category}</p>

                <h3>{product.name}</h3>

                <div className="price">
                  <span className="new-price">₹{displayPrice}</span>

                  {previousPrice && previousPrice > displayPrice && (
                    <span className="old-price">₹{previousPrice}</span>
                  )}
                </div>

                <button 
                  type="button" 
                  onClick={(e) => handleCartClick(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OfferProducts;