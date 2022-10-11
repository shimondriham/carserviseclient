import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import "../css/productDesign.css";

function SaleCarInfo(props) {
  const [product, setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    doApi();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/sale/single/" + params.id;
    let resp = await doApiGet(url);
    setProduct(resp.data);
  };

  const onOrder = () => {
    nav("/checkoutSale/" + product._id);
  };

  return (
    <div className="container p-4" style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "12vh" }}></div>
      <div className="">
        <h1 className="text-center gradi">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>
          {product.name}
        </h1>

        <div className="container-image mt-5">
        <img
            src={product.img_url || "/images/cover.jpg"}
            alt={product.name}
            className="img-thumbnail image"
            width={"30%"}
          />  <div className="middle">
      <div className="text-information">{product.info}</div>
       </div>
    </div>
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
          <h4>{product.cc}<small>cc</small>
          </h4>
          </div>
          </div>
          <div  iv className="order-btn">
            <button
              onClick={() => {
                nav(-1);
              }}
              className="btn btn-outline-light"
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            {product.qty > 0 ? (
              <button onClick={onOrder} className="btn btn-outline-light  ms-2">
                <i
                  className="fa fa-credit-card-alt me-2"
                  aria-hidden="true"
                ></i>
                Order now
              </button>
            ) : (
              <button className="btn btn-danger ms-2">SOLD OUT!!!</button>
            )}
          </div>
      </div>
      <div style={{ minHeight: "6vh" }}></div>
    </div>
  );
}

export default SaleCarInfo;
