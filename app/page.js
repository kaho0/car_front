'use client';

import React, { useState, useEffect } from 'react';
import CarDetailsModal from './components/CarDetailsModal';
import Filters from './components/Filters';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
          <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Section */}
        <div className="lg:col-span-full">
          <Filters
            filters={filters}
            setFilters={setFilters}
            brands={filtersData.brands}
            fuelTypes={filtersData.fuelTypes}
            minPrice={filtersData.minPrice}
            maxPrice={filtersData.maxPrice}
          />
        </div>

        {/* Cars Grid */}
        <div className="lg:col-span-full">
          <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
          
          {filteredCars.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No cars match your filters. Try adjusting your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openCarDetails(car)}
                >
                  <div className="h-48 relative">
                    <img
                      src={car.image || '/placeholder-car.jpg'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
                    <p className="text-gray-500">{car.year}</p>
                    <p className="text-lg font-bold text-pink-500 mt-2">${car.price?.toLocaleString()}</p>
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