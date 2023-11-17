import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SERVER from "../../constants";

export default function DetailsTransportation() {
  const { id } = useParams();
  const [transportation, setTransportation] = useState(null);
  const navigate = useNavigate();

  const [setNotif] = useOutletContext();

  useEffect(() => {
    getDetailTransportation(id);
  }, []);
  async function getDetailTransportation(id) {
    try {
      const { data } = await axios({
        method: "GET",
         url: `${SERVER}/transportation/${id}`,//`http://localhost:3000/transportation/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      setTransportation(data);
    } catch (error) {
      navigate("/home");
      setNotif({
        type: "delete",
        message: error.response.data.message,
      });
    }
  }

  async function createMidtrans(){
    try {
        const {data} = await axios({
            method: 'post',
            url : `${SERVER}/rental/${id}`, // http://localhost:3000/rental/${id}
            data : {
                price : transportation.data.price   
            },
            headers :{
                "Authorization" : "Bearer " + localStorage.access_token
            }
        })
        window.snap.pay(data);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
    <div id="table">
        <table>
          <tr id="head">
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Location</th>
            <th>Price</th>
           
          </tr>
          <tr>
            <td>{transportation?.data.name}</td>
            <td>{transportation?.data.description}</td>
            <td><img src={transportation?.data.imgUrl} width={"300px"}alt="" />
            </td>
            <td>{transportation?.data.location}</td>
            <td>{transportation?.data.price}</td>
            
          </tr>
         
        </table>
      </div>
          


      {/* <div>
        <h1>{transportation?.data.name}</h1>
       
      </div>
      <div>
        <h5>{transportation?.data.description}</h5>
      </div>
      <div>
        <img src={transportation?.data.imgUrl}></img>
      </div>
      <div>
        <h5>{transportation?.data.location}</h5>
      </div>
      <div>
        <h5>{transportation?.data.price}</h5>
      </div> */}
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
       <h3 style={{
        color: '#cbf078'
       }}> {transportation?.data.status}</h3>
       </div>
    
      {transportation?.data.status !== "Rent Successfully Booked" ?
      <>
       <div id="button">

      <button id="pay-button" onClick={(e)=>{
            e.preventDefault()

            createMidtrans()
          }}>Rent Now!</button>
      </div>
      
      </> : ""
        }
    </>
  );
}
