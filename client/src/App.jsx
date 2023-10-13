import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail';
import Create from './views/Create/Create';
import video from './assets/videos/pokeballBG.mp4';
import videoDetail from './assets/videos/landscape.mp4';

const App = () => {
  const currentPath = useLocation();
  return (
    <div className={`App ${currentPath.pathname !== "/" && "internal"} 
    ${currentPath.pathname.includes("detail") && "detail"}`}>
      {!currentPath.pathname.includes("detail") && 
        <video className="videoBg" autoPlay loop muted>
          <source src={video} type="video/mp4"/>
        </video>
      }
      {currentPath.pathname.includes("detail") && 
        <video className="videoBg" autoPlay loop muted>
          <source src={videoDetail} type="video/mp4"/>
        </video>
      }
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