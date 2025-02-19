"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
// Landing Page
import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {/* HealIntel */}

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            
            <Link href="/">
          <button
          
            className="text-green-400 hover:text-green-800 font-medium flex  items-center justify-center transition-all duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </button>
        </Link>
        <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 HealIntel
            </p>
           
          </div>
          
        </div>
      </section>

      <Image
        src="/assets/images/dashboard.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
      <div
        style={{
          cursor: "pointer",
          backgroundColor: "#1E2A38",
          borderRadius: "14px",
          color: "white",
          fontSize: "16px",
          position: "absolute",
          fontWeight: "600",
          bottom: "30px",
          right: "20px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={toggleChatbot}
      >
        <Image
          src="/assets/icons/chatbot-icon.svg"
          height={20}
          width={20}
          alt="chatbot"
          className="mr-2 invert"
        />
        {chatbotVisible ? "Close Chat" : "Talk with us"}
      </div>

      {/* Chatbot Iframe */}
      {chatbotVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "25px",
            right: "180px",
            width: "500px",
            height: "700px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Home;
