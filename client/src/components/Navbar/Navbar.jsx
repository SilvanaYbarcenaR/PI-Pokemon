import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { useLocation } from 'react-router-dom'
import Filters from '../Filters/Filters';

const Navbar = () => {
  const currentPath = useLocation();

  return (
    <>
      {currentPath.pathname === "/home" && <Searchbar/>}
      <Filters/>
    </>
  )
}

export default Navbar