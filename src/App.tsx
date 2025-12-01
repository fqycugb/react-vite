import { useEffect } from 'react'
import './App.css'
import { a } from './data'
import Macy from 'macy'

function App() {
  useEffect(() => {
    new Macy({
      container: '#macy-container',
      trueOrder: false,
      waitForImages: false,
      useOwnImageLoader: false,
      debug: true,
      mobileFirst: true,
      columns: 3,
      margin: {
        y: 16,
        x: '2%',
      }
    });
  }, [])

  return <div id='macy-container' style={{
    width:'300px',
    height: '600px'
  }}>
    {a.map(item=>{
      return <div key={item} 
      style={{
        width:'100%'
      }}>
        <img src={item} alt="" style={{maxWidth:'100%'}}/>
      </div>
    })}
  </div>
}

export default App
