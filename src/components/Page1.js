import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import "./Style.css"
const Page1 = () => {
  return (
    <div className="container-fluid">
    <div className="container">
    <div className='text-center entry-page'>
    <h3>STEP TWO</h3>
  </div>
<section>
       <div className="btn1">
        <Link to="/v"><Button name="VOUCHER HOLDERS"/></Link>
       </div>
      <div className="btn2">
        
        <Link to="/a"> <Button name="AFFORDABLE HOUSING OWNERS"/></Link>     
      </div>
   </section>
   </div>
  </div>
  )
}

export default Page1