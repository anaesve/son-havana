/** Precio público del merch mientras no hay tarifa (UI + carrito + WA). */
export const MERCH_PRICE_LABEL = "MUY PRONTO...";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Artist {
  id: string;
  name: string;
  category: string;
  image: string;
  ctaText: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // MM:SS format
}
