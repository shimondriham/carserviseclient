import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { SHOP_TOKEN } from '../../services/localService';
import AuthClientComp from '../users_comps/authClientComp';


function RecentRental(props) {

  let nameCars = {}
  let [ar, setAr] = useState([]);
  let [nameObj, setNameObj] = useState({});

  useEffect(() => {
    if (localStorage[SHOP_TOKEN]) {
      doApiName()
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    try {
      let url0 = API_URL + "/rentalOrder/userOrder";
      let resp0 = await doApiGet(url0);
      setAr(resp0.data)
    }
    catch (err) {
      alert("there problem come back later")
      if (err.response) {
        console.log(err.response.data)
      }
    }
  }
  const doApiName = async () => {
    try {
      let tempUrl = API_URL + "/rental/allCars";
      let tempResp = await doApiGet(tempUrl);
      let tempAr = tempResp.data;
      tempAr.forEach(item => {
        nameCars[item.short_id] = item.name;
      });
      setNameObj(nameCars)
      doApi();
    }
    catch (err) {
      alert("there problem come back later")
      if (err.response) {
        console.log(err.response.data)
      }
    }

  }


  return (
    <div className='container'>
      <AuthClientComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Recent Rental list</h1>
      <table className='table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 mt-3 mb-5 '>
        <thead>
          <tr>
            <th>#</th>
            <th>Price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
            <th>Start Date<i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i></th>
            <th>End Date<i className="fa fa-angle-double-left mx-2" aria-hidden="true"></i></th>
            <th>Type<i className="fa fa-product-hunt mx-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr className='link alert-link' key={item._id}>
                <td>{i + 1}</td>
                <td>{item.total_price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
                <td>{item.startDate.substring(0, 10)}</td>
                <td>{item.endDate.substring(0, 10)}</td>
                <td>{nameObj[item.car_short_id]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecentRental;