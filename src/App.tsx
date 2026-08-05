import React, { useState } from "react";
import { CartItem, Product } from "./types";

// Component imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import Contrataciones from "./components/Contrataciones";
import Merch from "./components/Merch";
import Galeria from "./components/Galeria";
import Reservas from "./components/Reservas";
import Footer from "./components/Footer";
import RadioPlayer from "./components/RadioPlayer";

// Overlay/Modal imports
import ReservationModal from "./components/ReservationModal";
import QuoteModal from "./components/QuoteModal";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  // Global cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modal / overlay states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSede, setBookingSede] = useState("Medellín");
  const [bookingType, setBookingType] = useState<"mesa" | "grupal" | "cumpleanos">("mesa");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteArtist, setQuoteArtist] = useState("SON K'MARON");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Open the cart automatically to give immediate visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Artist quoting activation
  const handleQuoteArtist = (artistName: string) => {
    setQuoteArtist(artistName);
    setIsQuoteOpen(true);
  };

  // Table reservation activation
  const handleBookingOpen = (
    sede: string = "Medellín",
    type: "mesa" | "grupal" | "cumpleanos" = "mesa"
  ) => {
    setBookingSede(sede);
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-on-surface text-surface overflow-x-hidden font-geist selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col justify-between pb-28 md:pb-20">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-primary-container focus:text-on-primary-container focus:px-4 focus:py-3 focus:rounded-full focus:font-anybody focus:font-black focus:text-sm focus:uppercase"
      >
        Saltar al contenido
      </a>

      {/* Persistent Audio player (Sticky) - Custom-designed salsa style */}
      <RadioPlayer />

      {/* Primary header/navbar */}
      <Header
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onBookingOpen={() => handleBookingOpen("Medellín", "mesa")}
      />

      {/* Main Single-Screen Content flow */}
      <main id="contenido" className="flex-grow">
        {/* Hero Section */}
        <Hero onBookingOpen={() => handleBookingOpen("Medellín", "mesa")} />

        {/* Live Orchestra & Band hire Section */}
        <Contrataciones onQuoteArtist={handleQuoteArtist} />

        {/* Merchandise Shop Section */}
        <Merch onAddToCart={handleAddToCart} />

        {/* Photo Slideshow Gallery Section */}
        <Galeria />

        {/* Reservations Block Section (strictly 4px separation & responsive fluid) */}
        <Reservas onBookingOpen={handleBookingOpen} />
      </main>

      {/* Shared site footer */}
      <Footer />

      {/* Interactive Overlay Overlays */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSede={bookingSede}
        reservationType={bookingType}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        selectedArtist={quoteArtist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
