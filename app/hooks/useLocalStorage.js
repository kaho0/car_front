import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch a custom event to notify other components about the change
        const event = new CustomEvent('localStorageChange', {
          detail: { key, value: valueToStore }
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Listen for changes in other components
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleStorageChange = (event) => {
      if (event.detail && event.detail.key === key) {
        setStoredValue(event.detail.value);
      }
    };
    
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}