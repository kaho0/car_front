"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Heart, ShoppingCart, BookOpen } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const [wishlist] = useLocalStorage('wishlist', []);
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
    
  return (
    <nav className="bg-pink-50 dark:bg-gray-900 shadow-md rounded-b-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex items-center">
                <BookOpen className="h-8 w-8 text-pink-500 dark:text-pink-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  <span className="text-pink-500 dark:text-pink-400">Car </span>Finder
                </span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <span className="relative flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 rounded-full transition-all hover:bg-pink-50 dark:hover:bg-pink-900/20">
                <Heart
                  className="h-6 w-6"
                  fill={mounted && wishlist.length > 0 ? "currentColor" : "none"}
                />
                <span className="ml-1 font-medium">My Favorites</span>
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-gray-900 animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </span>
            </Link>
            
            <Link href="/cart">
              <span className="relative flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 rounded-full transition-all hover:bg-pink-50 dark:hover:bg-pink-900/20">
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-1 font-medium">Cart</span>
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}