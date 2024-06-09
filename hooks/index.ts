import { useEffect, useRef } from 'react';

// Custom hook to get previous state
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
