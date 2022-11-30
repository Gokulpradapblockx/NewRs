import React from 'react'
import "./Home.css"
const Button = ({name}) => {
  return (
    <button style={{border: "none", fontSize: "20px", padding: "12px"}}>{name}</button>
  )
}

export default Button