import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import AuthClientComp from "../users_comps/authClientComp";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutPremium(props) {
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  let nav = useNavigate()

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      let url = API_URL + `/users/myInfo`;
      let resp = await doApiGet(url);
      setUserId(resp.data._id);
      setUserRole(resp.data.role);
      // console.log(resp.data.role);
      
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onCommit = async () => {
    let url = API_URL + `/users/changeRolePremium/${userId}`;
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount) {
        toast.success("your order completed you are premium user now!");
        toast.warning("Enjoi !");
        nav(-1)
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "85vh",
        margin: "0 auto",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div style={{ minHeight: "14vh" }}></div>
      <AuthClientComp />
      {userRole === "admin" || userRole === "premium"?
      toast.error("you alreay premium user") && nav(-1)
       : null}
      <div>
        <img
          src={"/images/premium.png"}
          alt="premium"
          className="img-fluid img-thumbnail"
          width={"50%"}
        />
      </div>
      <div className="mt-3">
        <h1>
          Premium user for only 25
          <i className="fa fa-ils mx-1" aria-hidden="true"></i>
        </h1>
        <h2>Buy now</h2>
        <i
          className="fa fa-arrow-down"
          aria-hidden="true"
          style={{ fontSize: "5vh" }}
        ></i>
      </div>
      <div style={{ marginTop: "5vh" }} className="mb-3">
        <div>
          <PayPalButton
            currency="ILS"
            amount={25}
            options={{
              clientId:
                "AchCcsgZkBnQqL1E49d-RKwvgPA3GpXchjBYCot_b4v0XfcCUOwXiQp2_GwqoBI2f_kxnSkqirAUeMKe",
            }}
            onSuccess={(details, data) => {
              console.log("data", data);
              console.log("details", details);
              if (data.orderID) {
                onCommit(data);
              }
            }}
            onCancel={(err) => {
              alert("The process end before the payment, try again");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPremium;
