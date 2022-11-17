import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import { BeatLoader } from 'react-spinners'
import VehiclesRental from './vehiclesRental';

function RentalCat(props) {
  const [ar, setAr] = useState([]);
  let inputRef = useRef()
  let nav = useNavigate()

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/categoriesRental";
    let resp = await doApiGet(url);
    setAr(resp.data);
  };

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    if (input_val) {
      nav("/rentalSearch?s=" + input_val);
    }
  };

  return (
    <div className='container-fluid mb-5'>
      <div style={{ minHeight: "13vh" }}></div>
      <div className='container py-4 categories_list'>
        <h2 className='text-center gradi text-uppercase'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>OUR categories</h2>
        <div>
          <div className=" d-flex inp form__group field">
            <input onKeyDown={onKeyboardClick} className='form__field my-2' ref={inputRef} placeholder='Type car name...' type="search" />
            <button onClick={onSearchClick} className='btn text-white'><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>

        {ar.length === 0 ? <div className='text-center mt-4'> <BeatLoader /> </div> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <Link to={"/rental/" + item.url_name} key={item._id} className='myCard col-md-4 p-3'>
                <div className="shadow bg-dark gradi">
                  <div style={{ backgroundImage: `url(${item.img_url || "/images/cover1.jpg"})` }} className='img_card'></div>
                  <h3 className='text-center p-3'>{item.name}</h3>
                </div>
              </Link>)
          })}
        </div>
        <VehiclesRental />
      </div>
    </div>
  )
};

export default RentalCat;