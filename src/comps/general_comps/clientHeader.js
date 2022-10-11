import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkTokenLocal } from "../../services/localService";
import Hamburger from "hamburger-react";

function ClientHeader(props) {
  let [login, setLogin] = useState("");
  const [isOpen, setOpen] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setLogin(checkTokenLocal());
  }, [location]);

  window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  const closeBurger = () => {
    setOpen(false);
  };

  return (
    <header className="shadow header-client container-fluid position-fixed ">
      <div className="container">
        <nav className=" navbar navbar-expand-md navbar-light ">
          <Link
            onClick={closeBurger}
            to="/"
          >
            <i
              className="fa fa-ravelry logo me-md-5"
              style={{ fontSize: "28px" }}
              aria-hidden="true"
            ></i>
          </Link>
          <button
            style={{ borderRadius: "24px 8px", color: "#e91e63" }}
            className="navbar-toggler btn"
            data-toggle="collapse"
            data-target="#navbarMenu"
          >
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </button>
          <div
            className="align-items-center collapse navbar-collapse justify-content-around"
            id="navbarMenu"
          >
            <div className="links_header">
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="/"
              >
                <i
                  className="fa fa-home me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Home
              </Link>
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="/rentalCat"
              >
                <i
                  className="fa fa-key me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Rental
              </Link>
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="/sale"
              >
                <i
                  className="fa fa-car d-block text-center"
                  aria-hidden="true"
                ></i>
                Sale
              </Link>
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="recentRental"
              >
                <i
                  className="fa fa-sort me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Recent
              </Link>
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="contact"
              >
                <i
                  className="fa fa-phone me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Contact
              </Link>
              <Link
                onClick={closeBurger}
                data-toggle="collapse"
                data-target="#navbarMenu"
                to="cooperative"
              >
                <i
                  className="fa fa-american-sign-language-interpreting me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Cooperative
              </Link>
            </div>
            <div className="log_in_out me-5">
              {login ? (
                <React.Fragment>
                  {" "}
                  <Link to="/logout" className="text-danger" onClick={closeBurger} data-toggle="collapse"
                data-target="#navbarMenu">
                    Sign out
                    <i className="mx-2 fa fa-sign-out" aria-hidden="true"></i>
                  </Link>
                  <Link to="/userInfo" className="h5" onClick={closeBurger} data-toggle="collapse"
                data-target="#navbarMenu">
                    <i
                      className="mx-2 fa fa-user-circle text-white"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="/login" onClick={closeBurger} data-toggle="collapse"
                data-target="#navbarMenu">
                    <i className="fa fa-sign-in mx-2" aria-hidden="true"></i>Log
                    in
                  </Link>
                   <span className="slesh">/</span>
                  <Link to="/signup" onClick={closeBurger} data-toggle="collapse"
                data-target="#navbarMenu">
                    <i className="fa fa-plus mx-2" aria-hidden="true"></i>Sign
                    up
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default ClientHeader;
