import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { checkVisitedLocal, VISITED_VEHICLES } from '../../services/localService';
import RentalItem from './rentalItem';

function VehiclesRental(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    // check if there products saved in the local that user visited in
    let vistedVehicles = checkVisitedLocal();
    
    let url;
    if(vistedVehicles){
     url = API_URL+"/rental/visited?visited="+ vistedVehicles;
    }
    else{
      url = API_URL+"/rental/?perPage=3";
    }
    let resp = await doApiGet(url);
    setAr(resp.data);
    console.log(resp.data);
  }


  return(
    <div className='container py-4'>
      {localStorage[VISITED_VEHICLES] ? 
        <h2 className='text-center text-info gradi'>Vehicles you intersted in</h2> :
      <h2 className='text-center'>
        New vehicles on our site
      </h2>
    }
      <div className="row">
        {ar.map(item => {
          return(
            <RentalItem key={item._id} item={item} />
          )
        })}
      </div>
    </div> 
  )
}

export default VehiclesRental