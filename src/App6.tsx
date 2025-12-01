import { useState } from "react";

// 待办事项类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App6() {
  // 左侧：不加 key 的列表
  const [todosWithoutKey, setTodosWithoutKey] = useState<Todo[]>([
    { id: 1, text: "学习 React", completed: false },
    { id: 2, text: "学习 TypeScript", completed: false },
    { id: 3, text: "学习 Vite", completed: false },
  ]);

  // 右侧：加 key 的列表
  const [todosWithKey, setTodosWithKey] = useState<Todo[]>([
    { id: 1, text: "学习 React", completed: false },
    { id: 2, text: "学习 TypeScript", completed: false },
    { id: 3, text: "学习 Vite", completed: false },
  ]);

  // 输入框状态（用于演示焦点问题）
  const [inputValuesWithoutKey, setInputValuesWithoutKey] = useState<
    { id: number; value: string }[]
  >([
    { id: 1, value: "输入1" },
    { id: 2, value: "输入2" },
    { id: 3, value: "输入3" },
  ]);
  const [inputValuesWithKey, setInputValuesWithKey] = useState<
    { id: number; value: string }[]
  >([
    { id: 1, value: "输入1" },
    { id: 2, value: "输入2" },
    { id: 3, value: "输入3" },
  ]);

  // 添加新项到开头（会引发问题）
  const addToStartWithoutKey = () => {
    const newId = Math.max(...todosWithoutKey.map((t) => t.id)) + 1;
    setTodosWithoutKey([
      { id: newId, text: `新任务 ${newId}`, completed: false },
      ...todosWithoutKey,
    ]);
    setInputValuesWithoutKey([
      { id: newId, value: `新输入 ${newId}` },
      ...inputValuesWithoutKey,
    ]);
  };

  const addToStartWithKey = () => {
    const newId = Math.max(...todosWithKey.map((t) => t.id)) + 1;
    setTodosWithKey([
      { id: newId, text: `新任务 ${newId}`, completed: false },
      ...todosWithKey,
    ]);
    setInputValuesWithKey([
      { id: newId, value: `新输入 ${newId}` },
      ...inputValuesWithKey,
    ]);
  };

  // 删除第一项
  const removeFirstWithoutKey = () => {
    setTodosWithoutKey(todosWithoutKey.slice(1));
    setInputValuesWithoutKey(inputValuesWithoutKey.slice(1));
  };

  const removeFirstWithKey = () => {
    setTodosWithKey(todosWithKey.slice(1));
    setInputValuesWithKey(inputValuesWithKey.slice(1));
  };

  // 切换完成状态
  const toggleWithoutKey = (index: number) => {
    const newTodos = [...todosWithoutKey];
    newTodos[index].completed = !newTodos[index].completed;
    setTodosWithoutKey(newTodos);
  };

  const toggleWithKey = (id: number) => {
    setTodosWithKey(
      todosWithKey.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 更新输入框值
  const updateInputWithoutKey = (index: number, value: string) => {
    const newValues = [...inputValuesWithoutKey];
    newValues[index] = { ...newValues[index], value };
    setInputValuesWithoutKey(newValues);
  };

  const updateInputWithKey = (id: number, value: string) => {
    setInputValuesWithKey(
      inputValuesWithKey.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  };

  // 反转列表顺序（会引发严重问题）
  const reverseWithoutKey = () => {
    setTodosWithoutKey([...todosWithoutKey].reverse());
    setInputValuesWithoutKey([...inputValuesWithoutKey].reverse());
  };

  const reverseWithKey = () => {
    setTodosWithKey([...todosWithKey].reverse());
    setInputValuesWithKey([...inputValuesWithKey].reverse());
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        React Map 循环 Key 的重要性演示xxxxx
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* 左侧：不加 key */}
        <div
          style={{
            border: "3px solid #f44336",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#ffebee",
          }}
        >
          <h2 style={{ color: "#d32f2f", marginTop: 0 }}>
            ❌ 不加 Key（有问题）
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <button
              onClick={addToStartWithoutKey}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              添加到开头
            </button>
            <button
              onClick={removeFirstWithoutKey}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              删除第一项
            </button>
            <button
              onClick={reverseWithoutKey}
              style={{
                padding: "8px 16px",
                backgroundColor: "#9c27b0",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              反转列表
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>待办事项列表：</h3>
            {todosWithoutKey.map((todo, index) => (
              <div
                key={index} // ❌ 使用 index 作为 key（错误做法）
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleWithoutKey(index)}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#999" : "#000",
                    }}
                  >
                    {todo.text}
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3>输入框列表（演示焦点问题）：</h3>
            <p style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>
              尝试在输入框中输入内容，然后点击"添加到开头"或"删除第一项"
            </p>
            {inputValuesWithoutKey.map((item, index) => (
              <div
                key={index} // ❌ 使用 index 作为 key
                style={{
                  marginBottom: "10px",
                }}
              >
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => updateInputWithoutKey(index, e.target.value)}
                  placeholder={`输入框 ${index + 1}`}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#fff3cd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <strong>⚠️ 问题表现：</strong>
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              <li>复选框状态会错乱</li>
              <li>输入框内容会错位</li>
              <li>输入框焦点会丢失</li>
              <li>React 无法正确追踪组件实例</li>
            </ul>
          </div>
        </div>

        {/* 右侧：加 key */}
        <div
          style={{
            border: "3px solid #4CAF50",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#e8f5e9",
          }}
        >
          <h2 style={{ color: "#2e7d32", marginTop: 0 }}>
            ✅ 加 Key（正确做法）
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <button
              onClick={addToStartWithKey}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              添加到开头
            </button>
            <button
              onClick={removeFirstWithKey}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              删除第一项
            </button>
            <button
              onClick={reverseWithKey}
              style={{
                padding: "8px 16px",
                backgroundColor: "#9c27b0",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              反转列表
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>待办事项列表：</h3>
            {todosWithKey.map((todo) => (
              <div
                key={todo.id} // ✅ 使用唯一 id 作为 key（正确做法）
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleWithKey(todo.id)}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#999" : "#000",
                    }}
                  >
                    {todo.text}
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3>输入框列表（正常行为）：</h3>
            <p style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>
              尝试在输入框中输入内容，然后点击"添加到开头"或"删除第一项"
            </p>
            {inputValuesWithKey.map((item) => (
              <div
                key={item.id} // ✅ 使用唯一 id 作为 key（正确做法）
                style={{
                  marginBottom: "10px",
                }}
              >
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => updateInputWithKey(item.id, e.target.value)}
                  placeholder={`输入框 ${item.id}`}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#d1ecf1",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <strong>✅ 正确表现：</strong>
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              <li>复选框状态正确保持</li>
              <li>输入框内容正确对应</li>
              <li>输入框焦点正确保持</li>
              <li>React 正确追踪每个组件实例</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 详细说明 */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>为什么需要 Key？</h2>
        <div style={{ lineHeight: "1.8" }}>
          <h3>1. 组件实例识别</h3>
          <p>
            React 使用 key 来识别哪些元素改变了、添加了或删除了。没有 key
            时，React 只能通过索引位置来匹配元素，导致：
          </p>
          <ul>
            <li>
              <strong>状态错乱：</strong>
              当列表顺序改变时，组件状态会"跟随"DOM 位置而不是数据本身
            </li>
            <li>
              <strong>性能问题：</strong>
              React 无法正确识别哪些元素是新的、哪些是旧的，导致不必要的重新渲染
            </li>
          </ul>

          <h3>2. 常见问题场景</h3>
          <ul>
            <li>
              <strong>输入框焦点丢失：</strong>
              当你在第一个输入框中输入内容，然后添加新项到开头，焦点会跳到错误的输入框
            </li>
            <li>
              <strong>复选框状态错乱：</strong>
              勾选第一个复选框，删除它后，第二个复选框会变成已勾选状态
            </li>
            <li>
              <strong>动画问题：</strong>
              CSS 过渡动画会应用到错误的元素上
            </li>
            <li>
              <strong>表单数据错位：</strong>
              表单输入值会绑定到错误的组件实例
            </li>
          </ul>

          <h3>3. Key 的选择原则</h3>
          <ul>
            <li>
              <strong>✅ 使用唯一且稳定的标识符：</strong>
              如数据库 ID、UUID 等
            </li>
            <li>
              <strong>✅ 在列表项的生命周期内保持不变：</strong>
              即使数据更新，key 也不应该改变
            </li>
            <li>
              <strong>❌ 不要使用数组索引：</strong>
              当列表顺序可能改变时，索引会变化
            </li>
            <li>
              <strong>❌ 不要使用随机数：</strong>
              每次渲染都会生成新的 key，导致组件被销毁和重建
            </li>
          </ul>

          <h3>4. 性能影响</h3>
          <p>
            没有 key 时，React 的 diff 算法效率低下，可能导致：
          </p>
          <ul>
            <li>不必要的 DOM 操作</li>
            <li>组件状态丢失和重建</li>
            <li>大量重新渲染</li>
            <li>用户体验变差（闪烁、卡顿）</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App6;

