import "./Navbar.css";

function Navbar({ cartCount = 0, onNavigate, onOpenCart }) {
  const handleNavClick = (e, targetTab) => {
    e.preventDefault(); // Prevents full page reload
    if (targetTab === "cart" && onOpenCart) {
      onOpenCart();
    } else if (onNavigate) {
      onNavigate(targetTab);
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO & BRAND NAME */}
      <div 
        className="brand-container" 
        onClick={(e) => handleNavClick(e, "home")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <div className="logo">
          <img src="/logo.png" alt="Brother's Code" />
        </div>

        <div className="brand-name">
          <span className="black">BROTHER'S</span>{" "}
          <span className="red">CODE</span>
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="nav-links">
        <a href="/" onClick={(e) => handleNavClick(e, "home")}>
          Home
        </a>
        <a href="/offers" onClick={(e) => handleNavClick(e, "offers")}>
          Offers
        </a>
        
        {/* CART BUTTON WITH BADGE */}
        <a 
          href="/cart" 
          className="cart-link" 
          onClick={(e) => handleNavClick(e, "cart")}
        >
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;