import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../../services/localService';

function LogoutClient(props){
  let nav = useNavigate();

  useEffect(() => {
    deleteToken();
    toast.info("You logged out from system , see you soon!")
    nav("/");
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  return(
    <div></div> 
  )
}

export default LogoutClient