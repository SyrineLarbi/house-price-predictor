import { useState } from 'react'
import './App.css'
import HousePriceForm from './components/HousePriceForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HousePriceForm/>
    </div>
  );
}

export default App
