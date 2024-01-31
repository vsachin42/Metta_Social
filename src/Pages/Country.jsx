import React, { useEffect, useState } from 'react';
import "../Styles/Country.css";
import axios from 'axios';
import { useDebounce } from '../Hooks/useDebounce';

const Country = () => {
   const [currency, setCurrency] = useState("");
   const [data, setData] = useState([]);
   const debounceValue = useDebounce(currency,1000);
   const [countries, setCountries] = useState([]);
   const [page, setPage] = useState(1);
   let [findCurrencyData, setFindCurrencyData] = useState(false);

   const handleChange = e => setCurrency(e.target.value);

   const getData = () => {
   if(currency){
    axios.get(`https://restcountries.com/v3.1/currency/${currency.toLowerCase()}`).then((res) => {
        setData(res.data);
        setFindCurrencyData(true);
       }).catch((err) => {
           setData([]);
           setFindCurrencyData(false);
           console.log(err);
       });
   }else{
       setData([])
       setFindCurrencyData(false);
   }
   axios.get("https://restcountries.com/v3.1/all").then((res) => {
        setCountries(res.data);
       }).catch((err) => {
        console.log(err);
       })
}

const handlePage = (val) => {
    setPage(page+val);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

   useEffect(() => {
      getData();
   }, [debounceValue, page, findCurrencyData]);


  return (
    <div className='Country'>
       <div>
       <input type="text" placeholder='Search By currency INR,EUR' value={currency} onChange={handleChange}/>
       </div>
       <div>
            {
                data.length > 0 && data.map((el) => {
                    return <div key={el.name.common}>
                        <img src={el.flags.png} alt={el.name.common}/>
                        <p>Country's Name: {el.name.common}</p>
                        <p>Capital: {el.capital}</p>
                        <p>Population: {el.population}</p>
                    </div>
                })
            }
            {
                data.length === 0 && countries.length > 0 && countries.map((el,index) => {
                   if(index >= (page-1)*10 && index <= (page*10)-1){
                    return <div key={el.name.common}>
                    <img src={el.flags.png} alt={el.name.common}/>
                    <p>Country's Name: {el.name.common}</p>
                    <p>Capital: {el.capital}</p>
                    <p>Population: {el.population}</p>
                </div>
                   }
                })
            }
       </div>
      {
        !findCurrencyData &&  <div>
        <button disabled={page===1} onClick={() => handlePage(-1)}>Prev</button>
        <button disabled={page===25} onClick={() => handlePage(1)}>Next</button>
        </div>
      } 
    </div>
  )
}

export default Country;