import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

function SignUpClient(props) {
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (data) => {
    data.email = data.email.toLowerCase()  
    doApi(data)
  }
  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
        toast.success("You sign up");
        nav("/login");
      }
    }
    catch(err){
      if(err.response.data.code === 11000){
          toast.error("Email already in system , try log in")
      }
      else{
        toast.error("There problem , try back later")
      }
    }
  }

let firstNameRef = register("first_name", { required: true, minLength: 2 });
let lastNameRef = register("last_name", { required: true, minLength: 2 });
let emailRef = register("email", {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
});
let passwordRef = register("password", { required: true, minLength: 3 });
let addressRef = register("address", { required: false, minLength: 2 });
let phoneRef = register("phone", { required: false, minLength: 9 });
let pasport = register("user_pasport", { required: false, minLength: 9 });
let licenseId = register("license_id", { required: false, minLength: 9 });


return (
  <div className='container col-md-6 mx-auto mb-5'>
    <div style={{ minHeight: "18vh" }}></div>
    <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 shadow mb-4 h4 form-design text-dark'>
    <h1 className='mb-4 text-center gradi mt-2'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>SIGN UP</h1>
      <label className='mb-2'><i className="fa fa-user mx-2" aria-hidden="true"></i>First Name</label>
      <input {...firstNameRef} type="text" className='form-control mb-4' placeholder='type name...'/>
      {errors.first_name ? <small className='text-danger d-block'>Enter valid name, min 2 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-user-circle mx-2" aria-hidden="true"></i>Last Name</label>
      <input {...lastNameRef} type="text" className='form-control mb-4' placeholder='type name...'/>
      {errors.last_name ? <small className='text-danger d-block'>Enter valid name, min 2 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-id-card-o mx-2" aria-hidden="true"></i>Pasport Number</label>
      <input {...pasport} type="text" className='form-control mb-4' placeholder='type name...'/>
      {errors.user_pasport ? <small className='text-danger d-block'>Enter valid pasport, min 9 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-id-card mx-2" aria-hidden="true"></i>License ID</label>
      <input {...licenseId} type="text" className='form-control mb-4' placeholder='type name...'/>
      {errors.license_id ? <small className='text-danger d-block'>Enter valid License, min 9 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email</label>
      <input {...emailRef} type="text" className='form-control mb-4' placeholder='type correct mail...' />
      {errors.email ? <small className='text-danger d-block'>Email invalid</small> : ""}

      <label className='mb-2'><i className="fa fa-lock mx-2" aria-hidden="true"></i>Password</label>
      <input {...passwordRef} type="password" className='form-control mb-4' placeholder='type strong password...'/>
      {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-map-marker mx-2" aria-hidden="true"></i>Address</label>
      <input {...addressRef} type="text" placeholder='not required' className='form-control mb-4' />
      {errors.address ? <small className='text-danger d-block'>* Enter valid address, min 2 chars</small> : ""}

      <label className='mb-2'><i className="fa fa-phone mx-2" aria-hidden="true"></i>Phone</label>
      <input {...phoneRef} type="text" placeholder='not required' className='form-control mb-4' />
      {errors.phone ? <small className='text-danger d-block'>* Enter valid phone number, min 9 numbers</small> : ""}

      <h1 className='text-center'><button className='btnLog mt-4'>SIGN UP<i className="fa fa-user-plus mx-2" aria-hidden="true"></i></button></h1>
    </form>
    <div style={{ minHeight: "8vh" }}></div>
  </div>
)
}

export default SignUpClient