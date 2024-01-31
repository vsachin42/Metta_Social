import React from 'react'
import "../Styles/Navbar.css"

const Navbar = () => {

    let x = document.getElementsByClassName("ul");
    console.log(x);


  return (
    <nav className='navbar'>
                <p><a href="/">Home</a></p>
                <p><a href="/">About</a></p>
                <p><a href="/">Contact</a></p>
                <p><a href="/">News</a></p>        
    </nav>
  )
}

export default Navbar