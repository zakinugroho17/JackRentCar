import './Card.css'
import './Button.css'
import Button from "./Button";

export default function ListCard({rentcar}){
    return (
        <>
        <div id="card">
        <img src={rentcar.imgUrl} alt='Mobil'/>
        <div id='description'>
          <p>{rentcar.createdAt}</p>
          <h1>{rentcar.location}</h1>
          <p>{rentcar.description}</p>
          <Button value={"details"} type={""}/>
        </div>
      </div>
        </>
    )
}