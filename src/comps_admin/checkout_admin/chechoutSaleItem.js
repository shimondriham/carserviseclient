import React from 'react';

function CheckoutSaleItem(props){
  let item = props.item;
  return(
    <tr>
      <td>{props.index+1}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
      <td>{item.phone}</td>
    </tr> 
  )
}

export default CheckoutSaleItem;