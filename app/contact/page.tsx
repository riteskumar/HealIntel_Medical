"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all the details.");
      return;
    }
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage(
          "Email sent successfully! Thank you for contacting us."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        }); // Reset all defined fields
      } else {
        setSuccessMessage("Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(
        "An error occurred while sending the email. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Message will disappear after 5 seconds

      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Message will disappear after 5 seconds

      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020817] to-[#0F172A] pt-16">
      {/* Header Section */}
      <div className="container mt-6 mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-300 text-center max-w-4xl mx-auto mb-12">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-[#101929] p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-4 text-green-400" />
                <span>+91 9818000000</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-4 text-green-400" />
                <span>Riteshbpitindia.edu.in</span>
              </div>

              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-4 text-green-400" />
                <span>Rohini, New Delhi-110085, Delhi, India</span>
              </div>
            </div>

            <div className="mt-8 opacity-100">
              <Image
                src="/assets/images/contact-illustration.svg"
                width={300}
                height={300}
                alt="Contact illustration"
                className="mx-auto rounded-lg"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#101929] p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                  <input
                    className="pl-10 w-full bg-[#1E2A38] border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-green-400 transition-colors"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ritesh Kumar"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                  <input
                    className="pl-10 w-full bg-[#1E2A38] border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-green-400 transition-colors"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                  <input
                    className="pl-10 w-full bg-[#1E2A38] border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-green-400 transition-colors"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01234567890"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                  <textarea
                    className="pl-10 w-full bg-[#1E2A38] border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-green-400 transition-colors h-32"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link href="/">
            <button className="text-green-400 hover:text-green-500 font-medium flex items-center justify-center mx-auto transition-colors duration-200">
              <ArrowLeft className="mr-2" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* Notification Messages */}
      {errorMessage && (
        <div className="fixed mt-20 top-4 right-4 p-4 bg-red-800 text-white rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="fixed mt-20 top-4 right-4 p-4 bg-green-800 text-white rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
    </div>
  );
}
