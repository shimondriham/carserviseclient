import React, { useEffect , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'



function SaleAdminCatList(props){
let [ar,setAr] = useState([]);
  let nav = useNavigate()

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() =>{
    let url = API_URL + "/categoriesSale";
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

  const delCategory = async(_idDel) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        let url = API_URL+"/categoriesSale/"+_idDel;
        let resp = await doApiMethod(url,"DELETE",{});
        if(resp.data){
          toast.info("Category delted!");
        }
        doApi();
      }
      catch(err){
        console.log(err.response);
        doApi();
      }
    }
  }
 
  return(
    <div className='container mb-5'>
      <AuthAdminComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className='gradi text-center'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Sale Categories panel</h1>
      <table className='table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 my-5 text-center'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name<i className="fa fa-user ms-2" aria-hidden="true"></i></th>
            <th>Url name<i className="fa fa-search ms-2" aria-hidden="true"></i></th>
            <th>Short ID<i className="fa fa-id-card-o ms-2" aria-hidden="true"></i></th>
            <th>Del/Edit<i className="fa fa-pencil ms-2" aria-hidden="true"></i></th>
            <th>Car List<i className="fa fa-list ms-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr className='link alert-link' key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.url_name}</td>
                <td>{item.short_id}</td>
               
        
                <td>
                    <div></div>
                  <button onClick={() => {delCategory(item._id)}} className='badge btn btn-outline-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/saleCars/edit/"+item.url_name)
                  }} className='badge btn btn-outline-success'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                </td>
                <td>
                    <div></div>
                  <button onClick={() => {
                    nav("/admin/saleCars/"+item.url_name)
                  }} className='badge text-center mx-2 btnLog'><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
        <div className='d-flex justify-content-between mx-md-5'>
          <div>
      <Link to="/admin/addCategory" className="btnTable">Add new category<i className="fa fa-plus mx-2 mb-3" aria-hidden="true"></i></Link> 
      </div>
      <div>
      <Link to="/admin/addSaleProduct" className="btnTable">Add new car<i className="fa fa-plus mx-2 mb-3" aria-hidden="true"></i></Link> 
      </div>
      </div>
      {ar.length === 0 ? <div className='text-center mt-4'> <BeatLoader/> </div> : ""}
      </div> 
  )
}

export default SaleAdminCatList