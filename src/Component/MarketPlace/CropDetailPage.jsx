import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader,
  Share2,
  Heart,
  Award,
  AlertTriangle,
  Bookmark,
  Leaf,
} from "lucide-react";
import CropImageGallery from "./CropImageGallery";
import CropDetails from "./CropDetails";
import CropTimeline from "./CropTimeline";
import FreshnessMeter from "./FreshnessMeter";
import ActionBar from "./ActionBar";
import { toast } from "react-hot-toast";
import { getCurrentUser } from "../../../helper";

export const CropDetailPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", {
      icon: <Share2 size={18} />,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader className="w-10 h-10 text-green-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading crop details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </p>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!cropData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <p className="text-xl font-semibold text-gray-800 mb-6">
          No crop data available
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isOwner = userPhone === cropData.contact;

  return (
    <div className="bg-gray-50 py-12 md:ml-20 mt-16 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back to listings</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full transition-all ${
                isWishlisted
                  ? "bg-red-50 text-red-500"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-all"
              aria-label="Share listing"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Owner banner */}
        {isOwner && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-amber-500 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">
                  This is your listing
                </h3>
                <p className="text-amber-700 text-sm">
                  You cannot purchase your own listing
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-50 transition-all font-medium text-sm">
              Edit Listing
            </button>
          </div>
        )}

        {/* Product badges */}
        <div className="flex flex-wrap gap-2 mb-4 relative">
          {cropData.isOrganic && (
            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <Leaf size={14} className="mr-1" />
              Organic
            </span>
          )}
          {cropData.isSustainable && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Award size={14} className="mr-1" />
              Sustainably Grown
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
            <Bookmark size={14} className="mr-1" />
            {cropData.type}
          </span>
          {cropData.status && (
            <div
              className={`absolute right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                cropData.status === "PURCHASED"
                  ? "bg-green-600 text-white"
                  : cropData.status === "ARCHIVED"
                  ? "bg-gray-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {cropData.status.charAt(0).toUpperCase() +
                cropData.status.slice(1).toLowerCase()}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CropImageGallery
            images={images}
            type={cropData.type}
            variety={cropData.variety}
          />
          <div className="space-y-6">
            <CropDetails crop={cropData} />
            <CropTimeline
              harvestDate={cropData.harvestDate}
              availabilityDate={cropData.availabilityDate}
            />
            <FreshnessMeter shelfLife={cropData.shelfLife} />
          </div>
        </div>
        <ActionBar crop={cropData} userPhone={userPhone} />
      </div>
    </div>
  );
};
