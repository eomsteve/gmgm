import React from 'react'
import LandingImg from '../../assets/gmgm_landing.png';
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className='fixed bg-white'>
      <img className='object-fill h-screen fade-out' src={LandingImg} alt='landingImg'></img>
    </div>
  )
}
