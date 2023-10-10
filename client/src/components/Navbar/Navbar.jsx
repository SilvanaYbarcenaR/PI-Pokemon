import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { NavLink, useLocation } from 'react-router-dom'
import Filters from '../Filters/Filters';
import navStyles from './Nav.module.css'

const Navbar = () => {
  const currentPath = useLocation();

  return (
    <>
      <NavLink to="/home" className={({isActive}) => isActive ? navStyles.active : ""}>Home</NavLink>
      {currentPath.pathname === "/home" && <><Searchbar/><Filters/></>}
    </>
  )
}

export default Navbar