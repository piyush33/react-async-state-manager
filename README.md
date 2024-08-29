## react-async-state-manager

A React hook for asynchronous state management. This hook allows you to use `await` when setting state, ensuring that the state update is complete before moving on to the next operation.

## Usage

Here’s an example of how to use the `useAsyncState` hook:

```javascript
import React from "react";
import { useAsyncState } from "react-async-state-manager";

const ExampleComponent = () => {
  const [getInput, setInput] = useAsyncState("");

  const makeApiCall = () => {
    const y = getInput();  // This will fetch the most recent state value
    console.log("y:", y);
  };

  const handleInputChange = async (event) => {
    await setInput(event.target.value);
    makeApiCall();  // Uses the most recent state value
    console.log("variable has been updated:", getInput());  // Uses the most recent state value
  };

  return (
    <>
      <input type="text" value={getInput()} onChange={handleInputChange} />
      <div>{getInput()}</div>
    </>
  );
};

export default ExampleComponent;
```

## Installation

Install the library using npm:

```bash
npm install react-async-state-manager
```
