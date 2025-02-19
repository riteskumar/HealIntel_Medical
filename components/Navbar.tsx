"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import SearchModal from './SearchModal';

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Video, Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userNavItems = [
   
    { name: "My Appointments", href: "/dashboard" }
  ];
  const serviceItems = [
    { name: "Health Analysis", href: "/services#specialized-care" },
    { name: "Emergency Care", href: "/emergency" },
    
  ];

  return (
    <nav className={`${
      isScrolled 
        ? "bg-white/80 backdrop-blur-lg shadow-lg" 
        :  "bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]"
      } fixed w-full top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height */}
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="HealIntel Logo"
              width={38}
              height={38}
              className="w-[38px] h-[38px] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1E2A38] to-[#24AE7C] bg-clip-text text-transparent">
              HealIntel
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedOut>
              <div className="flex items-center space-x-8">
                <Link href="/about" className="text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium">
                  Contact
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-8">
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium">
                    <span>Services</span>
                    <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 w-56 bg-white shadow-lg rounded-xl py-2 mt-2 z-[60] border border-gray-100"
                      >
                        {serviceItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#24AE7C] transition-colors text-[15px]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                
                <Link href="/about" className="text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium">
                  About HealIntel
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium">
                  Contact Us
                </Link>
                <button 
                className="p-2 text-gray-700 hover:text-[#24AE7C] transition-colors hover:scale-110 duration-300"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </button>
                <Link
                  href="/video-call"
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#24AE7C] to-[#1E8A63] text-white px-5 py-2.5 rounded-lg 
                           hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <Video size={20} />
                  <span className="font-medium">Need Doctor?</span>
                </Link>
              </div>
            </SignedIn>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
             

              <SignedIn>
                <div className="relative group">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-11 h-11 ring-2 ring-offset-2 ring-[#24AE7C] rounded-full"
                      }
                    }}
                  />
                  <div className="absolute right-0 w-56 py-2 mt-2 bg-white rounded-xl shadow-lg opacity-0 invisible 
                              group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    {userNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-[#24AE7C]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-[#24AE7C] transition-colors text-[15px] font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-[#24AE7C] to-[#1E8A63] text-white px-5 py-2.5 rounded-lg 
                           hover:shadow-md hover:scale-105 transition-all duration-300 font-medium"
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
     

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <SignedOut>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 bg-[#093525] text-white hover:bg-[#1E8A63] transition-colors rounded-lg mx-3"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                
                {/* <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Appointments
                </Link> */}
                <Link
                  href="/services"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About HealIntel
                </Link>
                
                {userNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-[#24AE7C] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      
    </nav>
  );
};

export default Navbar;