// hooks/useFilters.js
'use client';

import { useMemo } from 'react';

export function useFilters(cars = [], filters = {}) {
  return useMemo(() => {
    let filtered = [...cars];

    if (filters.brand && filters.brand !== 'all') {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }

    if (filters.fuel && filters.fuel !== 'all') {
      filtered = filtered.filter(car => car.fuel === filters.fuel);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    if (filters.seats) {
      filtered = filtered.filter(car => car.seats === parseInt(filters.seats));
    }

    if (filters.search) {
      filtered = filtered.filter(car =>
        (car.brand + ' ' + car.model).toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Updated to match the values from Filters component
    if (filters.sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [cars, filters]);
}