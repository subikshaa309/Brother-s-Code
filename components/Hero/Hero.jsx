import { useEffect, useState } from "react";
import "./Hero.css";

const slides = [
  {
    image: "/hero1.jpg",
    badge: "🔥 TRENDING OFFERS",
    title: "Premium Men's\nStreetwear Collection",
    description:
      "Discover premium oversized t-shirts, hoodies, cargos and exclusive fashion designed for modern men.",
    primary: "VIEW OFFER PRODUCTS",
    secondary: "EXPLORE COLLECTION",
    primaryTargetId: "offer-products",
    secondaryTargetId: "shop-by-category",
  },
  {
    image: "/hero3.jpg",
    badge: "💥 NEW ARRIVALS",
    title: "Luxury Men's Collection",
    description:
      "Upgrade your wardrobe with premium quality fashion and exclusive designs.",
    primary: "NEW ARRIVALS",
    secondary: "EXPLORE COLLECTION",
    primaryTargetId: "new-arrivals",
    secondaryTargetId: "shop-by-category",
  },
];

function Hero({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrimaryClick = () => {
    const section = document.getElementById(slides[current].primaryTargetId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else if (onNavigate) {
      onNavigate("shop");
    }
  };

  const handleSecondaryClick = () => {
    const categorySection = document.getElementById(slides[current].secondaryTargetId);

    if (categorySection) {
      // Smooth scroll to "Shop By Category" section on the home page
      categorySection.scrollIntoView({ behavior: "smooth" });
    } else if (onNavigate) {
      // Fallback in case user is on another page
      onNavigate("home");
      setTimeout(() => {
        const sectionAfterNav = document.getElementById("shop-by-category");
        if (sectionAfterNav) sectionAfterNav.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      <div className="hero-overlay">
        <div className={`hero-content ${fade ? "fade-in" : "fade-out"}`}>
          <span className="offer-badge">{slides[current].badge}</span>

          <h1>
            {slides[current].title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </h1>

          <p>{slides[current].description}</p>

          <div className="hero-buttons">
            <button className="shop-btn" onClick={handlePrimaryClick}>
              {slides[current].primary}
            </button>

            {slides[current].secondary && (
              <button className="outline-btn" onClick={handleSecondaryClick}>
                {slides[current].secondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;