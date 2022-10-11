import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

function AddSaleProduct(props) {
  let [year, setYear] = useState([]);
  let [cat_ar, setCatAr] = useState([]);
  let nav = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let yearRef = register("year", { required: true, minLength: 2, maxLength: 500 })
  let carGearRef = register("car_gear", { required: true, minLength: 2, maxLength: 500 })
  let ccRef = register("cc", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("price", { required: true, min: 1, max: 999999 })
  let qtyRef = register("qty", { required: true, min: 1, max: 999999 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
  let img_urlRef = register("img_url", { required: false, minLength: 3, maxLength: 500 })
  let [btnSend,setBtnSend] = useState(false)

  useEffect(() => {
    doYear()
    doApi()
  }, [])

  const doYear = () => { 
    let yearsar=[];
    let counter=0;
    for (let i =1980; i <2023; i++) {
      yearsar[counter] = i;
      counter++;
  } 
  setYear(yearsar)
  }

  const doApi = async () => {
    let url = API_URL + "/categoriesSale";
    let resp = await doApiGet(url);
    setCatAr(resp.data);   
  }

  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/sale/";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Car added");
        nav("/admin/saleCars")
      }
      else{
        toast.warning("You not change nothing for update.")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
    }
  }

  return (
    <div className='container mb-5'>
      <AuthAdminComp />
<div style={{ minHeight: "15vh" }}></div>
      {
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-7 p-3 shadow mx-auto'>
              <h1 className='mb-4 gradi text-center '><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Add Cars Panel</h1>
        <label className="my-2"><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</label>
        <input {...nameRef} type="text" className='form-control' placeholder='type name...'/>
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

        <label className="my-2"><i className="fa fa-info mx-2" aria-hidden="true"></i>Info</label>
        <textarea {...infoRef} className='form-control' rows="3" placeholder='type informatiom about the car...'></textarea>
        {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}

        <label className='my-2'><i className="fa fa-money mx-2" aria-hidden="true"></i>Price</label>
        <input {...priceRef} type="number"  className='form-control' placeholder='type price...'/>
        {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}

        <label className='my-2'><i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i>Quantity</label>
        <input {...qtyRef} type="number" defaultValue={1} className='form-control' />
        {errors.qty ? <small className='text-danger d-block'>* Enter valid  quantity, between 1 to 999999</small> : ""}

        <label className='my-2'><i className="fa fa-ioxhost mx-2" aria-hidden="true"></i>Horse-power</label>
        <input {...ccRef} type="number"  className='form-control' defaultValue={1200}/>
        {errors.cc ? <small className='text-danger d-block'>* Enter valid  horsepower, between 1 to 999999</small> : ""}

        <label className="my-2"><i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i>Year</label>
        <select {...yearRef}  className='form-select'>
         <option  value="" >Choose Year</option>
         {year.map((i) => {
            return (
              <option key={i} value={i}>{i}</option>
            )
          })}
        </select>
        {errors.year ? <small className='text-danger d-block'>* Enter valid  year</small> : ""}

        <label className="my-2"><i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i>Gear stick</label>
        <select {...carGearRef}  className='form-select'>
         <option  value="" >Choose Gear</option>
         <option  value="auto" >Auto</option>
         <option  value="manual">Manual</option>
        </select>
        {errors.car_gear ? <small className='text-danger d-block'>* Enter valid option</small> : ""}

        <label className="my-2"><i className="fa fa-bars mx-2" aria-hidden="true"></i>Category</label>
        <select {...cat_short_idRef}  className='form-select'>
          <option  value="" >Choose Category</option>
          {cat_ar.map(item => {
            return (
              <option key={item._id} value={item.short_id}>{item.name}</option>
            ) 
          })}
        </select>
        {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}

        <label className="my-2"><i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image url</label>
        <input {...img_urlRef} type="text" className='form-control mb-4' placeholder='type url of image car...'/>
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}
          <div className='text-center mt-4'>
        <button className='btn btn-outline-success me-2' disabled={btnSend}>Add<i className="fa fa-plus mx-2" aria-hidden="true"></i></button>
        <Link className='btn btn-outline-danger' to="/admin/saleCars">Cancel</Link>
        </div>
      </form>}
    </div>
  )
}

export default AddSaleProduct