import React from 'react'
import ConnectWallet from "../components/Forms/ConnectWallet"
import "./Style.css"
const NavBar = () => {
  return (
<div className="nav">
<nav>
       <h1 className='text-center' style={{color:"#fff"}}>Logo</h1>
      
    </nav>
    <ConnectWallet/>
</div>
    

    
  )
}

export default NavBar