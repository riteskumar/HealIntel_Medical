"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Hospital, Phone, MapPin, Navigation, Clock, 
  AlertTriangle, Search, ChevronRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const EmergencyPage = () => {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      () => {
        setError("Unable to retrieve your location. Please allow location access.");
        setIsLoading(false);
      }
    );
  };

  const fetchHospitals = async () => {
    if (!location) return;

    try {
      const response = await fetch(`/api/emergency-sos?lat=${location.lat}&lon=${location.lon}`);
      if (!response.ok) throw new Error("Failed to fetch hospitals");

      const data = await response.json();
      setHospitals(data.hospitals);
    } catch (err) {
      setError("Error fetching hospitals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) fetchHospitals();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="mt-5 text-3xl md:text-4xl font-bold mb-2">Emergency Services</h1>
              <p className="text-red-100">Finding nearest emergency care facilities</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="tel:100" 
                className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call 100
              </Link>
              <Link
                href="/video-call"
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-400 transition-colors"
              >
                <AlertTriangle className="h-5 w-5" />
                Virtual Emergency
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Section */}
        {error && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg"
            {...fadeInUp}
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {isLoading && !error && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Locating nearest emergency facilities...</p>
          </div>
        )}

        {/* Hospitals List */}
        {!isLoading && !error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {hospitals.map((hospital, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <Hospital className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-red-600 transition-colors"
                        >
                          {hospital.name}
                        </a>
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{hospital.address || "Address not available"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{hospital.contact || "Contact not available"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>Open 24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Navigation className="h-4 w-4" />
                        <span>Emergency Services Available</span>
                      </div>
                      <Link
                        href={`tel:${hospital.contact}`}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Call Now
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;