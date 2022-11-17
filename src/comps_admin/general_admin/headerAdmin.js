import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';

function HeaderAdmin(props) {
  let nav = useNavigate()
  const [isOpen, setOpen] = useState(false)

  const onLogOutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      nav("/admin/logout");
    }
  };

  window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  const closeBurger = () => {
    setOpen(false)
  };

  return (
    <header className='shadow header-client container-fluid position-fixed '>
      <div className="container">
        <nav className='col-md-auto navbar navbar-expand-md navbar-light '>
          <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/checkout">
            <h2>Admin panel</h2>
          </Link>
          <button style={{ borderRadius: "24px 8px", color: "#e91e63" }} className="navbar-toggler btn" data-toggle="collapse" data-target="#navbarMenu">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </button>
          <div className='d-md-flex align-items-center collapse navbar-collapse justify-content-end me-5' id="navbarMenu">
            <div className='links_header d-flex'>
              <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/saleCars" ><i className="fa fa-car me-2" aria-hidden="true"></i>Sale Cars</Link>
              <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/rentalCars" ><i className="fa fa-key me-2" aria-hidden="true"></i>Rental Cars</Link>
              <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/users" ><i className="fa fa-users me-2" aria-hidden="true"></i>Users</Link>
              <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/checkout" ><i className="fa fa-credit-card-alt me-2" aria-hidden="true"></i>Checkout</Link>
              <Link onClick={closeBurger} data-toggle="collapse" data-target="#navbarMenu" to="/admin/cooperative" ><i className="fa fa-american-sign-language-interpreting me-2" aria-hidden="true"></i>cooperative</Link>
            </div>
            {localStorage["tok"] ?
              <button onClick={onLogOutClick} className='btn'><i className="mx-2 fa fa-sign-out" aria-hidden="true"></i></button> : ""}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderAdmin