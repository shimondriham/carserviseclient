import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import { toast } from 'react-toastify';
import { checkTokenLocal } from "../../services/localService";
import PremiumMessage from './premiumMessage';

function CooperativeItem(props) {

  const [user, setUser] = useState("");
  const [product, setProduct] = useState({});
  const [saller, setSaller] = useState({});
  const [premium, setPremium] = useState(false);
  const [premiumMessgae, setPremiumMessage] = useState(false);
  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    doApi();
    doApiUser()
    checkPremium();
  }, [location])// eslint-disable-line react-hooks/exhaustive-deps

  const doApiUser = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setUser(resp.data)
  }

  const doApi = async () => {
    let url = API_URL + "/cooperative/single/" + params.id;
    let resp = await doApiGet(url);
    setProduct(resp.data)
    doSallerDetails(resp.data)
  }

  const doSallerDetails = async (_data) => {
    let url = API_URL + "/users/single/" + _data.user_id;
    let resp = await doApiGet(url);
    setSaller(resp.data)
  }

  const checkPremium = async () => {
    if (checkTokenLocal()) {
      let url = API_URL + "/users/checkRole";
      let resp = await doApiGet(url);
      if (resp.data.status === "ok") {
        setPremium(true)
      }
    }
  }
  
  return (
    <div className='container p-4' style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "28vh" }}></div>
      {premiumMessgae ? <PremiumMessage /> : null}
      <div className="row">
        <div className="col-md-4 mt-4">
          <img src={product.img_url || "/images/cover.jpg"} alt={product.name} className='img-fluid img-thumbnail shadow' />
        </div>
        <div className="col-md-8">
          <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>{product.name}</h1>
          <p className='mt-1 text-center'> {product.info}</p>
          <h5 className='text-center'>Price for 1 Hour: {product.day_price} <i className="fa fa-ils text-white" aria-hidden="true"></i></h5>
          <h4 className='text-center mt-3 mb-3'>Year: {product.year} </h4>

          <div className='btn-details text-center'>
            <button className='btn btn-outline-info' onClick={() => {
              if (premium || saller._id === user._id) {
                let details = document.querySelector('.details')
                let btn = document.querySelector('.btn-details')
                details.classList.add("d-block")
                btn.classList.add("d-none")
                details.classList.remove("d-none")
              }
              else {
                toast.dark("You Need to be premium user for see the details")
                setPremiumMessage(true)
              }
            }}>Show seller details</button>
          </div>

          <div className='details mt-5 text-center d-none'>
            <h3 className='text-decoration-underline'>Seller details:</h3>
            <h4><i className="fa fa-user me-3" aria-hidden="true"></i>{saller.first_name} {saller.last_name}</h4>
            <h4><i className="fa fa-phone me-3" aria-hidden="true"></i>{saller.phone}</h4>
          </div>
          <div className='text-center'>
            <button onClick={() => {
              nav(-1);
            }} className='btn btn-outline-light mt-3'>Back to map<i className="fa fa-map-marker ms-2" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
      <div style={{ minHeight: "6vh" }}></div>
    </div>
  )
}

export default CooperativeItem;