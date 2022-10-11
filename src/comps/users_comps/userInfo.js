import React, { useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../css/userInfo.css'
import { BeatLoader } from "react-spinners";

function UserInfo(props) {
  const [user, setUser] = useState({});
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let nav = useNavigate();

  let firstNameRef = register("first_name", {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  let lastNameRef = register("last_name", {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  let emailRef = register("email", {
    required: true,
    minLength: 2,
    maxLength: 150,
  });
  let licenseIdRef = register("license_id", {
    required: true,
    minLength: 6,
    maxLength: 100,
  });
  let userPasportRef = register("user_pasport", {
    required: true,
    minLength: 6,
    maxLength: 100,
  });
  let phoneRef = register("phone", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });
  let addressRef = register("address", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setUser(resp.data);
  };

  const onSubForm = (formData) => {
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("User updated");
        nav(-1);
      } else {
        toast.warning("you not change nothing");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
      nav(-1);
    }
  };
  const deleteUser = async () => { 
    let url = API_URL + "/users/"+user._id;
    // if ( await confirm({
    //   confirmation: 'Are you sure?'
    // }))
    if(window.confirm("Are you sure?"))
    {
    try {
      let resp = await doApiMethod(url, "DELETE", {});
      if (resp.data.deletedCount) {
        toast.success("user deleted succesfuly");
        nav("/logout")
      } 
    } 
    catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  }
  }

  return (
    <div className="container mb-5">
      <div className="premium-go">
      <h2 style={{paddingTop:"10px"}}>Premium User<i className="fa fa-arrow-right mx-2" aria-hidden="true"></i></h2>
      <button
        className="h3"
        title="get premium"
        onClick={() => nav("/checkoutPremium")}
      >
        <i className="fa fa-user-circle" aria-hidden="true"></i>
      </button>
      </div>
      <div className="delete-user">
      <h4 style={{paddingTop:"10px"}}>Delete User</h4>
      <button
        className="h5"
        title="delete user"
        onClick={deleteUser}
      >
       <i className="fa fa-trash mx-2" aria-hidden="true"></i>
      </button>
      </div>
      <div style={{ minHeight: "15vh" }}></div>
      {user._id ? (
        <form
          onSubmit={handleSubmit(onSubForm)}
          className="col-md-7 p-3 shadow mx-auto text-dark"
        >
          <h1 className="mb-4 gradi text-center ">
            <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Edit
            information
          </h1>
          <label className="my-2">
            <i className="fa fa-user mx-2" aria-hidden="true"></i>First Name
          </label>
          <input
            defaultValue={user.first_name}
            {...firstNameRef}
            type="text"
            className="form-control"
          />
          {errors.first_name ? (
            <small className="text-danger d-block">
              * Enter valid First Name 2 to 99 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-user-o mx-2" aria-hidden="true"></i>Last Name
          </label>
          <input
            defaultValue={user.last_name}
            {...lastNameRef}
            type="text"
            className="form-control"
          />
          {errors.last_name ? (
            <small className="text-danger d-block">
              * Enter valid Last Name 2 to 99 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-envelope-o mx-2" aria-hidden="true"></i>email
          </label>
          <input
            defaultValue={user.email}
            {...emailRef}
            type="text"
            className="form-control"
          />
          {errors.email ? (
            <small className="text-danger d-block">
              * Enter valid email 2 to 150 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-id-badge mx-2" aria-hidden="true"></i>License Id
          </label>
          <input
            defaultValue={user.license_id}
            {...licenseIdRef}
            type="text"
            className="form-control"
          />
          {errors.license_id ? (
            <small className="text-danger d-block">
              * Enter valid License Id 6 to 99 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-id-card-o mx-2" aria-hidden="true"></i>User
            Pasport
          </label>
          <input
            defaultValue={user.user_pasport}
            {...userPasportRef}
            type="text"
            className="form-control"
          />
          {errors.user_pasport ? (
            <small className="text-danger d-block">
              * Enter valid user_pasport 6 to 99 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-phone mx-2" aria-hidden="true"></i>Phone
          </label>
          <input
            defaultValue={user.phone}
            {...phoneRef}
            type="text"
            className="form-control"
          />
          {errors.phone ? (
            <small className="text-danger d-block">
              * Enter valid phone 2 to 300 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-location-arrow mx-2" aria-hidden="true"></i>
            Address
          </label>
          <input
            defaultValue={user.address}
            {...addressRef}
            type="text"
            className="form-control"
          />
          {errors.address ? (
            <small className="text-danger d-block">
              * Enter valid address 2 to 300 chars
            </small>
          ) : (
            ""
          )}

          <div className="text-center mt-4">
            <button className="btnLog  me-2 my-3">Update</button>
          </div>
        </form>
      ) : (
        <h2 className='text-center'><BeatLoader /></h2>
      )}
    </div>
  );
}

export default UserInfo;
