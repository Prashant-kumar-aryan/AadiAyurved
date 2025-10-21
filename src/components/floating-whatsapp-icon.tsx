"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "7033650159",
  message = "Contact us here",
}: FloatingWhatsAppProps) {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center"
      >
        <div
          className={`bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform transition-transform duration-700 ease-out hover:scale-110 cursor-pointer flex items-center justify-center ${
            showLabel ? "animate-bounce" : ""
          }`}
        >
          <MessageCircle className="w-6 h-6" />
        </div>

        {showLabel && (
          <div className="absolute bottom-full -left-35 mb-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-fade-in duration-700">
            {message}
          </div>
        )}
      </a>
    </div>
  );
}
