import React from "react";
import useStore from "./store/useStore";

const App = () => {
  const count = useStore((state) => state.count);
  const increase = useStore((state) => state.increase);
  const reset = useStore((state) => state.reset);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Zustand Counter Test</h2>
      <p>Count: {count}</p>
      <button onClick={increase}>Increase</button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
};

export default App;
