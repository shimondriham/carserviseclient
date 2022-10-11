import React, { useEffect , useState } from 'react';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'
import "./admin.css"
import { toast } from 'react-toastify';

function CooperativeList(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi()
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() =>{
    let url = API_URL + "/cooperative/allCars";
    try{
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }


const delCar = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/cooperative/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Car delted!");
        }
        doApi();
      }
      catch (err) {
        console.log(err.response);
        doApi();
      }
    }
  }
 
  return(
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className='gradi text-center'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Cooperative vehicles</h1>
      <table className='table tableDesign'>
        <thead>
          <tr>
            <th>#</th>
            <th><i className="fa fa-car mx-2" aria-hidden="true"></i>Type</th>
            <th><i className="fa fa-map-marker mx-2" aria-hidden="true"></i>Address</th>
            <th><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</th>
            <th><i className="fa fa-phone mx-2" aria-hidden="true"></i>phone</th>
            <th>Del<i className="fa fa-pencil ms-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.user_name}</td>
                <td>{item.user_phone}</td>
                <td>
                    <button onClick={() => { delCar(item._id) }} className='badge btn btn-outline-danger'>X</button>
                   
                  </td>
                             
              </tr>
            )
          })}
        </tbody>
      </table>
      {ar.length === 0 ?<div className='text-center mt-4'> <BeatLoader/> </div> : ""}
      </div> 
  )
}

export default CooperativeList;