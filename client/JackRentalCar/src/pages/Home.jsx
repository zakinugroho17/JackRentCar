import Card from '../components/Card';
import './Home.css'
import { useEffect, useState } from 'react'
import ListTable from '../components/ListTable'
import { Link, useOutletContext } from 'react-router-dom'
import axios from 'axios';
import Weather from '../components/Weather';

export default function Home() {
  const [rentcars, setRentcars] = useState(null);
  const [setNotif, notif] = useOutletContext()
 

  // console.log(rentcars, "<<<<<");
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
      <div id="buttonAdd">
        <Link to={"/transportation/add"}>Add Rentcar</Link>
      </div>

      <div id="table">
        <table>
          <tr id="head">
            <th>No</th>
            <th>Name Car</th>
            <th>Image</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
         {rentcars && rentcars.rows.map((rentcar, i) =>{

          return <ListTable rentcar={rentcar} i={i} setNotif={setNotif} />
         })}
        </table>
      </div>
      {/* <div id="card-container"> */}
        {/* <Card />
        <Card />
        <Card /> */}
      {/* </div> */}
    </>
  );
}
