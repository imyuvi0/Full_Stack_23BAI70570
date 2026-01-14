import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class ="Container">
      <div class="box">
      <h1>Counter</h1>
    <p>Count: {count}</p>
    <button class="minus" onClick={() => setCount(count - 1)}>-</button>
    <button class="plus" onClick={() => setCount(count + 1)}>+</button>
    </div> 
    </div>
       
  )
}

export default App
