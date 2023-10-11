import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { NavLink, useLocation } from 'react-router-dom'
import navStyles from './Nav.module.css'

const Navbar = () => {
  const currentPath = useLocation();

  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navLinks}>
        <NavLink to="/home" className={({isActive}) => isActive ? navStyles.active : ""}>Home</NavLink>
        <NavLink to="/create" className={({isActive}) => isActive ? navStyles.active : ""}>Create</NavLink>
      </div>
      {currentPath.pathname === "/home" && <Searchbar/>}
    </div>
  )
}

export default Navbar