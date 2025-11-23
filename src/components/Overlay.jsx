import React from 'react'
// import "../Stylesheets/Overlay.css"
export default function Overlay({setIsProfileOpen}) {
  return (
    <div 
    onClick={()=> setIsProfileOpen(false)}
    className="fixed inset-0 bg-black opacity-25  bg-opacity-50 z-50 border-3 border-blue-700"></div>
  )
}
