import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiMethod } from '../../services/apiService'

function AddRentalCategory(props) {
  let [btnSend, setBtnSend] = useState(false)
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })

  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/categoriesRental";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Category added")
        nav("/admin/rentalCars")
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There problem try again later")
      nav("/admin/rentalCars")
    }
  }

  return (
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-7 mx-auto p-3 shadow'>
        <h1 className='mb-4 gradi text-center '><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Categories panel</h1>
        <label className="my-2"><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</label>
        <input  {...nameRef} type="text" className='form-control' placeholder='type name for the category...' />
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}
        <label className="my-2"><i className="fa fa-search mx-2" aria-hidden="true"></i>URL name</label>
        <input {...url_nameRef} type="text" className='form-control' placeholder='type url name for the category...' />
        {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}
        <label className="my-2"><i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image URL</label>
        <input {...img_urlRef} type="text" className='form-control mb-4' placeholder='type url of image category...' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}
        <div className='text-center mt-5'>
          <button className='mx-auto btnLog' disabled={btnSend}>Add<i className="fa fa-plus mx-2" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
};

export default AddRentalCategory;