import React, { useRef, useCallback } from "react";
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare } from "lucide-react";
import { CartItem, MERCH_PRICE_LABEL } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => onClose(), [onClose]);
  useDialogA11y(isOpen, handleClose, panelRef);

  const getWhatsAppOrderLink = () => {
    let orderDetails = "¡Hola Son Havana! Quisiera ordenar el siguiente Merch:\n\n";
    cartItems.forEach((item) => {
      orderDetails += `- *${item.product.name}* (Cant: ${item.quantity}) - ${MERCH_PRICE_LABEL}\n`;
    });
    orderDetails += `\n*Precio:* ${MERCH_PRICE_LABEL}\n\n`;
    orderDetails += "Me gustaría confirmar disponibilidad y, si aplica, personalizar mi instrumento. ";
    orderDetails += "¿Me avisan cuando esté disponible y cómo pagar?";
    return `https://wa.me/573105156550?text=${encodeURIComponent(orderDetails)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs touch-none"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-on-surface border-l border-surface-variant/15 flex flex-col shadow-2xl z-10 overscroll-contain outline-none"
          >
            <div className="p-6 border-b border-surface-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary-container" aria-hidden="true" />
                <h2
                  id="cart-drawer-title"
                  className="text-lg font-anybody font-black text-white uppercase"
                >
                  TU CARRITO SH
                </h2>
                <span className="bg-primary-container text-on-primary-container text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar carrito"
                className="size-11 rounded-full hover:bg-black/30 text-surface-variant hover:text-white transition-all flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-black/30 border border-surface-variant/10 text-surface-variant/70 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-base font-anybody font-bold text-white uppercase">
                      Tu carrito está vacío
                    </p>
                    <p className="text-xs text-surface-variant/80 max-w-[240px] mt-1">
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
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-anybody font-black text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-primary font-anybody font-bold uppercase tracking-wider">
                        {MERCH_PRICE_LABEL}
                      </p>
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Quitar uno"
                          className="size-11 shrink-0 rounded-full bg-black/50 border border-surface-variant/15 flex items-center justify-center text-white disabled:opacity-40 hover:bg-black/70 transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
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
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="size-11 shrink-0 rounded-full bg-black/40 text-danger hover:text-danger hover:bg-danger/10 transition-all cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-surface-variant/10 bg-black/40 space-y-4">
                <div className="flex justify-between items-center text-sm font-anybody font-bold text-surface-variant">
                  <span>Precio:</span>
                  <span className="text-lg text-white font-black uppercase tracking-wider">
                    {MERCH_PRICE_LABEL}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-surface-variant/80 leading-tight gap-3">
                  <span>
                    *Un asesor te atiende por WhatsApp, confirma tu pedido y te envía el link de
                    pago.
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-danger underline hover:text-danger/80 transition-colors shrink-0 cursor-pointer"
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
                  <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" /> Pedir por
                  WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
