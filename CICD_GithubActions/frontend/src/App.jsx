import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(API_URL)

fetch(`${API_URL}/api/your-route`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

  const handleBackend=async()=>{
    try {
      const res = await fetch(`${API_URL}/check`);
      const data = await res.json();
      alert(`Backend says: ${data.message}`);
    } catch (err) {
      console.error(err);
      alert('Backend not responding');
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <h2 onClick={handleBackend}>Check Backend</h2>
    </>
  )
}

export default App
