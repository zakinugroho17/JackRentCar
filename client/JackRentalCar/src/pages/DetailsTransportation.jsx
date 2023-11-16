import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import Button from "../components/Button"

export default function DetailsTransportation(){
    const {id} = useParams()
    const [transportation, setTransportation] = useState(null)
    const navigate = useNavigate()
  
  const [setNotif] = useOutletContext()


    useEffect(()=>{
        getDetailTransportation(id)
        
    }, [])
    async function getDetailTransportation(id){
        try {
            const {data} = await axios({
                method : "GET",
                url : `http://localhost:3000/transportation/${id}`,
                headers : {
                    "Authorization" : "Bearer " + localStorage.access_token
                }
            })

            setTransportation(data);
        } catch (error) {
            navigate('/home')
            setNotif({
                type: "delete",
                message: error.response.data.message
            })
        }
    }
    
    return(
        <>
        <div>
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
        </div>
        <Button value={"Rent Now"} />
        </>
    )
}