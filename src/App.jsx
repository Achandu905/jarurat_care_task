import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Program } from './Program'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Program/>
    </>
  )
}

export default App
