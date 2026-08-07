"use client";

import { useEffect, useState, useCallback } from "react";

function getItemFromLocalStorage(key: string) {
  const item = window.localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  }

  return null;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    // initialize
    if (typeof window !== "undefined") {
      const stored = getItemFromLocalStorage(key);
      if (stored !== null) setStoredValue(stored);
    }
  }, [key]);

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    value => {
      if (typeof value === "function") {
        setStoredValue((prev: T) => {
          const newValue = value(prev);
          // Save to localStorage
          window.localStorage.setItem(key, JSON.stringify(newValue));
          return newValue;
        });
      } else {
        setStoredValue(value);
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
