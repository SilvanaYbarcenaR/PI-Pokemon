import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const currentPath = useLocation();

  return (
    currentPath.pathname === "/home" && <Searchbar/>
  )
}

export default Navbar