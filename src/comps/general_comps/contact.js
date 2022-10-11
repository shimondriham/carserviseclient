import React, { useRef } from 'react';
import "../css/contact.css"
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Contact(props){

  const form = useRef();
  const nav = useNavigate()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cars2', 'template_l4u38gj', form.current, 'S-Ds8GiPepCGJjc7-')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      toast.success("Thank you, We will get back to you soon")
      nav(-1)
    };


    return(
      <div className='contact-page'>
                  <div style={{ minHeight: "3vh" }}></div>
            <section className="contact">
    <div className="content">
      <h4 className='gradi'>contact us!</h4>
        <p className='mt-4'>All our customers know that with us you will receive the most professional and fast response available.
          857,684 customers are not wrong!
          <br></br>
          Regards
          <br></br>
          development team</p>
    </div>
    <div className="containerd">
        <div className="contactInfo">
          <div className="box">
            <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Address</h3>
              <p>7367  Sugar Camp Road,<br></br>Owatonna,Minnesota,<br></br>5060</p>
            </div>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-phone" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Phone</h3>
              <p>+972-54-927-7523</p>
            </div>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Email</h3>
              <p>Shimondriham523@gmail.com</p>
            </div>
          </div>
          </div>
          <div className="contactForm">
            <form ref={form} onSubmit={sendEmail}> 
              <h2 className='text-center'>Send Message</h2>
              <br></br>
              <div className="inputBox">
                <input  type="text" name='name' required/>
                <span>Full Name</span>
              </div>

              <div className="inputBox">
                <input name='email' type="email" required/>
                <span>email</span>
              </div>

              <div className="inputBox">
                <textarea required name="message"></textarea>
                <span>Type your Message...</span>
              </div>
              <div className="inputBox">
                <button className='btn'>Send</button>
              </div>
            </form>
          </div>
        </div>
        <div style={{ minHeight: "6vh" }}></div>
    </section> 
    </div>
    )
}

export default Contact