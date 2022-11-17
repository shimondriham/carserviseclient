import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import AuthClientComp from "../users_comps/authClientComp";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutSale(props) {
  const [flag, setFlag] = useState(false);
  const [product, setProduct] = useState({});
  let params = useParams();
  let location = useLocation();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
    if (flag) {
      doApiAddToCheckout();
    }
  }, [location, flag]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/sale/single/" + params.id;
    let resp = await doApiGet(url);
    setProduct(resp.data);
  };

  const doApiAddToCheckout = async () => {
    let url = API_URL + "/saleOrder";
    let car_short_id = product.short_id;
    let price = product.price;
    await doApiMethod(url, "POST", { car_short_id, price });
    nav("/");
  };

  const onCommit = async (_data) => {
    let url = API_URL + "/saleOrder/orderPaid";
    let paypalObject = {
      tokenId: _data.facilitatorAccessToken,
      orderId: _data.orderID,
      realPay: "sandbox",
      car_short_id: product.short_id,
    };
    try {
      await doApiMethod(url, "PATCH", paypalObject);
      toast.success("Your order completed");
      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mb-5" style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "14vh" }}></div>
      <AuthClientComp />
      <h1 className="text-center mb-5 gradi">{product.name}</h1>
      <div className="row gradi mt-4">
        <div className="col-md-8">
          <div className="text-center mt-3">
            <img
              src={product.img_url || "/images/cover.jpg"}
              alt={product.name}
              className="img-fluid img-thumbnail"
              width={"50%"}
            />
          </div>
          <p className="col-6 text-center d-flex m-auto justify-content-center my-3">
            {product.info}
          </p>
          <div className="details mt-4">
            <div className="me-5">
              <h5>
                Price: {product.price}
                <i className="fa fa-ils mx-1 text-white" aria-hidden="true"></i>
              </h5>
              <h4>Model: {product.year} </h4>
            </div>
            <div>
              <h5>{product.car_gear} </h5>
              <h4>
                {product.cc}
                <small>cc</small>
              </h4>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "25vh" }} className="col-md-4 paypal-box">
          <div>
            <PayPalButton
              currency="ILS"
              amount={product.price}
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
    </div>
  );
}

export default CheckoutSale;
