import { useState, useEffect } from 'react';

// Component Imports
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import OfferProducts from "./components/OfferProducts/OfferProducts";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import Categories from "./components/Categories/Categories";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Testimonials from "./components/Testimonials/Testimonials";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Toast Popup State
  const [toastMessage, setToastMessage] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bc_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Popup disappears after 3 seconds
  };

  // ✅ Fix
const handleNavigate = (page, param = null) => {
  if (page === 'product' && param) {
    setSelectedProductId(param);
  }
  setActiveTab(page);
  window.scrollTo(0, 0);
};

  const handleAddToCart = (product, quantity = 1, size = 'M') => {
    const productId = product._id || product.id;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item._id || item.id) === productId && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          _id: productId,
          id: productId,
          name: product.name,
          price: product.price,
          image: Array.isArray(product.images) && product.images.length > 0 
            ? product.images[0] 
            : product.image,
          size: size,
          quantity: quantity
        }
      ];
    });

    // Trigger Toast Notification
    showToast(`🛒 "${product.name}" added to cart!`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bc-app" style={{ position: 'relative' }}>
      <AnnouncementBar />
      <Navbar 
        cartCount={totalCartCount} 
        onNavigate={handleNavigate} 
        onOpenCart={() => handleNavigate('cart')}
      />

      {/* TOP-CENTER FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '80px', // Positioned right below the navbar
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#111827',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '30px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
          fontWeight: '600',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #374151',
          transition: 'all 0.3s ease'
        }}>
          <span>{toastMessage}</span>
          <button 
            onClick={() => handleNavigate('cart')}
            style={{
              backgroundColor: '#25d366',
              color: '#000000',
              border: 'none',
              padding: '5px 12px',
              borderRadius: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            View Cart
          </button>
        </div>
      )}

      <main>
        {activeTab === 'cart' && (
          <Cart 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
            onNavigate={handleNavigate} 
          />
        )}

        {activeTab === 'product' && (
          <ProductDetails 
            productId={selectedProductId} 
            setCartItems={setCartItems} 
            onNavigate={handleNavigate} 
          />
        )}

        {activeTab === 'home' && (
          <>
            <Hero />
            <OfferProducts onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
            <NewArrivals onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
            <Categories onNavigate={handleNavigate} />
            <WhyChoose />
            <Testimonials />
          </>
        )}

        {/* OFFERS FULL PAGE VIEW */}
      {activeTab === "offers" && (
        <main style={{ padding: "40px 20px", minHeight: "80vh" }}>
          <OfferProducts onNavigate={handleNavigate} onAddToCart={handleAddToCart} />
        </main>
      )}

      </main>
    </div>
  );
}

export default App;