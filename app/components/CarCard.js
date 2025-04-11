'use client';

import React from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToasterProvider';

export default function CarCard({ car }) {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [mounted, setMounted] = React.useState(false);
  const { addToast } = useToast();
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isInWishlist = mounted && wishlist.some(item => item.id === car.id);
  
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== car.id));
      addToast('Removed from favorites', 'error');
    } else {
      if (!wishlist.some(item => item.id === car.id)) {
        setWishlist([...wishlist, car]);
        addToast('Added to favorites', 'success');
      }
    }
  };
  
  return (
    <Link href={`/car/${car.id}`} className="block">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 hover:transform">
        <div className="relative h-60 w-full">
          <img 
            src={car.image || '/placeholder-car.jpg'} 
            alt={`${car.brand} ${car.model}`}
            className="h-full w-full object-cover rounded-t-3xl"
          />
          <button 
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-3 bg-pink-100 dark:bg-pink-800 rounded-full shadow-md z-10 transition-all duration-200 hover:bg-pink-200 hover:scale-110 transform"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {mounted && (isInWishlist ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-3xl">
            <h3 className="text-lg font-bold text-white">{car.brand} {car.model}</h3>
            <p className="text-gray-200">{car.year}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">${car.price.toLocaleString()}</span>
            <span className="px-3 py-1 text-sm font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full">{car.fuel}</span>
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-700 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {car.seats} seats
          </div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </Link>
  );
}
