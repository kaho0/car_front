"use client";

import React from 'react';

export default function Filters({ filters = {}, setFilters, brands = [], fuelTypes = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Ensure filters object has default values for all properties
  const safeFilters = {
    brand: 'all',
    fuel: 'all',
    minPrice: '',
    maxPrice: '',
    seats: '',
    search: '',
    sort: '',
    ...filters // This will overwrite defaults with any values that exist in filters
  };
  const sortCars = (cars, sortOption) => {
    if (sortOption === 'price_asc') {
      return cars.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      return cars.sort((a, b) => b.price - a.price);
    }
    return cars; // Default (no sorting)
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Find Your Perfect Car</h2>
        <div className="h-1 w-20 bg-blue-500 rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Brand Filter */}
        <div className="space-y-2">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Brand
          </label>
          <div className="relative">
            <select
              id="brand"
              name="brand"
              value={safeFilters.brand}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white appearance-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Fuel Type Filter */}
        <div className="space-y-2">
          <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fuel Type
          </label>
          <div className="relative">
            <select
              id="fuel"
              name="fuel"
              value={safeFilters.fuel}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white appearance-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="all">All Fuel Types</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Price Range Filter */}
        <div className="space-y-2">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Min Price ($)
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={safeFilters.minPrice}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="0"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Max Price ($)
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={safeFilters.maxPrice}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Any"
          />
        </div>
        
        {/* Seats Filter */}
        <div className="space-y-2">
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Seating Capacity
          </label>
          <div className="relative">
            <select
              id="seats"
              name="seats"
              value={safeFilters.seats}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white appearance-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Any Seats</option>
              <option value="2">2 seats</option>
              <option value="4">4 seats</option>
              <option value="5">5 seats</option>
              <option value="7">7 seats</option>
              <option value="8">8+ seats</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Search Filter */}
        <div className="md:col-span-2 space-y-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              value={safeFilters.search}
              onChange={handleChange}
              placeholder="Search by model or brand..."
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 pl-10 pr-4 py-3 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
        </div>
        
        {/* Sort Option */}
        <div className="space-y-2">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort"
              name="sort"
              value={safeFilters.sort}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white appearance-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reset button */}
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setFilters({})}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition duration-200 text-sm font-medium flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset Filters
        </button>
      </div>
    </div>
  );
}