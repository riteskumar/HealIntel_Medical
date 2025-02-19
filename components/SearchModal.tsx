"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

const searchData = [
    { title: 'Primary Care', url: '/services#primary-care', type: 'Service' },
    {title:'Report Analysis',url:'/services#report-analysis',type:'Service'},
    { title: 'Emergency Care', url: '/emergency', type: 'Service' },
    { title: 'About us', url: '/about', type: 'About' },
    { title: 'Contact us', url: '/contact', type: 'Contact' },
    { title: 'Book an appointment', url: '/landing', type: 'Action' },
    { title: 'Video call', url: '/video-call', type: 'Service' },
    // Add more search data as needed
  ];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setSearchQuery(''); // Clear search on escape
        setSearchResults([]);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);
  };

  // Handle close with cleanup
  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  // Handle link click
  const handleLinkClick = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for services, doctors, specialties..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-400 focus:outline-none focus:border-[#24AE7C] focus:ring-1 focus:ring-[#24AE7C]"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {isLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#24AE7C] mx-auto"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.url}
                          onClick={handleLinkClick}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{result.title}</h4>
                              <p className="text-sm text-gray-500">{result.type}</p>
                            </div>
                            <span className="text-[#24AE7C]">→</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links */}
              {!searchQuery && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Links</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Link
                      href="/emergency"
                      onClick={handleLinkClick}
                      className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Emergency Care</h4>
                      <p className="text-sm text-gray-500">24/7 Emergency Services</p>
                    </Link>
                    <Link
                      href="/video-call"
                      onClick={handleLinkClick}
                      className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Telemedicine</h4>
                      <p className="text-sm text-gray-500">Virtual Consultations</p>
                    </Link>
                    <Link
                      href="/landing"
                      onClick={handleLinkClick}
                      className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Book an appointment</h4>
                      <p className="text-sm text-gray-500">Action</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;