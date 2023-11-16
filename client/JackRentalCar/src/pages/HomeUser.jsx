import Card from '../components/Card';
import './Home.css'
import { useEffect, useState } from 'react'
import ListTable from '../components/ListTable'
import { Link, useOutletContext } from 'react-router-dom'
import axios from 'axios';
import Weather from '../components/Weather';

export default function HomeUser() {
  return (
    <>
      {/* <div id="table">
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
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
         <tr>
            <td>1</td>
            <td>BMW M2</td>
            <td><img src="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023-bmw-m2-2.jpg" width={"300px"} alt="" /></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</td>
            <td>Jakarta</td>
            <td>9000000</td>
            <td>Ready</td>
            <td><a href="">Rental Now</a></td>
         </tr>
        </table>
      </div> */}
       <div>
      <Weather />
    </div>
      <div id="card-container">
        <Card />
      </div>
    </>
  );
}
