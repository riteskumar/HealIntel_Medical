"use client";
import { UserButton, SignedIn, SignedOut,useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PasskeyModal } from "@/components/PasskeyModal";
import { useRouter } from "next/navigation";

const WelcomePage = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const handleGetStarted = ()=>{
    if (isSignedIn) {
      router.push('/landing'); // Redirects to landing page if signed in
    } else {
      router.push('/sign-in?redirectUrl=/landing'); // Redirects // Redirects to sign-in page if not signed in
    }
  }
  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {isAdmin && <PasskeyModal />}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1E2A38] via-blue-700 to-blue-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/medicalPhoto.png')]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="max-w-xl text-center md:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-extrabold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-transparent bg-clip-text">Your Health</span>, <br/>
              
                Our Priority
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8 text-gray-200"
            >
              HealIntel is your trusted partner in seamless healthcare management. 
              Access modern solutions tailored for patients and administrators.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
            >
             
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center"
                >
                  Get Started
                  <motion.span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </motion.span>
                </motion.button>
             
              
              
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.3 }} 
            className="mt-16 md:mt-0 relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/Cholesterol-Numbers.jpg"
                alt="Doctor making a heart sign"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl border-4 border-white transform transition-transform duration-300 hover:scale-105"
                onLoad={() => setImageLoaded(true)}
                priority
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-blue-100 animate-pulse rounded-2xl" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="py-32 px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
>
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-40">
    <Image
      src="/assets/images/bg.jpg"
      layout="fill"
      objectFit="cover"
      alt=""
      className="object-cover"
    />
  </div>
  <div className="absolute top-50 right-20 w-100 h-100 opacity-40">
    <Image
      src="/assets/images/patient-circle.png"
      width={350}
      height={350}
      alt=""
      className="object-contain"
    />
  </div>

  <div className="max-w-7xl mx-auto relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <div className="relative inline-block">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
          Why Choose HealIntel?
        </h2>
        {/* Decorative underline */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
      </div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8">
        Experience healthcare excellence with our 
        <span className="text-blue-600 font-semibold"> innovative solutions </span> 
        designed for modern medical needs.
      </p>
    </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-blue-100 rounded-xl p-4 w-14 h-14 mb-6 flex items-center justify-center">
                <Image
                  src="/assets/icons/calender1.svg"
                  width={35}
                  height={35}
                  alt="Calendar"
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Seamless Appointments</h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule and manage appointments effortlessly. Our intelligent system ensures 
                <span className="font-semibold text-blue-600"> quick and efficient booking </span>
                process.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-green-100 rounded-xl p-4 w-14 h-14 mb-6 flex items-center justify-center">
                <Image
                  src="/assets/icons/chart.svg"
                  width={35}
                  height={35}
                  alt="Analytics"
                  className="text-green-600"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Smart Health Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced analytics and 
                <span className="font-semibold text-blue-600"> AI-powered insights </span> 
                help you make informed decisions about your health reports.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.6 }}
  whileHover={{ y: -8 }}
  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
>
  <div className="bg-yellow-100 rounded-xl p-4 w-14 h-14 mb-6 flex items-center justify-center">
    <Image
      src="/assets/icons/doctor.svg"
      width={35}
      height={35}
      alt="Video Consultation"
      className="text-yellow-600"
    />
  </div>
  <h3 className="text-2xl font-bold text-blue-800 mb-4">Video Consultations</h3>
  <p className="text-gray-600 leading-relaxed">
    Schedule and attend <span className="font-semibold text-blue-600">video consultations </span>  
    with healthcare professionals at your convenience. 
  </p>
</motion.div>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl flex items-center gap-6"
            >
              <div className="bg-pink-200 p-3 rounded-lg">
                <Image
                  src="/assets/icons/support.svg"
                  width={28}
                  height={28}
                  alt="Support"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-800 mb-2">24/7 Support</h4>
                <p className="text-gray-600">Round-the-clock assistance for all your healthcare needs</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl flex items-center gap-6"
            >
              <div className="bg-[#efefef] p-4 rounded-lg">
                <Image
                  src="/assets/icons/medicine.png"
                  width={32}
                  height={32}
                  alt="Hospital"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-800 mb-2">Emergency Assistance</h4>
                <p className="text-gray-600">Find the nearest hospitals and emergency servies quickly and easily</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
     <footer className="py-8 bg-blue-900 text-white">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <p className="text-lg">&copy; 2025 HealIntel. All rights reserved.</p>
    
    {/* Styled Staff Portal Button */}
    <Link
      href="/admin/login"
      className="group relative flex items-center gap-3 px-6 py-2 rounded-lg 
                 bg-gradient-to-r from-[#374151] to-[#1F2937] hover:from-[#1F2937] hover:to-[#111827] 
                 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
      aria-label="Access Staff Portal"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full shadow-md">
        <Image
          src="/assets/icons/admin (1).png"
          width={40}
          height={40}
          alt="Lock Icon"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-sm md:text-base">Staff Panel</span>
    </Link>
  </div>
</footer>

      {/* Chatbot Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChatbot}
          className="flex items-center bg-[#24AE7C] text-white px-6 py-4 rounded-full cursor-pointer shadow-lg"
        >
          <Image
            src="/assets/icons/chatbot-icon.svg"
            height={20}
            width={20}
            alt="chatbot"
            className="mr-2 invert"
          />
          <span className="font-semibold">{chatbotVisible ? "Close Chat" : "Talk with us"}</span>
        </motion.div>
      </motion.div>

      {/* Chatbot Iframe */}
      {chatbotVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "180px",
            width: "500px",
            height: "700px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: "14px",
            overflow: "hidden",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <iframe
            src="http://127.0.0.1:5000/"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Chatbot"
          />
        </motion.div>
      )}
    </div>
  );
};

export default WelcomePage;