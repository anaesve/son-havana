import React from "react";
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const getWhatsAppOrderLink = () => {
    let orderDetails = "¡Hola Son Havana! Quisiera ordenar el siguiente Merch:\n\n";
    cartItems.forEach((item) => {
      orderDetails += `- *${item.product.name}* (Cant: ${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)} USD\n`;
    });
    orderDetails += `\n*Total referencial:* $${subtotal.toFixed(2)} USD\n\n`;
    orderDetails += "Me gustaría confirmar disponibilidad y, si aplica, personalizar mi instrumento. ";
    orderDetails += "¿Me comparten el link o las opciones de pago (transferencia, tarjeta u otro medio)?";
    return `https://wa.me/573105156550?text=${encodeURIComponent(orderDetails)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-on-surface border-l border-surface-variant/15 flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary-container" />
                <h3 className="text-lg font-anybody font-black text-white uppercase">
                  TU CARRITO SH
                </h3>
                <span className="bg-primary-container text-on-primary-container text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/30 text-surface-variant hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-black/30 border border-surface-variant/10 text-surface-variant/55 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-anybody font-bold text-white uppercase">
                      Tu carrito está vacío
                    </h4>
                    <p className="text-xs text-surface-variant/60 max-w-[240px] mt-1">
                      Agrega productos oficiales de Son Havana para llevar el ritmo a donde vayas.
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-black/30 rounded-xl border border-surface-variant/10 hover:border-surface-variant/20 transition-all items-center"
                  >
                    <div className="w-16 h-16 rounded-lg bg-white overflow-hidden p-1 flex-shrink-0">
                      <img
                        referrerPolicy="no-referrer"
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-anybody font-black text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-primary-container font-anybody font-bold">
                        ${item.product.price.toFixed(2)} USD
                      </p>
                      {/* Quantity Toggles — pill + touch target ≥44px en mobile */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Quitar uno"
                          className="size-11 shrink-0 rounded-full bg-black/50 border border-surface-variant/15 flex items-center justify-center text-white disabled:opacity-40 hover:bg-black/70 transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-white min-w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          aria-label="Agregar uno"
                          className="size-11 shrink-0 rounded-full bg-black/50 border border-surface-variant/15 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="size-11 shrink-0 rounded-full bg-black/40 text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-surface-variant/10 bg-black/40 space-y-4">
                <div className="flex justify-between items-center text-sm font-anybody font-bold text-surface-variant">
                  <span>Subtotal referencial:</span>
                  <span className="text-lg text-white font-black">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-surface-variant/80 leading-tight gap-3">
                  <span>*Un asesor te atiende por WhatsApp, confirma tu pedido y te envía el link de pago (transferencia, tarjeta u otro medio).</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-400 underline hover:text-red-500 transition-colors shrink-0"
                  >
                    Vaciar todo
                  </button>
                </div>

                <a
                  href={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 fill-current" /> Pedir por WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
