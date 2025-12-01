import { useState, useEffect } from "react";

function App4() {
  const [count, setCount] = useState(0);

  // 闭包陷阱示例：useEffect 中的闭包捕获了初始的 count 值
  useEffect(() => {
    const timer = setTimeout(() => {
      // 这里会打印出闭包捕获时的 count 值，而不是最新的值
      console.log("闭包陷阱 - 延迟打印的 count:", count);
      alert(`闭包陷阱 - 延迟打印的 count: ${count}`);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空依赖数组导致闭包陷阱（这是故意为之，用于演示）

  // 另一个闭包陷阱示例：事件处理函数
  const handleClick = () => {
    const a = 0 && 1; // false
    const b = 1 || 2; // true
    const c = null ?? "default"; // default
    const d = 0 ?? "default"; // 0
    const e = (false || undefined) ?? "last"; // last
    console.log(a, b, c, d, e);
  };

  // 正确的做法：使用函数式更新
  const handleClickCorrect = () => {
    aa()
    let newCount: number;
    setCount((prevCount) => {
      newCount = prevCount + 1;
      console.log("正确的更新 - 新值:", newCount);
      return newCount;
    });

    // 注意：这里仍然可能有问题，因为 setState 是异步的
    // 但我们可以通过闭包捕获 newCount
    setTimeout(() => {
      // 这里 newCount 是闭包捕获的值，是更新后的值
      console.log("正确的更新 - setTimeout 中的最新值:", newCount);
    }, 1000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>闭包陷阱示例</h1>
      <div style={{ marginBottom: "20px" }}>
        <p>
          当前计数: <strong>{count}</strong>
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleClick}
          style={{ marginRight: "10px", padding: "10px" }}
        >
          有闭包陷阱的按钮
        </button>
        <button onClick={handleClickCorrect} style={{ padding: "10px" }}>
          正确的按钮（使用函数式更新）
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
        }}
      >
        <h3>说明：</h3>
        <ul>
          <li>点击"有闭包陷阱的按钮"后，控制台会显示旧的 count 值</li>
          <li>页面加载 3 秒后会弹出 alert，显示闭包捕获的初始 count 值（0）</li>
          <li>"正确的按钮"使用函数式更新，避免了闭包陷阱</li>
        </ul>
      </div>
    </div>
  );
}

function aa() {
  var obj = {
    a: 20,
    say: function(this: { a: number }) {
      console.log(this);
      console.log(this.a);
    },
  };
  obj.say();

  var anotherObj = { a: 30 };
  obj.say.apply(anotherObj);
}

export default App4;
