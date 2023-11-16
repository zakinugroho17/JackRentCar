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
            <h1>{rentcar.name}</h1>
          <p>{rentcar.createdAt}</p>
          <h2>{rentcar.location}</h2>
          <p>{rentcar.description}</p>
          <button>
         <Link to={`/transportation/${rentcar.id}`}>Details</Link>
         </button>
        </div>
      </div>
        </>
    )
}