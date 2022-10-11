import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'
import RentalItem from '../rental_comps/rentalItem';
import { toast } from 'react-toastify';

function SearchRentalCars(props){
  const [ar,setAr] = useState([]); 
  const [whatSearch,setWhatSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  let location = useLocation();
  let nav = useNavigate();
  
  useEffect(() => {
    setShowLoading(true);
    doApi()
  },[location])

  const doApi = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get("s") || "";
    setWhatSearch(searchQuery);
    let url = API_URL+"/rental/search?s="+searchQuery;
    let resp = await doApiGet(url);
    setAr(resp.data);
    setShowLoading(false);
  }

  return(
    <div className='container-fluid pb-4' style={{ minHeight: "85vh" }}>
      <div className="container">
      <div style={{ minHeight: "10vh" }}></div>
        <h1 className='text-center my-4 gradi'>"{whatSearch}":</h1>
        {showLoading ? <h2 className='text-center'><div className='text-center mt-4'> <BeatLoader/> </div></h2> : ""}
        {ar.length === 0 && !showLoading ? 
        toast.error("Search not match, try another query") &&
        nav("/rentalCat")
        : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <RentalItem key={item._id} item={item} />
            )
          })}
        </div>
        <div style={{ minHeight: "10vh" }}></div>
      </div>
    </div>
  )
}
// Search not match, try another query
export default SearchRentalCars