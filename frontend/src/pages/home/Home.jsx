import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='home'>
        <div className='home-content'>
          <h1>Welcome!</h1>
          <p>Start learning!</p>
          <button onClick={()=>{navigate("/courses")}} className='btn'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Home