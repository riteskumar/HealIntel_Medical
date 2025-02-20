"use client";
import { useAuth } from "@clerk/nextjs";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, Video, Calendar, Phone, FileText, Hospital, 
  Activity, Shield, Clock, MapPin, Zap, Heart, AlertCircle 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const {isSignedIn} = useAuth();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/landing'); // Redirects to landing page if signed in
    } else {
      router.push('/sign-in?redirectUrl=/landing'); // Redirects // Redirects to sign-in page if not signed in
    }
  };

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "HD Video Consultations",
      description: "Crystal clear video calls with doctors, available 24/7",
      color: "from-blue-600 to-blue-400",
      stats: "99.9% Uptime",
      link: "/video-call"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment booking with instant confirmation",
      color: "from-purple-600 to-purple-400",
      stats: "2M+ Appointments",
      link: "/landing"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance and emergency support",
      color: "from-red-600 to-red-400",
      stats: "15min Response",
      link: "/contact"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Health Analytics",
      description: "Comprehensive health reports with AI-driven insights",
      color: "from-green-600 to-green-400",
      stats: "10M+ Reports",
      link: "/services"
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: "Emergency Network",
      description: "Real-time tracking of nearby hospitals and ambulances",
      color: "from-yellow-600 to-yellow-400",
      stats: "500+ Hospitals",
      link: "/emergency"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Health Monitoring",
      description: "Real-time vitals tracking and emergency alerts",
      color: "from-pink-600 to-pink-400",
      stats: "24/7 Monitoring",
      link: "/monitoring"
    }
  ];

  const emergencyFeatures = [
    {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      title: "SOS Alert",
      description: "One-tap emergency activation"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
      title: "GPS Tracking",
      description: "Real-time ambulance tracking"
    },
    {
      icon: <Hospital className="w-6 h-6 text-green-500" />,
      title: "Hospital Network",
      description: "Instant hospital availability"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {/* Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full
                     backdrop-blur-lg border border-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent"
        />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Healintel
            </span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience healthcare reimagined through cutting-edge technology
            and compassionate care delivery.
          </motion.p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl 
                              opacity-5 group-hover:opacity-10 transition-all duration-300`} />
                <div className="relative bg-[#0F1729]/80 backdrop-blur-sm border border-white/10 
                              p-8 rounded-2xl h-full group-hover:border-white/20 transition-all duration-300">
                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-3 w-fit mb-6
                               group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent 
                               group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color}">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{feature.stats}</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-white/50 group-hover:text-white transition-colors duration-300"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Response Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Emergency Response System
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our advanced emergency response system ensures immediate assistance
                when you need it most. Connected to over 500 hospitals nationwide.
              </p>
              <div className="space-y-6">
                {emergencyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-white/5 rounded-lg p-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 
                            rounded-3xl blur-2xl" />
              <Image
                src="/assets/images/emergency-response.webp"
                alt="Emergency Response System"
                width={600}
                height={400}
                className="rounded-3xl relative z-10 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Shield />, value: "100%", label: "Secure" },
            { icon: <Clock />, value: "24/7", label: "Support" },
            { icon: <Zap />, value: "15min", label: "Response" },
            { icon: <Heart />, value: "98%", label: "Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400 flex items-center justify-center space-x-2">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative py-32 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <motion.button
           onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 rounded-full 
                     font-medium text-lg hover:shadow-lg hover:shadow-blue-500/25 
                     transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}