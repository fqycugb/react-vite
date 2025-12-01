import { useReducer } from "react";

// 商品类型定义
interface Product {
  id: number;
  name: string;
  price: number;
}

// 购物车商品类型（包含数量）
interface CartItem extends Product {
  quantity: number;
}

// 购物车状态类型
interface CartState {
  items: CartItem[];
  total: number;
}

// Action 类型定义
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREMENT_QUANTITY"; payload: number }
  | { type: "DECREMENT_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" };

// 初始状态
const initialState: CartState = {
  items: [],
  total: 0,
};

// Reducer 函数：处理所有状态更新逻辑
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        // 如果商品已存在，增加数量
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果商品不存在，添加新商品
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // 计算总价
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: newItems, total };
    }

    case "INCREMENT_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: newItems, total };
    }

    case "DECREMENT_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0); // 移除数量为0的商品
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: newItems, total };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

// 示例商品数据
const products: Product[] = [
  { id: 1, name: "苹果", price: 5.5 },
  { id: 2, name: "香蕉", price: 3.2 },
  { id: 3, name: "橙子", price: 4.8 },
  { id: 4, name: "葡萄", price: 12.0 },
];

function App5() {
  // 使用 useReducer 管理购物车状态
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Action 创建函数（可选，但推荐使用，使代码更清晰）
  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const incrementQuantity = (id: number) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  };

  const decrementQuantity = (id: number) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>购物车 Demo - useReducer 示例</h1>

      {/* 商品列表 */}
      <div style={{ marginBottom: "30px" }}>
        <h2>商品列表</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3>{product.name}</h3>
              <p style={{ color: "#666", fontSize: "18px", fontWeight: "bold" }}>
                ¥{product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addItem(product)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                加入购物车
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 购物车 */}
      <div
        style={{
          border: "2px solid #333",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>购物车</h2>
          {cartState.items.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              清空购物车
            </button>
          )}
        </div>

        {cartState.items.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>
            购物车是空的
          </p>
        ) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              {cartState.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    marginBottom: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 5px 0" }}>{item.name}</h3>
                    <p style={{ margin: 0, color: "#666" }}>
                      单价: ¥{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#ff9800",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          minWidth: "30px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div
                      style={{
                        minWidth: "100px",
                        textAlign: "right",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        ¥{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "2px solid #333",
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>总计:</h2>
              <h2 style={{ margin: 0, color: "#4CAF50" }}>
                ¥{cartState.total.toFixed(2)}
              </h2>
            </div>
          </>
        )}
      </div>

      {/* 说明 */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h3>useReducer 的优势：</h3>
        <ul>
          <li>
            <strong>集中管理状态逻辑：</strong>
            所有状态更新逻辑都在 reducer 函数中，易于维护和测试
          </li>
          <li>
            <strong>可预测的状态更新：</strong>
            通过 action 类型明确表达状态变更意图
          </li>
          <li>
            <strong>复杂状态处理：</strong>
            适合处理多个相关状态值（如购物车的商品列表和总价）
          </li>
          <li>
            <strong>易于扩展：</strong>
            添加新的 action 类型即可扩展功能
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App5;

