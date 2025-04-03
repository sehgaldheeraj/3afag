import React, { useState } from "react";

const Navbar = () => {
  //let count = 0;
  const [count, setCount] = useState(0);
  function handleIncrement() {
    setCount(count + 1);
    console.log(count);
  }
  function handleDecrement() {
    setCount(count - 1);
    console.log(count);
  }
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
    </div>
  );
};

export default Navbar;
