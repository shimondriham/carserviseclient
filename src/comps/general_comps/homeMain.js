import { Link } from 'react-router-dom';

function HomeMain(props) {

return(
<div className='container-fluid shadow'>
<div className='container py-4 categories_list'>
  <h2 className='text-center gradi text-uppercase'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Our Categories</h2>
  <div className="row">
        <Link to={"/rentalCat"} className='myCard col-md-6 p-3'>
          <div className="shadow bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/cover1.jpeg")`}} className='img_card'></div>
            <h3 className='text-center p-3'>Rental Cars</h3>
          </div>
        </Link>
        <Link to={"/sale"} className='myCard col-md-6 p-3'>
          <div className="shadow bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/cover3.webp")`}} className='img_card'></div>
            <h3 className='text-center p-3'>Sale Cars</h3>
          </div>
        </Link>
        <Link to={"/cooperative"} className='myCard col-md-6 p-3'>
          <div className="shadow bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/cooperative.webp")`}} className='img_card'></div>
            <h3 className='text-center p-3'>Cooperative Cars</h3>
          </div>
        </Link>
        <Link to={"/contact"} className='myCard col-md-6 p-3'>
          <div className="shadow bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/contact.webp")`}} className='img_card'></div>
            <h3 className='text-center p-3'>Contact Us</h3>
          </div>
        </Link>
      </div>
</div>
<div style={{ minHeight: "3vh" }}></div>
</div> 
)
}

export default HomeMain