import './Card.css'
import './Button.css'
import Button from "./Button";
import { Link, useParams } from 'react-router-dom';

export default function ListCard({rentcar}){

    return (
        <>
        <div id="card">
        <img src={rentcar.imgUrl} alt='Mobil'/>
        <div id='description'>
            <p>{rentcar.name}</p>
          <p>{rentcar.createdAt}</p>
          <h1>{rentcar.location}</h1>
          <p>{rentcar.description}</p>
         <Link to={`/transportation/${rentcar.id}`}>Details</Link>
        </div>
      </div>
        </>
    )
}