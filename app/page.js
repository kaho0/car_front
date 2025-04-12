'use client';

import React, { useState, useEffect } from 'react';
import CarDetailsModal from './components/CarDetailsModal';
import { Heart } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './components/ToasterProvider';

export default function CarsListComponent() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersData, setFiltersData] = useState({ brands: [], fuelTypes: [] });
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${window.location.origin}/cars.json`);
        const data = await response.json();
        setCars(data.cars);
        
        // Add filters functi onality
        if (data.cars && data.cars.length > 0) {
          // Extract unique brands for filter options
          const brands = [...new Set(data.cars.map(car => car.brand))];
          // Extract fuel types for filter options
          const fuelTypes = [...new Set(data.cars.map(car => car.fuel))];
          
          // Set the extracted data for filters
          setFiltersData({ brands, fuelTypes });
        }
      } catch (error) {
        console.error('Error loading cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const openCarDetails = (car) => {
    setSelectedCar(car);
  };

  const closeCarDetails = () => {
    setSelectedCar(null);
  };

  const addToWishlist = (e, car) => {
    e.stopPropagation();
    if (!wishlist.some(item => item.id === car.id)) {
      setWishlist([...wishlist, car]);
      toast(`${car.brand} ${car.model} added to wishlist!`, 'success');
    } else {
      toast('This car is already in your wishlist', 'info');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div 
            key={car.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative"
            onClick={() => openCarDetails(car)}
          >
            <div className="h-48 relative">
              <img 
                src={car.image || '/placeholder-car.jpg'} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
                onClick={(e) => addToWishlist(e, car)}
                aria-label="Add to wishlist"
              >
                <Heart className={`h-5 w-5 ${wishlist.some(item => item.id === car.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-500'}`} />
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
              <p className="text-gray-500">{car.year}</p>
              <p className="text-lg font-bold text-pink-500 mt-2">${car.price?.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal for car details */}
      <CarDetailsModal 
        selectedCar={selectedCar}
        onClose={closeCarDetails}
      />
    </div>
  );
}