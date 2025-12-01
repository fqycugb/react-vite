// 简单计数器
import { useState } from "react";
function App2() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => {
        console.log('Increment');
        setCount(prev => prev + 1);
        setCount(prev => prev + 2);
        setCount(prev => prev + 3);
        setCount(prev => prev + 4);
        setCount(prev => prev + 1);
      }}>Increment</button>
      <button onClick={() => {
        console.log('Decrement');
        setCount(count - 1);
      }}>Decrement</button>
    </div>
  );
}

export default App2;
