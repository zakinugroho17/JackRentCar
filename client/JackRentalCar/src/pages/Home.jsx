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
            <th>Description</th>
            <th>Action</th>
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
