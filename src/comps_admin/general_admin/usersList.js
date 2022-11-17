import React, { useEffect, useRef, useState } from "react";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import "./admin.css";
import { toast } from "react-toastify";

function UsersList(props) {
  let [ar, setAr] = useState([]);
  const itemsRef = useRef([]);

  useEffect(() => {
    doApi();
    itemsRef.current = itemsRef.current.slice(0, ar.length);
  }, [ar]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const changeRole = async (_userId, _role) => {
    let url = API_URL + `/users/changeRole/${_userId}/${_role}`;
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount) {
        doApi();
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("you can't change yourself or the super admin");
      } else {
        toast.error("there problem come back later");
      }
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delUser = async (_idDel) => {
    if (_idDel === "6268023f45f842ebf1ab3dea") {
      toast.dark("you can't delete the super admin")
      return
    }
    if (window.confirm("Are you sure you want to delete?")) {
      console.log(_idDel);
      try {
        let url = API_URL + "/users/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("User delted!");
        }
        doApi();
      } catch (err) {
        console.log(err.response);
        doApi();
      }
    }
  };

  return (
    <div className="container text-center">
      <AuthAdminComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className="gradi text-center">
        <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Users panel
      </h1>
      <table className="table tableDesign">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <i className="fa fa-user mx-2" aria-hidden="true"></i>Name
            </th>
            <th>
              <i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email
            </th>
            <th>
              <i className="fa fa-map-marker mx-2" aria-hidden="true"></i>
              Address
            </th>
            <th>
              <i className="fa fa-user-secret mx-2" aria-hidden="true"></i>Role
            </th>
            <th>
              <i className="fa fa-pencil mx-2" aria-hidden="true"></i>Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.first_name + " " + item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  {item._id !== "6268023f45f842ebf1ab3dea" ?
                    (<select key={i} ref={(el) => (itemsRef.current[i] = el)} onChange={() => { changeRole(item._id, itemsRef.current[i].value); }} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                      <option value={item.role} defaultValue>{item.role}</option>
                      {item.role !== "admin" ? (<option value="admin">admin</option>) : ("")}
                      {item.role !== "premium" ? (<option value="premium">premium</option>) : ("")}
                      {item.role !== "user" ? (<option value="user">user</option>) : ("")}
                    </select>)
                    : (<h4 className="text-dark">Super Admin</h4>)}
                </td>
                <td>
                  <button
                    onClick={() => {
                      delUser(item._id);
                    }}
                    className="badge btn btn-outline-danger mx-5">X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {ar.length === 0 ? (
        <div className="text-center mt-4">
          {" "}
          <BeatLoader />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UsersList;
