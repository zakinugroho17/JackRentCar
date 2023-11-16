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
       <div>
      <Weather />
    </div>
      <div id="card-container">
        <Card />
      </div>
    </>
  );
}
