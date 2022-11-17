import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/productDesign.css'

function SaleItem(props) {
  let item = props.item;
  const [popup, setPopup] = useState()
  let nav = useNavigate()

  return (
    <div className='product-item col-md-4 p-2' >
      <div className="shadow text-center" onClick={() => setPopup(true)} style={{ cursor: "pointer" }}>
        <div style={{ backgroundImage: `url(${item.img_url || "/images/cover.jpg"})` }} className='product-img'>
          {item.qty === 0 ?
            <div className='sold-out'>Sold out!</div> : ""
          }
        </div>
        <div className='p-2'>
          <h4 className='gradi'>{item.name}</h4>
          <h5>Year: {item.year}</h5>
          <div>Price: {item.price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></div>
        </div>
      </div>
      {popup ?
        <div className='card-product'>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.img_url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography gutterBottom variant="" component="div">
                {item.year}
              </Typography>
              <Typography gutterBottom variant="" component="div">
                {item.price}<i className="fa fa-ils mx-1 text-dark" aria-hidden="true"></i>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.info}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => nav("/checkoutSale/" + item._id)}>checkout</Button>
              <Button size="large" onClick={() => setPopup(false)} style={{ position: "absolute", top: "0", left: "70%", color: "red" }}>X</Button>
            </CardActions>
          </Card>
        </div>
        : null
      }
    </div>

  )
}

export default SaleItem