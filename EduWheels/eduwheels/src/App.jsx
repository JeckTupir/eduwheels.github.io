import { useState } from 'react'
import './App.css'
import RoutesComponent from './Routes';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <RoutesComponent/>
      </div>
  )
}

export default App
