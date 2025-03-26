import React, { useState, useEffect } from "react";
import { ShoppingCart, Phone, AlertTriangle, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import CropContractAgreement from "../CropContractAgreement/CropContractAgreement";

const ActionBar = ({ crop, userPhone }) => {
  const [quantity, setQuantity] = useState(1);
  const [showTerms, setShowTerms] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Check if current user is the owner of this listing
    if (userPhone && crop.contact) {
      setIsOwner(userPhone === crop.contact);
    }

    // Calculate total price
    const priceValue =
      typeof crop.price === "string"
        ? parseFloat(crop.price.replace(/[^\d.]/g, ""))
        : crop.price;

    setTotalPrice((priceValue * quantity).toFixed(2));
  }, [userPhone, crop.contact, quantity, crop.price]);

  const handleQuantityChange = (e) => {
    setQuantity(
      Math.max(1, Math.min(crop.quantity, parseInt(e.target.value) || 1))
    );
  };

  const handleBuyNowClick = () => {
    if (isOwner) {
      toast.error("You cannot purchase your own listing!");
      return;
    }
    setShowTerms(true);
  };

  const handleContactFarmer = () => {
    if (isOwner) {
      toast.error("This is your own listing!");
      return;
    }

    // Implement contact functionality
    navigator.clipboard.writeText(crop.contact);
    toast.success("Phone number copied to clipboard!", {
      icon: <Check size={18} />,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  const handleAcceptTerms = () => {
    setShowTerms(false);
    setShowContract(true);
  };

  const handleContractClose = () => {
    setShowContract(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 md:left-20 bg-white shadow-lg border-t border-gray-100 z-10">
        <div className="p-4 flex justify-center flex-col md:flex-row items-center gap-6">
          {isOwner && (
            <div className="w-full md:w-auto bg-amber-50 text-amber-800 px-4 py-2 rounded-lg flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              <span className="font-medium">This is your own listing</span>
            </div>
          )}

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Total Price</span>
              <span className="font-bold text-lg text-gray-900">
                ₹{totalPrice}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Qty:</label>
              <div className="flex items-center">
                <button
                  className="bg-gray-100 px-3 py-1 rounded-l-md border border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={crop.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 p-1 border-t border-b border-gray-300 text-center"
                />
                <button
                  className="bg-gray-100 px-3 py-1 rounded-r-md border border-gray-300"
                  onClick={() =>
                    setQuantity(Math.min(crop.quantity, quantity + 1))
                  }
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">{crop.unit}</span>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-fit">
            <button
              className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                isOwner
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
              }`}
              onClick={handleBuyNowClick}
              disabled={isOwner}
            >
              <ShoppingCart size={18} />
              <span className="w-full">Buy Now</span>
            </button>

            <button
              className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                isOwner
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "border border-green-600 text-green-600 hover:bg-green-50"
              }`}
              onClick={handleContactFarmer}
              disabled={isOwner}
            >
              <Phone size={18} />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTerms}
        onClose={handleCloseTerms}
        onAccept={handleAcceptTerms}
      />

      {/* Contract Agreement */}
      {showContract && (
        <div className="fixed inset-0 bg-opacity-25 z-50 backdrop-blur-sm overflow-y-auto">
          <div className="relative min-h-screen">
            <div className="absolute top-4 right-4 z-51">
              <button
                onClick={handleContractClose}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <CropContractAgreement />
          </div>
        </div>
      )}
    </>
  );
};

export default ActionBar;
