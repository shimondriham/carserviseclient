import React, { useContext, useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2"
import AuthClientComp from '../users_comps/authClientComp';
import { AppContext } from "../../context/shopContext"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CheckoutRental(props) {
  const { sumDays, startDate, endDate } = useContext(AppContext);
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
  }, [location, flag])// eslint-disable-line react-hooks/exhaustive-deps


  const doApi = async () => {
    let url = API_URL + "/rental/single/" + params.id;
    let resp = await doApiGet(url);
    setProduct(resp.data)
  };


  const doApiAddToCheckout = async () => {
    let url = API_URL + '/rentalOrder';
    let car_short_id = product.short_id;
    let total_price = sumDays * product.day_price;
    await doApiMethod(url, "POST", { car_short_id, total_price, startDate, endDate })
    nav("/")
  };

  const onCommit = async (_data) => {
    let url = API_URL + "/rentalOrder/orderPaid"
    let paypalObject = {
      tokenId: _data.facilitatorAccessToken,
      orderId: _data.orderID,
      realPay: "sandbox",
      car_short_id: product.short_id
    }
    try {
      await doApiMethod(url, "PATCH", paypalObject);
      toast.success("Your order completed");
      setFlag(true)
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container mb-5' style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "14vh" }}></div>
      <AuthClientComp />
      <div className="row">
        <div className="col-md-8">
          <h2 className='gradi text-center'>{product.name}</h2>
          <h4 className='gradi text-center my-2'>Year: {product.year} </h4>
          <h5 className='gradi text-center my-2'>{product.info} </h5>
          <h5 className='gradi text-center my-2'><strong>Order Date: </strong>{startDate} ~ {endDate} </h5>
          <h5 className='gradi text-center my-2'><strong>Total Price: </strong>{sumDays * product.day_price} </h5>
          <div className='text-center mt-5'>
            <img src={product.img_url || "/images/cover.jpg"} alt={product.name} className='img-fluid img-thumbnail' width={"50%"} />
          </div>
        </div>
        <div style={{ marginTop: "200px" }} className='col-md-4'>
          <div>
            <PayPalButton
              currency="ILS"
              amount={sumDays * product.day_price}
              options={{
                clientId: "AchCcsgZkBnQqL1E49d-RKwvgPA3GpXchjBYCot_b4v0XfcCUOwXiQp2_GwqoBI2f_kxnSkqirAUeMKe"
              }}
              onSuccess={(details, data) => {
                console.log("data", data);
                console.log("details", details);
                if (data.orderID) {
                  onCommit(data);

                }
              }}
              onCancel={(err) => {
                alert("The process end before the payment, try again")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default CheckoutRental;


