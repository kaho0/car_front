'use client';

import React, { useState, useEffect } from 'react';
import CarDetailsModal from './components/CarDetailsModal';
import Filters from './components/Filters';
import { Heart, Car, Calendar, Fuel, DollarSign, Star } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './components/ToasterProvider';
import { useFilters } from './hooks/useFilters';

export default function CarsListComponent() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: 'all',
    fuel: 'all',
    minPrice: '',
    maxPrice: '',
    seats: '',
    search: '',
    sort: ''
  });
  const [filtersData, setFiltersData] = useState({
    brands: [],
    fuelTypes: [],
    minPrice: 0,
    maxPrice: 0
  });
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const { showToast } = useToast();

  // Apply filters to cars
  const filteredCars = useFilters(cars, filters);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${window.location.origin}/cars.json`);
        const data = await response.json();
        setCars(data.cars);
        
        // Save cars to localStorage for access in detail pages
        localStorage.setItem('cars', JSON.stringify(data.cars));
        
        // Add filters functionality
        if (data.cars && data.cars.length > 0) {
          // Extract unique brands for filter options
          const brands = [...new Set(data.cars.map(car => car.brand))];
          // Extract fuel types for filter options
          const fuelTypes = [...new Set(data.cars.map(car => car.fuel))];
          // Find min and max prices
          const minPrice = Math.min(...data.cars.map(car => car.price));
          const maxPrice = Math.max(...data.cars.map(car => car.price));
          
          // Set the extracted data for filters
          setFiltersData({ brands, fuelTypes, minPrice, maxPrice });
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
      showToast(`${car.brand} ${car.model} added to wishlist!`, 'success');
    } else {
      const newWishlist = wishlist.filter(item => item.id !== car.id);
      setWishlist(newWishlist);
      showToast(`${car.brand} ${car.model} removed from wishlist`, 'info');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-xl">
          <div className="animate-pulse flex space-x-3">
            <div className="h-4 w-4 bg-pink-500 rounded-full"></div>
            <div className="h-4 w-4 bg-pink-400 rounded-full"></div>
            <div className="h-4 w-4 bg-pink-300 rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading amazing cars for you...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Find Your Dream Car
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Browse our exclusive collection of premium vehicles and discover the perfect match for your lifestyle.
          </p>
        </header>

        {/* Filters Section with Card Design */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg mr-3">
                <Star className="h-5 w-5 text-pink-500" />
              </span>
              Filter Your Search
            </h2>
            <Filters
              filters={filters}
              setFilters={setFilters}
              brands={filtersData.brands}
              fuelTypes={filtersData.fuelTypes}
              minPrice={filtersData.minPrice}
              maxPrice={filtersData.maxPrice}
            />
          </div>
        </div>

        {/* Cars Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Car className="mr-2 h-6 w-6 text-pink-500" /> 
              Available Cars
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow">
              {filteredCars.length} cars found
            </div>
          </div>
          
          {filteredCars.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="mx-auto w-24 h-24 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-6">
                <Car className="h-12 w-12 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No cars found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                No cars match your filters. Try adjusting your criteria to broaden your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map(car => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] group border border-gray-100 dark:border-gray-700"
                  onClick={() => openCarDetails(car)}
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={car.image || '/placeholder-car.jpg'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors z-10"
                      onClick={(e) => addToWishlist(e, car)}
                      aria-label="Add to wishlist"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          wishlist.some(item => item.id === car.id) 
                            ? 'text-pink-500 fill-pink-500' 
                            : 'text-gray-500 dark:text-gray-400'
                        } transition-colors`} 
                      />
                    </button>
                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      {car.condition || 'New'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {car.brand} {car.model}
                    </h2>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {car.year}
                      </div>
                      {car.fuel && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Fuel className="h-4 w-4 mr-1" />
                          {car.fuel}
                        </div>
                      )}
                      {car.mileage && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-1">🛣️</span>
                          {car.mileage.toLocaleString()} km
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-2xl font-bold text-pink-500 flex items-center">
                        <DollarSign className="h-5 w-5" />
                        {car.price?.toLocaleString()}
                      </p>
                      <button 
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCarDetails(car);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for car details */}
      <CarDetailsModal
        selectedCar={selectedCar}
        onClose={closeCarDetails}
      />
    </main>
  );
}