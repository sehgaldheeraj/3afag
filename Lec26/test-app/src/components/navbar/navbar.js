import React, { useState, useEffect } from "react";

const Navbar = ({ incrementor, setIncrementor }) => {
  //let count = 0;

  /**
   * Side-effects
   * 1. API requests
   * 2. Handling Timers
   * 3. Handling Callbacks
   *
   * To handle Side-Effects, React provides you a hook: useEffect
   * Syntax:
   * useEffect(()=>{}, [])  i) CB fn ii) Dependency array
   * Whenever Dependency array updates, CB fn gets called
   * All kind of useEffects run for the very first time
   */

  /**
   * REACT Component goes through 3 phases in its lifetime:
   * 1. Mount Phase
   *    App() component runs for the very first time
   * 2.Update Phase
   *    State change triggers re-run of App() component
   * 3.Unmount Phase
   *    App() component exits call stack
   */
  const [count, setCount] = useState(0);

  //MOUNT PHASE
  useEffect(() => {
    console.log("MOUNT PHASE: Empty Dependency Array");
  }, []);
  useEffect(() => {
    console.log("UPDATE PHASE: Filled Dependency Array");
  }, [count]);
  useEffect(() => {
    return () => {
      console.log("UNMOUNT PHASE: Returning a callback function");
    };
  }, []);

  function handleIncrement() {
    setCount(count + parseInt(incrementor));
    console.log(count);
  }
  function handleDecrement() {
    setCount(count - incrementor);
    console.log(count);
  }
  return (
    <div>
      <div>Count: {count}</div>
      <input
        type="number"
        value={incrementor}
        onChange={(e) => {
          setIncrementor(e.target.value);
        }}
      ></input>
      <button onClick={handleIncrement}>+{incrementor}</button>
      <button onClick={handleDecrement}>-{incrementor}</button>
    </div>
  );
};

export default Navbar;

/**
 * DEBOUNCING
 * <input
 *    onChange
 * ></input>
 * GET 'localhost:4000/v1/products?query=hair
 *setTimeout(()=>{
  
  }, 3000);
 * onChange={(event)=>{
 *   await fetch(url+`query=${event.target.value}`);
 * }}
 */
