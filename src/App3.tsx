import { useState, memo } from 'react'

// 定义 props 类型
interface ChildProps {
  title: string
  value: number
  user?: { name: string; age: number }
}

// 子组件 - 使用 React.memo() 优化（默认浅比较）
// memo 会浅比较 props，只有当 props 改变时才重新渲染
const Child = memo(function Child({ title, value, user }: ChildProps) {
  console.log('子组件 Child 重新渲染了！', { title, value, user })
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #4CAF50', 
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: '#f0f8f0'
    }}>
      <h3>子组件 (Child) - 使用默认浅比较</h3>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Value:</strong> {value}</p>
      {user && (
        <p><strong>User:</strong> {user.name} ({user.age} 岁)</p>
      )}
      <p>时间戳: {new Date().toLocaleTimeString()}</p>
    </div>
  )
})

// 子组件 - 使用 React.memo() 的第二个参数（自定义比较函数）
// 自定义比较函数：返回 true 表示 props 相等（不重新渲染），返回 false 表示 props 不相等（需要重新渲染）
const ChildWithCustomCompare = memo(function ChildWithCustomCompare({ title, value, user }: ChildProps) {
  console.log('子组件 ChildWithCustomCompare 重新渲染了！', { title, value, user })
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #FF6B6B', 
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: '#ffe0e0'
    }}>
      <h3>子组件 (ChildWithCustomCompare) - 使用自定义比较函数</h3>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Value:</strong> {value}</p>
      {user && (
        <p><strong>User:</strong> {user.name} ({user.age} 岁)</p>
      )}
      <p>时间戳: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}, function areEqual(prevProps, nextProps) {
  // 自定义比较函数
  // 返回 true 表示 props 相等，组件不需要重新渲染
  // 返回 false 表示 props 不相等，组件需要重新渲染
  
  console.log('🔍 自定义比较函数执行了', {
    prevProps,
    nextProps,
    titleEqual: prevProps.title === nextProps.title,
    valueEqual: prevProps.value === nextProps.value,
    userEqual: prevProps.user?.name === nextProps.user?.name && 
               prevProps.user?.age === nextProps.user?.age
  })
  
  // 比较 title（字符串）
  if (prevProps.title !== nextProps.title) {
    console.log('  ❌ title 不同，需要重新渲染')
    return false
  }
  
  // 比较 value（数字）
  if (prevProps.value !== nextProps.value) {
    console.log('  ❌ value 不同，需要重新渲染')
    return false
  }
  
  // 深度比较 user 对象（比较对象的属性值，而不是引用）
  if (prevProps.user && nextProps.user) {
    if (prevProps.user.name !== nextProps.user.name || 
        prevProps.user.age !== nextProps.user.age) {
      console.log('  ❌ user 对象内容不同，需要重新渲染')
      return false
    }
  } else if (prevProps.user !== nextProps.user) {
    // 一个存在，一个不存在
    console.log('  ❌ user 存在性不同，需要重新渲染')
    return false
  }
  
  // 所有 props 都相等，不需要重新渲染
  console.log('  ✅ 所有 props 都相等，跳过重新渲染')
  return true
})

