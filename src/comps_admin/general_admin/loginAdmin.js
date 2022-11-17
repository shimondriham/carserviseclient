import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

function LoginAdmin(props) {
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (data) => {
    data.email = data.email.toLowerCase()
    doApi(data)
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.token) {
        localStorage.setItem("tok", resp.data.token);
        nav("/admin/checkout");
        toast.info("Welcome back to admin panel!");
      }
      else {

        toast.error("There some error come back later...");
      }
    }
    catch (err) {
      toast.error(err.response.data.err);
      console.log(err.response.data)
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  });

  let passwordRef = register("password", { required: true, minLength: 3 });

  return (
    <div className='container'>
      <div style={{ minHeight: "20vh" }}></div>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto h4'>
        <h1 className='gradi text-center mb-3'>LOG IN</h1>
        <label className='mb-2'><i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email</label>
        <input {...emailRef} type="text" className='form-control mb-4' placeholder='type your email...' />
        {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}
        <label className='mb-2'><i className="fa fa-lock mx-2" aria-hidden="true"></i>Password</label>
        <input {...passwordRef} type="password" className='form-control mb-3' placeholder='type your password...' />
        {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
        <div className='text-center'>
          <button className='btnLog mt-4 mx-auto'><i className="mx-2 fa fa-sign-in" aria-hidden="true"></i>Login</button>
        </div>
      </form>
    </div>
  )
};

export default LoginAdmin;