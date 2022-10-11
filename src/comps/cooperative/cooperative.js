import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/cooperative.css";
import Message from "./message";
import NavCooper from "./navCooper";
import { API_URL } from "../../services/apiService";
import { Link, useNavigate } from 'react-router-dom';


function Cooperative(props) {
  const [viewport, setViewport] = useState({
    latitude: 32.075874,
    longitude: 34.800098,
    zoom: 12.7,
  });
  const [ar, setAr] = useState([]);
  const [style, setStyle] = useState("mapbox://styles/mapbox/streets-v11");
  const [selectedCar, setSelectedCar] = useState(null);
  // const [open, setOpen] = useState(true);
  const nav = useNavigate()

  useEffect(() => {
    doApi();
    navigator.geolocation.getCurrentPosition(pos => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedCar(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [style]); // eslint-disable-line react-hooks/exhaustive-deps

  //API fron gov.il
  const doApi = async () => {
    let url = API_URL + "/cooperative";
    let resp = await axios.get(url);
    setAr(resp.data);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Message />
      <NavCooper setStyle={setStyle} />
      <div className="add-cooper">
        <button className="h3" title="add new car" onClick={() => nav("/cooperative/addCar")}>
        <i className="fa fa-plus text-warning" aria-hidden="true"></i>
        </button>
      </div>

      <div className="my-cooper">
        <button className="h3" title="my cooperative cars" onClick={() => nav("/cooperative/myCooper")}>
        <i className="fa fa-car text-primary" aria-hidden="true"></i>
        </button>
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidXJpYTEzNDYiLCJhIjoiY2w0YmczdDhiMG92eDNsbzdtdGNvd3kxNyJ9.T8AiSpg2KXsfovyZk_Yc6w"
        width="100%"
        height="100%"
        transitionDuration="10"
        mapStyle={style}
        onViewportChange={(viewport) => setViewport(viewport)}
      > 
        {ar.map((item) => {
          return (
            <Marker
              key={item.short_id}
              latitude={item.longitude}
              longitude={item.attitude}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCar(item);
                  // setOpen(true)
                }}
              >
                <img src="/logo.png" alt="Parking Icon" />
              </button>
            </Marker>
          );
        })}
        {selectedCar  ? (
          <Popup
            latitude={selectedCar.longitude}
            longitude={selectedCar.attitude}
            
            onClose={() => {
              console.log("yes");
              // setOpen(false)
            }}
          >

            <div className="h4 pop">
              <div className="text-center">
              {selectedCar.name}
              </div>
              <div>
              <h5 className="text-center">{selectedCar.year}</h5>
            </div>
              <div className="text-center mb-3">
            <img
              alt={selectedCar.name}
              width="100%"
              src={selectedCar.img_url}
              style={{ width: "20vh"}}
              className="mt-3 img-pop"
              />
              </div>
            <div>
              <h5 className="text-center">{selectedCar.day_price}<i className="fa fa-ils mx-1 text-dark" aria-hidden="true"></i> 
              <br></br>
              Per Hour</h5>
            </div>
            <div className="row d-flex justify-content-center align-content-center mt-2">
             <Link to={"/cooperative/" + selectedCar._id} className=" text-center text-decoration-none btn btn-dark">
              Order now
             </Link>
             </div>
              </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Cooperative;
