import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import SaleItem from "./saleItem";
import "checkboxes";
import _, { toNumber } from "lodash";

function SaleList(props) {
  const [flagGear, setFlagGear] = useState(false);
  const [catAr, setCatAr] = useState([]);
  const [flagPrice, setFlagPrice] = useState(false);
  const [ar, setAr] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();
  let nav = useNavigate();
  let inputRef = useRef();
  let catRef = useRef();
  let yearRef = useRef();

  let yearsar = [];
  for (let i = 0; i < 32; ++i) {
    yearsar[i] = 2022 - i;
  }

  useEffect(() => {
    setShowLoading(true);
    doApiCat();
    doApi();
  }, [location, flagGear, flagPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApiCat = async () => {
    let url = API_URL + "/categoriesSale";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
  };
  const doApi = async () => {
    let url;
    if (catRef.current.value) {
      url = API_URL + "/sale?cat=" + catRef.current.value;
    } else url = API_URL + "/sale";
    let resp1 = await doApiGet(url);
    let temp_ar = resp1.data;
    if (flagGear) {
      temp_ar = temp_ar.filter((car) => car.car_gear.includes("manual"));
    }
    let temp_ar2 = temp_ar;
    if (flagPrice) {
      temp_ar2 = _.sortBy(temp_ar2, "price");
    }
    let temp_ar3 = temp_ar2;
    if (yearRef.current.value) {
      let val = toNumber(yearRef.current.value);
      temp_ar3 = temp_ar2.filter((car) => car.year === val);
    }
    setAr(temp_ar3);
    setShowLoading(false)
  };

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };
  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    if (input_val) {
      nav("/saleSearch?s=" + input_val);
    }
  };
  const sortByPrice = () => {
    if (!flagPrice) {
      setFlagPrice(true);
    } else {
      setFlagPrice(false);
    }
  };
  const filterGear = () => {
    if (!flagGear) {
      setFlagGear(true);
    } else {
      setFlagGear(false);
    }
  };

  return (
    <div className="container-fluid mb-5" style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <div className="sale-list">
          <div>
            <h5>Category:<i className="fa fa-arrow-down mx-2" aria-hidden="true"></i></h5>
            <select ref={catRef} onChange={doApi} className="form-select color-black me-4" style={{ width: "160px", background: "#e9ff" }}>
              <option value="">Choose Category</option>
              {catAr.map((item) => {
                return (
                  <option key={item._id} value={item.short_id}> {item.name} </option>
                );
              })}
            </select>
          </div>

          <div>
            <h5>Year:<i className="fa fa-arrow-down mx-2" aria-hidden="true"></i></h5>
            <select ref={yearRef} onChange={doApi} className="form-select color-black" style={{ width: "160px", background: "#e9ff" }}>
              <option value="">Choose Year</option>
              {yearsar.map((item, i) => {
                return (
                  <option key={i} value={item}> {item} </option>
                );
              })}
            </select>
          </div>

          <div className=" d-flex inp form__group field">
            <input onKeyDown={onKeyboardClick} className="form__field my-2" ref={inputRef} placeholder="Type car name..." type="search" />
            <button onClick={onSearchClick} className="btn text-white"> <i className="fa fa-search" aria-hidden="true"></i></button>
          </div>

          <div>
            <div className="d-block mb-3">
              <div className="d-flex mb-2">
                <input type="checkbox" className="checkbox mx-1 mt-1" onChange={sortByPrice} id="select" />
                <span>low price</span>
              </div>
              <div className="d-flex">
                <input type="checkbox" className="checkbox mx-1 mt-1" onChange={filterGear} />
                <span>gear manual</span>
              </div>
            </div>
          </div>
        </div>

        {showLoading ? <h2 className='text-center'><div className='text-center mt-4'> <BeatLoader /> </div></h2> : ""}
        {ar.length === 0 && !showLoading ?
          <p className="mt-5 text-center h3 gradi">Search not match, try another query...</p> : ""}
        <div className="row">
          {ar.map((item) => {
            return <SaleItem key={item._id} item={item} />;
          })}
        </div>
        <div className="d-flex"></div>
      </div>
      <div style={{ minHeight: "3vh" }}></div>
    </div>
  );
}

export default SaleList;
