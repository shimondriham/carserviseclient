import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import { addProdVisitedToLocal } from '../../services/localService';
import { AppContext } from "../../context/shopContext"
import { toast } from 'react-toastify';
import RentalItem from './rentalItem';

function RentalCarInfo(props) {
  const { setStartDate, setEndDate, sumDays, setSumDays } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [flag, setFlag] = useState(true);
  const [flagOffer, setFlagOffer] = useState(false);
  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [ar, setAr] = useState([]);


  useEffect(() => {
    doApi();

  }, [location])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/rental/single/" + params.id;
    let resp = await doApiGet(url);
    setProduct(resp.data)
    addProdVisitedToLocal(resp.data.short_id);
  }

  const onOrder = () => {
    if (sumDays > 0 && flag) {
      nav("/checkoutRental/" + product._id)
    }
    else {
      toast.error("Please choose correct Date")
    }
  }
  function isDateBeforeToday(date) {
    return new Date(date) < new Date(new Date().toDateString());
  }

  function isDateCorrectDay() {
    let start = new Date(startDateRef.current.value)
    let end = new Date(endDateRef.current.value)
    let Difference_In_Days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    setSumDays(Difference_In_Days)
    return Difference_In_Days <= 0;
  }

  const totalPrice = async () => {
    let _start = startDateRef.current.value
    let _end = endDateRef.current.value
    if (_start && _end) {
      let start = new Date(_start)
      let end = new Date(_end)
      isDateCorrectDay()
      setStartDate(_start)
      setEndDate(_end)
      if (isDateCorrectDay() || isDateBeforeToday(_start)) {
        toast.error("Please choose correct Days")
      }
      else {
        let car_ar = product.in_use;
        for (let i = 0; i < car_ar.length; i++) {
          let tempStart = new Date(car_ar[i].start)
          let tempend = new Date(car_ar[i].end)
          if ((start >= tempStart && start <= tempend) || (end >= tempStart && end <= tempend) || (start < tempStart && end > tempend)) {
            toast.error("in use")
            setFlag(false)
            doApiW();
            setFlagOffer(true)
          }
          else {
            setFlag(true)
            doApiW();
            setFlagOffer(true)
          }
        }
      }
    }
    else toast.error("Please choose Days")
  }

  const doApiW = async () => {
    let url = API_URL + "/rental/allCars";
    let resp = await doApiGet(url);
    let all_cars = resp.data;
    let start = new Date(startDateRef.current.value);
    let end = new Date(endDateRef.current.value);
    let temp_ar = [];
    for (let i = 0; i < all_cars.length; i++) {
      let flag_if_use = true;
      let in_use_ar = all_cars[i].in_use;
      if (in_use_ar) {
        for (let j = 0; j < in_use_ar.length; j++) {
          let tempStart = new Date(in_use_ar[j].start);
          let tempend = new Date(in_use_ar[j].end);
          if ((start >= tempStart && start <= tempend) || (end >= tempStart && end <= tempend) || (start < tempStart && end > tempend)) {
            flag_if_use = false;
          }
        }
      }
      if (flag_if_use) {
        let temp_car = all_cars[i];
        if (temp_ar.length) {
          temp_ar = [...temp_ar, { ...temp_car }]
        } else {
          temp_ar = [{ ...temp_car }]
        }
      }
    }
    setAr(temp_ar);
  }

  return (
    <div className='container p-4' style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "12vh" }}></div>
      <div className="row">
        <div className="col-md-4 mt-5">
          <img src={product.img_url || "/images/cover.jpg"} alt={product.name} className='img-fluid img-thumbnail shadow' />
        </div>
        <div className="col-md-8">
          <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>{product.name}</h1>
          <p className='mb-1 mt-2 text-center mb-3'> {product.info}</p>
          <h5 className='mb-3 text-center'>Year: {product.year} </h5>
          <h5 className='text-center mb-3'>Price for 1 day: {product.day_price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></h5>
          <div className='col-md-4 text-center m-auto mb-4'>
            <h5>Select start day:</h5>
            <input type="date" className='form-control' ref={startDateRef} />
          </div>
          <div className='col-md-4 text-center m-auto mb-4'>
            <h5>Select end day:</h5>
            <input type="date" className='form-control' ref={endDateRef} />
          </div>
          <div className='text-center mb-4'>
            <button className='btnLog' onClick={totalPrice}>Check Price</button>
          </div>
          {sumDays > 0 ? <div> <h4 className='text-center mb-3'>Total Price: {sumDays * product.day_price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></h4>
            <h4 className='text-center mb-3'>{sumDays} Days</h4>
          </div>
            : ""}
          <div className='text-center'>
            <button onClick={() => {
              nav(-1);
            }} className='btn btn-outline-light'><i className="fa fa-chevron-left" aria-hidden="true"></i></button>

            <button onClick={onOrder} className="btn btn-outline-light  ms-2">
              <i className="fa fa-credit-card-alt me-2" aria-hidden="true"></i>Order now
            </button>
          </div>
        </div>
      </div>
      {flagOffer ?
        // {ar.length === 0 ?<div className='text-center mt-4'> <BeatLoader/> </div> : ""}
        <div>
          <h2 className='text-center gradi mt-4'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Vehicles are available on the desired date</h2>
          <div className="row">
            {ar.map(item => {
              return (
                <RentalItem key={item._id} item={item} />
              )
            })}
          </div>
        </div>
        : ""
      }
      <div style={{ minHeight: "6vh" }}></div>
    </div>
  )
}

export default RentalCarInfo;