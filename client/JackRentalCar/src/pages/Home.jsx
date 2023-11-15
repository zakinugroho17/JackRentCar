// import axios from 'axios'
// import Card from '../components/Card'
import './Home.css'
// import { useEffect, useState } from 'react'
// import ListTable from '../components/ListTable'
import { Link, useOutletContext } from 'react-router-dom'
export default function Home() {
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
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Toyota Camry</td>
            <td><img src="https://placekitten.com/g/200/300" alt="" /></td>
            <td>Sedan dengan kinerja yang handal dan nyaman untuk perjalanan sehari-hari.</td>
            <td>Jakarta</td>
            <td>8000000</td>
          </tr>
        </table>
      </div>
      {/* <div id="card-container">
        <Card />
        <Card />
        <Card />
      </div> */}
    </>
  );
}
