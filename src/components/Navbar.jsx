import 'daisyui';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import React from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Header() {
  
  const [theme,setTheme] = React.useState('light')
  const handleToggle = (e) =>{
    if(e.target.checked){
      setTheme('synthwave')
    }else{
      setTheme('light')
    }
  }

  useEffect(()=>{
    localStorage.setItem('theme',theme)
    const localtheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme',localtheme)
  },[theme])



  
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // console.log('auth',auth.roles[0])


  const logout = async () => {
    setAuth({});
    navigate('/login');
  }

  return (
    <>
      <div className="relative navbar  mb-20 bg-base-100 shadow-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Book</a></li>
        <li>
          <a>Experience</a>
          <ul className="p-2">
            <li><a>Local Flights </a></li>
            <li><a>International Flights</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost text-2xl text-blue-500">SkyBound-Innovations</Link>
    <input onChange={handleToggle} type="checkbox" className="toggle theme-controller"/>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Book</a></li>
      <li>
        <details>
          <summary>Experience</summary>
          <ul className="p-2">
            <li><a>Local Flights</a></li>
            <li><a>International Flights</a></li>
          </ul>
        </details>
      </li>
      <li><a>Help</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  {(() => {
  if (auth?.username) {
    if (auth?.roles[0] === 313) {
      
      return (
        <div className='flex space-x-4'>
          <NavLink to='_/Dashboard' className={({isActive})=> isActive ? 'text-primary font-extrabold' : 'font-bold'}>Admin Dashboard</NavLink>
          <span className="p-5"><b>Welcome {auth?.username}</b></span>
          <button className="btn" onClick={logout}>Logout</button>
          
          <FontAwesomeIcon icon={faShoppingCart} />

        </div>
      );
    } else {
      // Render components for other authenticated users
      return (
        <>
          <NavLink to='/user/userProfile' className={({isActive})=> isActive ? 'text-primary font-extrabold' : 'font-bold'}>Dashboard</NavLink>
          <span className="p-5"><b>Welcome {auth?.username}</b></span>
          <button className="btn" onClick={logout}>Logout</button>
          <Link to='/user/cart'>
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          

        </>
      );
    }
  } else {
    // Render components for unauthenticated users
    return (
      <>
        <NavLink to='/login' className="btn shadow-lg mr-8">Login</NavLink>
        <NavLink to='/signup' className="btn shadow-lg mr-8 font-bold">Signup</NavLink>
        
      </>
    );
  }
})()}

  </div>
</div>
    </>
  )
}
