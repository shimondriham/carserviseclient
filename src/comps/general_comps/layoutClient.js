import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientFooter from './clientFooter';
import ClientHeader from './clientHeader';
import { AppContext } from "../../context/shopContext"
import "./../css/client.css"
import "./../css/headerFooter.css"

function LayoutClient(props) {
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [sumDays,setSumDays] = useState();


  return (
    <AppContext.Provider value={
      {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sumDays,
        setSumDays
      }
      }>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </AppContext.Provider>
  )
}

export default LayoutClient