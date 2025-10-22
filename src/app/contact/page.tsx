"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Leaf,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-3">
          <Leaf className="w-8 h-8 text-emerald-700" />
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              Our Foundation
            </p>
            <h1 className="text-2xl font-bold text-emerald-900">
              Dr. R N Gupta Clinic
            </h1>
            <p className="text-sm text-emerald-600">
              Ayurvedic Wellness Since 1980
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Reach out to discover how our holistic Ayurvedic approach can
            transform your wellness journey
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Phone",
              description: "Call us during business hours",
              value: "+91 74889 31899",
              link: "tel:+91 74889 31899",
              extra: "Mon - Sat: 9:00 AM - 6:00 PM",
              icon: <Phone className="w-6 h-6 text-emerald-700" />,
            },
            {
              title: "Email",
              description: "Send us your inquiries",
              value: "aadi.veda1@gmail.com",
              link: "mailto:aadi.veda1@gmail.com",
              extra: "Response within 48 hours",
              icon: <Mail className="w-6 h-6 text-emerald-700" />,
            },
            {
              title: "Location",
              description: "Visit our clinic",
              value:
                "Address 1: Dr R N Gupta Memorial Clinic Khoyathong, Thangal Bazar, Near Traffic Point, Opp. Senapati Bus Parking, Imphal, 795001, Manipur ",
              link: "https://maps.google.com/?q=Dr+R+N+Gupta+Clinic+Delhi",
              extra: "Click address to view on Google Maps →",
              icon: <MapPin className="w-6 h-6 text-emerald-700" />,
            },
            {
              title: "Location 2",
              description: "Visit our clinic",
              value:
                "Address 2: Dr N K Gupta Ananda Apartment Near CDA Building ",
              link: "https://maps.app.goo.gl/8NZfTdqpha68mqEU7?g_st=awb",
              extra: "Click address to view on Google Maps →",
              icon: <MapPin className="w-6 h-6 text-emerald-700" />,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-emerald-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">{card.icon}</div>
                <h3 className="text-xl font-semibold text-emerald-900">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-2">{card.description}</p>
              <a
                href={card.link}
                className="text-emerald-700 font-semibold hover:text-emerald-800 break-all"
              >
                {card.value}
              </a>
              {card.extra && (
                <p
                  className="text-gray-500 text-sm mt-2"
                  onClick={() => {
                    card.extra.includes("location");
                  }}
                >
                  {card.extra}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-emerald-700" />
            <h3 className="text-2xl font-bold text-emerald-900">
              Business Hours
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Monday - Friday:</span> 9:00 AM
                - 6:00 PM
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00
                PM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Sunday:</span> Closed
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-600 mb-2">
                Emergency consultations available
              </p>
              <p className="text-emerald-700 font-semibold">
                Call: +91 74889 31899
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Your name",
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "tel",
                  placeholder: "+91 XXXXX XXXXX",
                },
                {
                  name: "subject",
                  label: "Subject",
                  type: "text",
                  placeholder: "How can we help?",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your wellness goals..."
                  rows={5}
                  required
                  className="w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 rounded-md transition-colors"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-600 text-sm font-medium">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-sm font-medium">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-6">
              Find Us
            </h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-emerald-200 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.433600373221!2d93.9378309!3d24.814841200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374927f2b1e8bb0f%3A0x14b0469bb889c061!2sUMA%20AYURVEDIC%20PHARMACY%20AND%20CLINIC!5e0!3m2!1sen!2sin!4v1761067656409!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <a
                href="https://maps.app.goo.gl/8NZfTdqpha68mqEU7?g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">
            About Dr. R N Gupta Clinic
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ayurveda, the ancient science of life, inspires our approach to
            wellness. Since 1980, we've contemporized traditional knowledge with
            modern scientific research to create holistic solutions for a
            balanced life.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our products are mostly from classics and various other formulations
            prepared from the experience by Dr. R. N. Gupta & Sons, which blend
            thousands of years of herbal wisdom with rigorous scientific
            analysis.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Embracing the Ayurvedic philosophy of harmonious living with nature,
            we address body, mind, and spirit through natural treatments, diet
            modifications, lifestyle changes, exercise, and meditation. Our
            mission is to make traditional healthcare mainstream, bringing
            wellness and happiness to every home.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-16 pb-16 text-center">
          <h3 className="text-xl font-bold text-emerald-900 mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                icon: <Facebook className="w-6 h-6" />,
              },
              {
                href: "https://instagram.com",
                label: "Instagram",
                icon: <Instagram className="w-6 h-6" />,
              },
              {
                href: "https://youtube.com",
                label: "YouTube",
                icon: <Youtube className="w-6 h-6" />,
              },
              {
                href: "https://wa.me/7488931899",
                label: "WhatsApp",
                icon: <MessageCircle className="w-6 h-6" />,
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-full transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
