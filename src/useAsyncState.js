import { useState, useEffect, useRef } from "react";

function useAsyncState(initialValue) {
  const [state, setState] = useState(initialValue);
  const resolveRef = useRef(null);
  const isInitialMount = useRef(true); // Track if it's the initial render
  const stateRef = useRef(initialValue);

  const setAsyncState = (newValue) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve; // Store the resolve function
      setState(newValue); // Trigger state update
      stateRef.current = newValue;
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the first run (initial render)
      isInitialMount.current = false;
    } else if (resolveRef.current && !isInitialMount.current) {
      // Only resolve the promise after a state update

      resolveRef.current(state); // Resolve the promise with the updated state
      resolveRef.current = null; // Reset the ref after resolving
    }
  }, [state]); // This effect runs after state has been updated

  // Return the function that provides the current state, not the value itself
  const getCurrentState = () => stateRef.current;

  return [getCurrentState, setAsyncState];
}

export default useAsyncState;
