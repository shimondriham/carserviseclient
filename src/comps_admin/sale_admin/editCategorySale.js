import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import { BeatLoader } from 'react-spinners'

function EditCategorySale(props) {
  let [category, setCategory] = useState({})
  let params = useParams();
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })

  useEffect(() => {
    doApi();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let urlProduct = API_URL + "/categoriesSale/single/" + params.url_name;
    let resp2 = await doApiGet(urlProduct);
    setCategory(resp2.data);
  }

  const onSubForm = (formData) => {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/categoriesSale/" + category._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("Category updated");
        nav("/admin/saleCars")
      }
      else {
        toast.warning("you not change nothing")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
      nav("/admin/saleCars")
    }
  }

  return (
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      {(category._id) ?
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-7 p-3 shadow mx-auto'>
          <h1 className='mb-4 gradi text-center '><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Categories panel</h1>
          <label className="my-2"><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</label>
          <input defaultValue={category.name} {...nameRef} type="text" className='form-control' />
          {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

          <label className="my-2"><i className="fa fa-search mx-2" aria-hidden="true"></i>URL name</label>         <input defaultValue={category.url_name} {...url_nameRef} type="text" className='form-control' />
          {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}

          <label className="my-2"><i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image URL</label>         <input defaultValue={category.img_url} {...img_urlRef} type="text" className='form-control' />
          {errors.img_url ? <small className='text-danger d-block'>* Enter valid url for image, between 1 to 500 chars</small> : ""}
          <div className='text-center mt-3'>
            <button className='mt-4 btn btn-outline-warning'>Update</button>
          </div>
        </form> : <div className='text-center mt-4'> <BeatLoader /> </div>}
    </div>
  )
}

export default EditCategorySale;