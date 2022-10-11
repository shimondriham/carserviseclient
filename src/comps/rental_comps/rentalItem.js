import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RentalItem(props) {
  let item = props.item;
  let car_ar = item.in_use;
  // console.log(props);
  const [flag,setFlag] = useState(false);

  useEffect(() => {
    checkIfUsedToday();
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  
  const checkIfUsedToday = () => {
    if(car_ar){
         for(let i=0;i<car_ar.length;i++){
      let tempStart = new Date(car_ar[i].start) 
      let tempend = new Date(car_ar[i].end)   
      let dateToday = new Date()  
      if( (tempStart <= dateToday && tempend >= dateToday) ){
        setFlag(true)
      }
      else setFlag(false)
    }
    }
 
  }

  return (
    <div className='product-item col-md-4 p-2'>
      <div className="shadow">
      <Link to={"/rentalCarInfo/" + item._id} className="text-white text-center text-decoration-none">
        <div style={{ backgroundImage: `url(${item.img_url || "/images/cover.jpg"})` }} className='product-img'>
          {flag  ?
            <div className='sold-out'>In Use</div> : ""
          }
        </div>
        <div className='p-2'>

          <h4 className='gradi'>{item.name}</h4>
          <h5>Year: {item.year}</h5>
          <div>Price For 1 Day: {item.day_price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></div>
        </div>
        </Link>
      </div>
    </div>
 
  )
}

export default RentalItem