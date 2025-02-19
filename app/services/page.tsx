"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaTimes, FaArrowRight, FaStethoscope, FaUserMd, FaAmbulance } from 'react-icons/fa';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function ServicesPage() {
  const [showService, setShowService] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <AnimatePresence>
        {!showService ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative"
          >
            {/* Hero Section with Video Background */}
            <div className="relative h-[70vh] overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/medical-hero.jpg"
                  alt="Medical Services"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 to-[#0F172A]" />
              </div>

              {/* Navigation Bar */}
              

              {/* Hero Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                  >
                    <h1 className="text-7xl font-bold mb-6 text-white">
                      Advanced Medical Services
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      Experience healthcare reimagined through our comprehensive suite of 
                      advanced medical services and innovative solutions.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 
                               rounded-lg font-semibold flex items-center space-x-2 
                               transition-colors duration-300"
                      onClick={() => setShowService(true)}
                    >
                      <span>Explore Our Services</span>
                      <FaArrowRight />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
                        {/* Main Content */}
                        <div className="container mx-auto px-6 py-20">
              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                <ServiceCard
                  title="Primary Care"
                  description="Comprehensive healthcare for you and your family"
                  image="/primary-care.jpg"
                  icon={<FaStethoscope className="text-2xl" />}
                />
                <ServiceCard
                  title="Specialized Care"
                  description="Expert care for complex medical conditions"
                  image="/specialized-care.jpg"
                  icon={<FaUserMd className="text-2xl" />}
                />
                <ServiceCard
                  title="Emergency Services"
                  description="24/7 emergency medical care when you need it most"
                  image="/emergency-care.jpg"
                  icon={<FaAmbulance className="text-2xl" />}
                />
              </div>

              {/* Featured Services Section */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent 
                             bg-gradient-to-r from-indigo-400 to-purple-400">
                  Featured Medical Services
                </h2>
                
                {/* Featured Service Sections */}
                <div className="space-y-20">
                  {/* Telemedicine Section */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative rounded-2xl overflow-hidden h-[400px]"
                    >
                      <Image
                        src="/assets/images/telemedicine.svg"
                        alt="Telemedicine"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r to-[#DDDD] from-transparent" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col justify-center"
                    >
                      <h3 className="text-3xl font-bold mb-4">Telemedicine Services</h3>
                      <p className="text-gray-300 mb-6">
                        Access healthcare from the comfort of your home with our advanced 
                        telemedicine platform. Connect with healthcare providers instantly 
                        through secure video consultations.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "24/7 virtual consultations",
                          "Secure patient portal",
                          "Digital prescriptions",
                          "Follow-up care"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* Emergency & CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-20 relative rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/emergency-bg.jpg"
                    alt="Emergency Services"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/95 to-purple-500/95" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - CTA */}
                    <div className="text-left">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-6 text-white"
                      >
                        Ready to Experience Better Healthcare?
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 mb-8"
                      >
                        Try our innovative healthcare services and see the difference in your medical care journey.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setShowService(true)}
                        className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold
                                 hover:bg-gray-100 transition-all duration-300
                                 flex items-center space-x-2 group"
                      >
                        <span>Try Our Services Now</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>

                    {/* Right Column - Emergency Link */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <FaAmbulance className="text-2xl text-red-500 animate-pulse" />
                        <h3 className="text-2xl font-bold text-white">Need Emergency Care?</h3>
                      </div>
                      
                      <p className="text-white/90 mb-6">
                        Find the nearest emergency hospitals in your area with real-time availability and directions.
                      </p>

                      <Link href="/emergency"
                            className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 
                                     text-white px-6 py-3 rounded-lg transition-colors duration-300 group">
                        <span>Find Emergency Hospitals</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>

                      {/* Emergency Notice */}
                      <div className="mt-6 text-sm text-white/80 bg-red-500/20 p-3 rounded-lg">
                        <p className="flex items-center">
                          <span className="mr-2">🚨</span>
                          For immediate emergency assistance, please dial 112
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Service Demo View
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900 z-50"
          >
            <button
              onClick={() => setShowService(false)}
              className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-lg text-white p-3 
                       rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="w-full h-screen">
              <iframe
                src="https://healintel.vercel.app/"
                className="w-full h-full border-0"
                title="HealIntel"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Back to Home Link */}
      <div className="mt-8 text-center">
        <Link href="/">
          <button className="text-green-400 hover:text-green-500 font-medium flex items-center justify-center mx-auto transition-colors duration-200">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

// ServiceCard Component
interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group rounded-2xl overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transform 
                    transition-all duration-300 group-hover:translate-y-0 translate-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-indigo-500 p-2 rounded-lg">
              {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};