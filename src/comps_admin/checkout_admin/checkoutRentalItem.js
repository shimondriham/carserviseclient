import React from 'react';

function CheckoutRentalItem(props){
  let item = props.item;
  return(
    <tr>
      <td>{props.index+1}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.total_price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
      <td>{item.phone}</td>
      <td>{item.startDate.substring(0,10)}</td>
      <td>{item.endDate.substring(0,10)}</td>
    </tr> 
  )
}

export default CheckoutRentalItem;