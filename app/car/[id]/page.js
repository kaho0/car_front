// app/cars/[id]/page.js
import React from 'react';
import { notFound } from 'next/navigation';

async function getCar(id) {
  const res = await fetch('/cars.json');
  const data = await res.json();
  return data.cars.find(car => car.id.toString() === id);
}

export default async function CarDetailsPage({ params }) {
  const car = await getCar(params.id);
  
  if (!car) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img 
            src={car.image || '/placeholder-car.jpg'} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
          <p className="text-xl text-gray-500 mb-6">{car.year}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-2xl text-pink-500">${car.price.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Fuel Type</h3>
              <p>{car.fuel}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seats</h3>
              <p>{car.seats}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {car.description || 'No description available.'}
            </p>
          </div>

          {car.features && car.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}