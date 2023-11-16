import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null)
    console.log(weather, "<<<<<");

    useEffect(() =>{
        getWeather()
    }, [])
  async function getWeather() {
    try {
        navigator.geolocation.getCurrentPosition(async(position) => {
            const { data } = await axios({
                method: "GET",
                url: "https://weatherapi-com.p.rapidapi.com/current.json",
                params: { q: position.coords.latitude + "," + position.coords.longitude },
                headers: {
                  "X-RapidAPI-Key":
                    "e5958bf854msh13bbe19bb62f8c6p121508jsn299455005ecc",
                  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                },
              });
              setWeather(data)
            // console.log(position, "<<postion");
            // doSomething(position.coords.latitude, position.coords.longitude);
          });
      
    } catch (error) {
        console.log(error, "<<");
    }
  }
  return <>
  <div id="table">
        <table>
          <tr id="head">
            <th>Location</th>
            <th>Weather</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>{weather?.location.name}</td>
            <td>{weather?.current.condition.text}</td>
            <td><img src={weather?.current.condition.icon} width={"40px"}alt="" />
                 </td>
          </tr>
         
        </table>
      </div>
  </>;
}
