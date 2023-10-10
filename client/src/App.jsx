import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail';
import Create from './views/Create/Create';

const App = () => {
  const currentPath = useLocation();
  return (
    <div>
      {(currentPath.pathname !== "/" && currentPath.pathname !== "/error") && <Navbar/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default App;