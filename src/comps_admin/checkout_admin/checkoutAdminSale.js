import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import PageLinks from '../../misc_comps/pageLinks';
import { API_URL, doApiGet } from '../../services/apiService';
import CheckoutSaleItem from './chechoutSaleItem';

function CheckoutAdminSale(props) {
  const [ar, setAr] = useState([]);
  const [query] = useSearchParams()
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  let nav = useNavigate()

  useEffect(() => {
    doApi();
  }, [location])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let pageQ = query.get("page") || 1;
    let url = API_URL + "/saleOrder/allOrders?page=" + pageQ + "&perPage=5";
    let resp = await doApiGet(url);
    setAr(resp.data);
    let urlAmounts = API_URL + "/saleOrder/amount";
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount)
    setPage(pageQ - 1)
  };

  return (
    <div className='container '>
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      <h1 className='mb-4 gradi text-center'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Checkout Of Sale Cars</h1>
      {amount < 6 ? "" :
        <PageLinks perPage="5" apiUrlAmount={API_URL + "/saleOrder/amount"} urlLinkTo={"/admin/checkout/sale/"} clsCss="btn btn-dark me-1 border-white" />
      }
      <table className='table text-white'>
        <thead>
          <tr>
            <th>#</th>
            <th>Email<i className="fa fa-user mx-2" aria-hidden="true"></i></th>
            <th>Address<i className="fa fa-map-marker mx-2" aria-hidden="true"></i></th>
            <th>Price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
            <th>Phone<i className="fa fa-phone mx-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <CheckoutSaleItem item={item} key={i} index={i} page={page} />
            )
          })}
        </tbody>
      </table>
      <button onClick={() => {
        nav("/admin/checkout");
      }} className='btn btn-outline-light mt-4'><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
    </div>
  )
};

export default CheckoutAdminSale;