import { useState, useEffect } from "react";

// Hook
function useDebounce<n>(value: n, delay: number): n {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<n>(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time useEffect is re-called.
      // useEffect will only be re-called if value or delay changes.
      // This is how we prevent debouncedValue from changing if value is changed within the delay period.
      // Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value or delay changes
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;
