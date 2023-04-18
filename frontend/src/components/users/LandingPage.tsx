import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LandingImg from '../../assets/gmgm_landing.png';
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const loading = setTimeout(() => {
      navigate('/');
    }, 2000);
    return(()=>{
      clearTimeout(loading)
    })
  },)
  return (
    <div className='fixed bg-white'>
      <img className='object-fill w-screen h-screen fade-out' src={LandingImg} alt='landingImg'></img>
    </div>
  )
}
