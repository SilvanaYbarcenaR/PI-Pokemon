import { Routes, Route } from 'react-router-dom';
import Home from './views/HOme/Home';
import Landing from './views/Landing/Landing';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
