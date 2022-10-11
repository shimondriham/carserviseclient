import React , {useEffect,useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {doApiGet} from '../services/apiService';

function PageLinks(props){
  const nav = useNavigate();
  const [pages,setPages] = useState(0)

  useEffect(() => {

    doApi()
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setPages(Math.ceil(resp.data.amount / props.perPage));
  }


  return(
    <div className='my-3'>
      {[...Array(pages)].map((item,i) => {
        return(
          <button key={i} className={props.clsCss} onClick={() => {
            nav(props.urlLinkTo+"?page="+(i+1))
          }}>{i + 1}</button>
        )
      })}
    </div> 
  )
}

export default PageLinks