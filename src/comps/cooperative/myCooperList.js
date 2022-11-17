import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import AuthClientComp from '../users_comps/authClientComp';

function MyCooperList(props) {
  const [ar, setAr] = useState([])
  const [flagLoading, setFlagLoading] = useState()

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    setFlagLoading(true)
    let url = API_URL + "/cooperative/myCars";
    let resp = await doApiGet(url);
    setAr(resp.data)
    setFlagLoading(false)
  }

  return (
    <div className='container-fluid mb-5' style={{ minHeight: "85vh" }}>
      <AuthClientComp />
      <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>My Cooperative Cars</h1>
        {ar.length === 0 && flagLoading ? <h2 className='text-center'><BeatLoader /></h2> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <div className='product-item col-md-4 p-2' key={item._id}>
                <div className="shadow">
                  <Link to={"/cooperative/editCar/" + item._id} className="text-white text-center text-decoration-none">
                    <div style={{ backgroundImage: `url(${item.img_url || "/images/cover.jpg"})` }} className='product-img'>
                    </div>
                    <div className='p-2'>
                      <h4>{item.name}</h4>
                      <h5>Year: {item.year}</h5>
                      <div>Price: {item.day_price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ minHeight: "3vh" }}></div>
    </div>
  )
}

export default MyCooperList;