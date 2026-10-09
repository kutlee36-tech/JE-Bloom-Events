import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { 
  BUSINESS_WHATSAPP_NUMBER, 
  BUSINESS_WHATSAPP_DISPLAY, 
  DEFAULT_DELIVERY_FEE,
  generateOrderUniqueId, 
  calculateOrderCharges, 
  generateWhatsappOrderParagraph, 
  createWhatsappUrl 
} from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Check, Copy, ExternalLink, Calendar } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [uniqueId, setUniqueId] = useState('');
  const [nameAndSurname, setNameAndSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gmail, setGmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryWindow, setDeliveryWindow] = useState('Morning (09:00 - 13:00)');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [orderSent, setOrderSent] = useState(false);
  const [sentWhatsappUrl, setSentWhatsappUrl] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Initialize or re-generate unique ID when modal opens
  useEffect(() => {
    if (isOpen) {
      if (!uniqueId || orderSent) {
        setUniqueId(generateOrderUniqueId());
      }
      setOrderSent(false);
      setCopiedNotification(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { subtotal, deliveryFee, totalCharges } = calculateOrderCharges(items, DEFAULT_DELIVERY_FEE);

  const currentOrderDetails = {
    uniqueId,
    nameAndSurname,
    phoneNumber,
    gmail,
    deliveryDate,
    deliveryWindow,
    address,
    postalCode,
    items,
    deliveryFee,
  };

  const previewParagraph = generateWhatsappOrderParagraph(currentOrderDetails);
  const activeWhatsappUrl = createWhatsappUrl(BUSINESS_WHATSAPP_NUMBER, previewParagraph);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate final link and trigger WhatsApp window
    const targetUrl = activeWhatsappUrl;
    setSentWhatsappUrl(targetUrl);
    setOrderSent(true);

    try {
      window.open(targetUrl, '_blank');
    } catch (err) {
      console.warn('Popup blocked, customer can use direct WhatsApp button', err);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(previewParagraph);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleFinish = () => {
    setOrderSent(false);
    onOrderCompleted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-[#F8F6F2] border border-[#E8C7C8] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2D2D2D] text-[#F8F6F2] border-b border-[#3D3D3D]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg tracking-wide leading-none text-[#F8F6F2]">
                WhatsApp Concierge Checkout
              </h2>
              <p className="text-[11px] text-[#D4AF37] font-mono tracking-wider mt-0.5">
                Direct to J&amp;E Blooms · {BUSINESS_WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {orderSent ? (
            /* Post-submission WhatsApp Confirmation Screen */
            <div className="text-center py-4 sm:py-6">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/15 border-2 border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto mb-4">
                <WhatsAppIcon className="w-9 h-9 fill-[#25D366]" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-[#25D366] font-bold block mb-1">
                Order Dispatched to WhatsApp
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#333333] mb-2">
                Ready to Send on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-lg mx-auto mb-6 leading-relaxed">
                Your order paragraph has been composed with unique reference{' '}
                <strong className="text-[#333333] font-mono">{uniqueId}</strong>. We have opened WhatsApp to transmit this directly to our floral designers at{' '}
                <strong className="text-[#333333]">{BUSINESS_WHATSAPP_DISPLAY}</strong>.
              </p>

              {/* Direct Open Button (handles popup blocker) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 max-w-md mx-auto">
                <a
                  href={sentWhatsappUrl || activeWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-[0.18em] font-bold shadow-lg transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Open WhatsApp Chat</span>
                  <ExternalLink className="w-4 h-4 ml-0.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Text Receipt Card */}
              <div className="bg-white border border-[#E8C7C8] p-5 max-w-xl mx-auto text-left shadow-xs mb-8">
                <div className="flex items-center justify-between border-b border-[#E8C7C8]/60 pb-2 mb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] font-semibold">
                    Paragraph Sent to Florist
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
                    {uniqueId}
                  </span>
                </div>
                <pre className="text-xs font-mono text-[#333333] whitespace-pre-wrap leading-relaxed bg-[#FAF8F5] p-3.5 border border-[#E8C7C8]/40 overflow-x-auto">
                  {previewParagraph}
                </pre>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3 bg-[#333333] text-[#F8F6F2] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#D4AF37] hover:text-[#333333] transition-colors cursor-pointer"
              >
                Return to Boutique Atelier
              </button>
            </div>
          ) : (
            /* Checkout Form with Real-time WhatsApp Paragraph Preview */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Unique ID & Info Notice Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#E8C7C8]/25 border border-[#E8C7C8] text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#333333] uppercase tracking-wider">Unique ID:</span>
                  <span className="font-mono font-bold text-[#333333] bg-white px-2 py-0.5 border border-[#E8C7C8]">
                    {uniqueId}
                  </span>
                </div>
                <span className="text-[#555555] text-[11px]">
                  Calculates total charges and dispatches directly to WhatsApp on submission.
                </span>
              </div>

              {/* Recipient / Customer Contact */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-3 flex items-center gap-1.5">
                  <span>1. Contact &amp; Identification</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name and surname */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Name and Surname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={nameAndSurname}
                      onChange={(e) => setNameAndSurname(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 082 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>

                  {/* Gmail / Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Gmail / Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@gmail.com"
                      value={gmail}
                      onChange={(e) => setGmail(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Logistics */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2. Delivery Logistics</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Delivery Window *
                    </label>
                    <select
                      value={deliveryWindow}
                      onChange={(e) => setDeliveryWindow(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    >
                      <option>Morning (09:00 - 13:00)</option>
                      <option>Afternoon (13:00 - 17:00)</option>
                      <option>Sunset Concierge (17:00 - 19:30)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, complex name or house number"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items & Charges Calculation Box */}
              <div className="p-4 bg-white/80 border border-[#E8C7C8] space-y-2 text-xs">
                <div className="flex justify-between text-[#555555]">
                  <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="tabular-nums font-semibold text-[#333333]">R{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>Delivery fee</span>
                  <span className="tabular-nums font-semibold text-[#333333]">R{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#333333] pt-2 border-t border-[#E8C7C8]/60">
                  <span className="text-[#1A1A1A]">Total charges</span>
                  <span className="tabular-nums text-[#1A1A1A] font-serif text-base">
                    R{totalCharges.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Live WhatsApp Paragraph Preview */}
              <div className="border border-[#25D366]/40 bg-[#F0FAF4] p-4 rounded-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#128C7E]">
                    <WhatsAppIcon className="w-4 h-4 fill-[#128C7E]" />
                    <span>WhatsApp Order Message (Live Preview)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-[11px] text-[#128C7E] underline cursor-pointer"
                  >
                    {showPreview ? 'Hide preview' : 'Show preview'}
                  </button>
                </div>

                {showPreview && (
                  <div>
                    <p className="text-[11px] text-[#555555] mb-2">
                      This exact paragraph will be prepared and sent to WhatsApp number{' '}
                      <strong>{BUSINESS_WHATSAPP_DISPLAY}</strong>:
                    </p>
                    <pre className="text-xs font-mono bg-white p-3 border border-[#25D366]/30 text-[#1A1A1A] whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                      {previewParagraph}
                    </pre>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Send Order via WhatsApp · R{totalCharges.toLocaleString()}</span>
              </button>

              <p className="text-[11px] text-center text-[#777777]">
                Clicking opens WhatsApp with your pre-filled order summary ready to send to J&amp;E Blooms.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