// 父组件
function App3() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')
  const [childTitle, setChildTitle] = useState('子组件标题')
  const [childValue, setChildValue] = useState(100)
  const [user, setUser] = useState({ name: '张三', age: 20 })
  
  console.log('父组件 App3 重新渲染了！count =', count)
  
  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '600px', 
      margin: '50px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>React.memo() 第二个参数（自定义比较函数）演示</h1>
      
      <div style={{ 
        padding: '20px', 
        border: '2px solid #2196F3', 
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: '#e3f2fd'
      }}>
        <h2>父组件 (App3)</h2>
        <p>计数: <strong>{count}</strong></p>
        <p>名称: <strong>{name}</strong></p>
        <p>子组件 Title: <strong>{childTitle}</strong></p>
        <p>子组件 Value: <strong>{childValue}</strong></p>
        <p>User: <strong>{user.name} ({user.age} 岁)</strong></p>
        <p>时间戳: {new Date().toLocaleTimeString()}</p>
        
        <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            增加计数 (+1)
          </button>
          
          <button 
            onClick={() => setName(name === 'React' ? 'Vue' : 'React')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            切换名称
          </button>
          
          <button 
            onClick={() => setChildTitle(childTitle === '子组件标题' ? '新标题' : '子组件标题')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            改变子组件 Title
          </button>
          
          <button 
            onClick={() => setChildValue(childValue + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            改变子组件 Value
          </button>
          
          <button 
            onClick={() => setUser({ ...user, age: user.age + 1 })}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#E91E63',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            改变 User 对象（新对象）
          </button>
          
          <button 
            onClick={() => {
              // 直接修改对象属性，但引用不变（浅比较检测不到）
              user.age += 1
              setUser(user)
            }}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            改变 User 对象（同一引用）⚠️
          </button>
          
          <button 
            onClick={() => {
              // 创建一个内容相同但引用不同的对象（浅比较会认为不同，但自定义比较函数可以检测到相同）
              setUser({ name: user.name, age: user.age })
            }}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#00BCD4',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            创建相同内容的 User 对象（新引用）🔄
          </button>
        </div>
      </div>
      
      {/* 子组件 - 使用默认浅比较 */}
      <Child title={childTitle} value={childValue} user={user} />
      
      {/* 子组件 - 使用自定义比较函数（深度比较） */}
      <ChildWithCustomCompare title={childTitle} value={childValue} user={user} />
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#d4edda',
        border: '1px solid #28a745',
        borderRadius: '4px'
      }}>
        <p><strong>✅ React.memo() 浅比较 vs 自定义比较函数：</strong></p>
        <ul>
          <li><strong>点击"增加计数"或"切换名称"</strong>：两个子组件都不会重新渲染 ✅</li>
          <li><strong>点击"改变子组件 Title"</strong>：两个子组件都会重新渲染 ✅</li>
          <li><strong>点击"改变子组件 Value"</strong>：两个子组件都会重新渲染 ✅</li>
          <li><strong>点击"改变 User 对象（新对象）"</strong>：两个子组件都会重新渲染 ✅</li>
          <li><strong>点击"改变 User 对象（同一引用）⚠️"</strong>：
            <ul>
              <li>浅比较组件：<strong>不会</strong>重新渲染 ❌（检测不到变化）</li>
              <li>自定义比较组件：<strong>会</strong>重新渲染 ✅（深度比较检测到变化）</li>
            </ul>
          </li>
          <li><strong>点击"创建相同内容的 User 对象（新引用）🔄"</strong>：
            <ul>
              <li>浅比较组件：<strong>会</strong>重新渲染 ❌（引用不同）</li>
              <li>自定义比较组件：<strong>不会</strong>重新渲染 ✅（内容相同）</li>
            </ul>
          </li>
        </ul>
        <p style={{ marginTop: '10px', color: '#d32f2f' }}>
          <strong>⚠️ 注意：</strong>打开浏览器控制台可以看到每次渲染和比较的详细日志！
        </p>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px'
      }}>
        <p><strong>📚 浅比较（Shallow Comparison）原理：</strong></p>
        <ul>
          <li><strong>基本类型</strong>（string, number, boolean）：比较值是否相等</li>
          <li><strong>引用类型</strong>（object, array）：只比较引用（内存地址）是否相同，不比较内容</li>
          <li>如果 props 是对象，即使内容相同但引用不同，也会触发重新渲染</li>
          <li>如果直接修改对象属性而不创建新对象，浅比较检测不到变化</li>
        </ul>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd',
        border: '1px solid #2196F3',
        borderRadius: '4px'
      }}>
        <p><strong>📖 React.memo() 第二个参数（自定义比较函数）说明：</strong></p>
        <ul>
          <li><strong>函数签名</strong>：<code>(prevProps, nextProps) =&gt; boolean</code></li>
          <li><strong>返回值</strong>：
            <ul>
              <li>返回 <code>true</code>：表示 props 相等，组件<strong>不</strong>需要重新渲染</li>
              <li>返回 <code>false</code>：表示 props 不相等，组件<strong>需要</strong>重新渲染</li>
            </ul>
          </li>
          <li><strong>使用场景</strong>：
            <ul>
              <li>需要深度比较对象/数组的内容</li>
              <li>需要自定义比较逻辑（例如只比较某些特定属性）</li>
              <li>需要忽略某些 props 的变化</li>
            </ul>
          </li>
          <li><strong>注意事项</strong>：
            <ul>
              <li>比较函数应该是一个纯函数，不应该有副作用</li>
              <li>比较函数应该快速执行，避免复杂计算</li>
              <li>如果比较函数本身很复杂，可能不如直接重新渲染</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f3e5f5',
        border: '1px solid #9C27B0',
        borderRadius: '4px'
      }}>
        <p><strong>💡 其他解决浅比较问题的方法：</strong></p>
        <ul>
          <li><strong>使用 useMemo()</strong>：记忆化对象/数组，避免每次创建新引用</li>
          <li><strong>使用 useCallback()</strong>：记忆化函数，避免创建新的函数引用</li>
          <li><strong>使用不可变数据</strong>：总是创建新对象而不是修改现有对象</li>
        </ul>
      </div>
    </div>
  )
}

export default App3