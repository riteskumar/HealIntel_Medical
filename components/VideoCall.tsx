"use client"
import React, { useState, useEffect } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { Loader2, Camera, Mic, Settings, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface VideoCallProps {
  roomName: string;
  userName?: string;
  userEmail?: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ 
  roomName, 
  userName = "HealIntel User", 
  userEmail = "user@example.com" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Security features
  const domain = 'meet.jit.si';
  const encryptionEnabled = true;

  // Format room name to be Jitsi-compatible
  const formatRoomName = (name: string): string => {
    if (!name) return 'default-room';
    // Remove special characters and spaces, convert to lowercase
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const formattedRoomName = formatRoomName(roomName);

  const handleReadyToClose = () => {
    console.log("Call ended");
  };

  const handleError = (error: any) => {
    console.error("Jitsi Error:", error);
    setError("Failed to connect to the meeting. Please try again.");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-center p-8 bg-red-500/10 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Connection Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Link
        href="/"
        className="absolute left-4 top-24 z-[60] flex items-center px-4 py-2 text-green-400 hover:text-green-300 transition-colors duration-200 bg-gray-900/50 rounded-lg backdrop-blur-sm"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back to Home</span>
      </Link>
      {/* Pre-join Loading Screen */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90"
        >
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
          <h2 className="text-xl text-white font-semibold">Preparing Your Secure Connection...</h2>
          <div className="mt-8 space-y-4">
            <Feature icon={<Shield className="text-green-500" />} text="End-to-end encryption enabled" />
            <Feature icon={<Camera className="text-green-500" />} text="HD video quality" />
            <Feature icon={<Mic className="text-green-500" />} text="Crystal clear audio" />
            <Feature icon={<Settings className="text-green-500" />} text="Optimizing connection" />
          </div>
        </motion.div>
      )}

      {/* Main Video Container */}
      <div className="w-full h-screen">
        <JitsiMeeting
          domain={domain}
          roomName={formattedRoomName}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableWelcomePage: false,
            enableClosePage: false,
            disableDeepLinking: true,
            encryption: {
              enabled: encryptionEnabled,
            },
            prejoinPageEnabled: true,
            notifications: [],
            toolbarButtons: [
              'camera',
              'chat',
              'closedcaptions',
              'desktop',
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'microphone',
              'participants-pane',
              'recording',
              'security',
              'settings',
              'shareaudio',
              'sharedvideo',
              'shortcuts',
              'toggle-camera',
            ],
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: "#0f172a",
            DEFAULT_LOCAL_DISPLAY_NAME: userName,
            TOOLBAR_BUTTONS: [],
            SETTINGS_SECTIONS: ['devices', 'language', 'moderator'],
            MOBILE_APP_PROMO: false,
            PROVIDER_NAME: "HealIntel",
            APP_NAME: "HealIntel Video",
          }}
          userInfo={{
            displayName: userName,
            email: userEmail,
          }}
          onReadyToClose={handleReadyToClose}
          getIFrameRef={(iframeRef) => {
            if (iframeRef) {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
              setTimeout(() => setIsLoading(false), 2000);
            }
          }}
        />
      </div>

      {/* Connection Quality Indicator */}
      {!isLoading && hasJoined && (
        <div className="absolute bottom-4 right-4 bg-gray-800 rounded-full px-4 py-2 text-sm text-white flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Connection Stable</span>
        </div>
      )}
    </div>
  );
};

// Feature component for loading screen
const Feature: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-3 text-white">
    {icon}
    <span>{text}</span>
  </div>
);

export default VideoCall;