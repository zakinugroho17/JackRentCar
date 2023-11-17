import axios from "axios"
import { Link } from "react-router-dom"
import SERVER from "../../constants"



export default function ListTable({rentcar, i , setNotif}){
    async function deleteRentcar(){
        try {
            await axios({
                method : "DELETE",
                url : `${SERVER}/transportation/${rentcar.id}`,
                headers : {
                    "Authorization" : "Bearer " + localStorage.access_token
                }
            })

            setNotif({
                type : "delete",
                message : "Successfully deleted"
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <tr>
        <td>{i+1}</td>
        <td>{rentcar.name}</td>
        <td><img src={rentcar.imgUrl} width={"180px"} alt="" />
            </td>
        <td>{rentcar.description}</td>
        <td>{rentcar.location}</td>
        <td id="asd">{rentcar.price}</td>
        <td id='action'>
            
          <Link to={`/transportation/edit/${rentcar.id}`} id='edit'>Edit</Link>
          <Link to={`/transportation/${rentcar.id}`} id="details">Details</Link>
          <Link to="/" id='delete' onClick={() => {
            deleteRentcar()
          }}>Delete</Link>
        </td>
      </tr>
        </>
    )
}

