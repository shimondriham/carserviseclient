import React from 'react';
import HomeStrip from './homeStrip';
import "./../css/home.css"
import HomeMain from './../general_comps/homeMain';

function Home(props){
  return(
    <div className='home'>
      <HomeStrip />
      <HomeMain />
    </div> 
  )
}

export default Home