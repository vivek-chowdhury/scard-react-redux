import { useState, useEffect } from "react";

export default function useDebounce(callback, value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  /**
   * @description This hook will update value only when user stops typing and
   *  when timeout exhaust.
   */
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      if (value !== debounceValue) {
        callback(value);
        setDebounceValue(value);
      }
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, debounceValue, delay, value]);

  return debounceValue;
}
