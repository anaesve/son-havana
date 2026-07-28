import React from "react";
import { Product } from "../types";
import { ShoppingCart, ShoppingBag, Flame } from "lucide-react";

interface MerchProps {
  onAddToCart: (product: Product) => void;
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "CAMPANA GRABADA",
    price: 35.00,
    image: "/images/merch/campana.jpg",
    description: "Campana de mano grabada con el logotipo oficial de Son Havana. Ideal para repicar en la pista."
  },
  {
    id: "prod-2",
    name: "GÜIRO TRADICIONAL",
    price: 45.00,
    image: "/images/merch/guiro.jpg",
    description: "Güiro tradicional de madera con rascador profesional. Sonido arenoso y auténtico para guarachar."
  },
  {
    id: "prod-3",
    name: "MARACAS PROFESIONALES",
    price: 30.00,
    image: "/images/merch/maracas.jpg",
    description: "Maracas profesionales de cuero con semillas naturales para un sonido con ataque excelente."
  },
  {
    id: "prod-4",
    name: "TOTE BAG SH",
    price: 20.00,
    image: "/images/merch/tote.jpg",
    description: "Tote bag de tela cruda de alta densidad con ilustración exclusiva Son Havana de colección."
  }
];

export default function Merch({ onAddToCart }: MerchProps) {
  return (
    <section id="merch" className="min-h-[calc(100vh-5rem)] w-full flex flex-col justify-start pt-16 pb-16 md:pt-20 md:pb-20 px-6 md:px-16 fondo-papel border-t border-b border-on-surface/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-secondary-container flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 text-secondary-container" /> Accesorios de Colección
          </span>
          <h3
            className="font-anybody text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] text-on-surface font-black uppercase leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            MERCH <span className="text-secondary-container">SON HAVANA</span>
          </h3>
          <p className="font-geist text-base md:text-lg text-on-surface/75 max-w-xl mx-auto">
            Instrumentos musicales tradicionales y accesorios profesionales con calidad acústica aprobada por melómanos y bailadores.
          </p>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="bg-card rounded-2xl p-5 flex flex-col group border border-on-surface/8 hover:border-primary-container/40 transition-all duration-300 shadow-[0_1px_2px_color-mix(in_srgb,var(--color-on-surface)_4%,transparent)] hover:shadow-[0_12px_28px_-8px_color-mix(in_srgb,var(--color-on-surface)_18%,transparent)] hover:-translate-y-0.5"
            >
              {/* Image box */}
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-card">
                <img
                  referrerPolicy="no-referrer"
                  alt={product.description}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={product.image}
                />
              </div>

              {/* Text metadata */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-anybody font-black text-lg md:text-xl text-on-surface uppercase group-hover:text-secondary-container transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-on-surface/70 font-geist mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-secondary-container font-anybody font-black text-lg md:text-xl">
                    ${product.price.toFixed(2)} USD
                  </span>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-on-surface text-surface hover:bg-primary-container hover:text-on-primary-container px-4 py-2.5 rounded-lg font-anybody font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
