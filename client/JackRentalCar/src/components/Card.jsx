import Button from "./Button";


import { useEffect, useState } from 'react'
import ListTable from '../components/ListTable'
import { Link, useOutletContext } from 'react-router-dom'
import axios from 'axios';
import ListCard from "./ListCard";

export default function Card() {
  const [rentcars, setRentcars] = useState(null);
  const [setNotif, notif] = useOutletContext()
 

  console.log(rentcars, "<<<<<");
  useEffect(() =>{
    getTranspotation()
  }, [notif])

  async function getTranspotation(){
    try {
      const { data } = await axios({
        method : "GET",
        url : "http://localhost:3000/transportation",
        headers : {
          "Authorization" : "Bearer " + localStorage.access_token
        }
      })
      setRentcars(data)
    } catch (error) {
      setNotif({
        type : "delete",
        message : error.response.data.message
      })
    }
  }
  return (
    <>
      {rentcars && rentcars.rows.map((rentcar) =>{
        return <ListCard rentcar={rentcar} />
      })}
    </>
  )
}