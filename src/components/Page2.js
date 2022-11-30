import React from 'react'
import { Link } from 'react-router-dom'
// import Button from './Button'
import "./Style.css"
const Page2 = () => {
  return (
    <div className="container-fluid">
    <div className="container">
    <div className='text-center entry-page'>
    <h3>STEP TWO</h3>
  </div>
<section>
       <div className="btn1">
        
        <Link to="/u"><button style={{backgroundColor : "rgb(105, 200, 31)"}}>USERS</button></Link>
       </div>
      <div className="btn2">
        <Link to="/p"><button style={{backgroundColor : "rgb(105, 200, 31)"}}>PROPERTY MANAGERS</button></Link>
      </div>
   </section>
   </div>
  </div>
  )
}

export default Page2