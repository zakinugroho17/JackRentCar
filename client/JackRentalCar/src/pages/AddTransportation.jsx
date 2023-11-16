import axios from "axios";
import Button from "../components/Button";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddTransportation() {
  const [rentcars, setRentcars] = useState(null);
  const { id } = useParams();
  const [setNotif] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTransportation(id);
    }
  }, []);

  console.log(rentcars)

  async function getTransportation(id) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/transportation/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      
      setRentcars(data);
    } catch (error) {
      setNotif({
        type: "delete",
        message: error.response.data.message,
      });
      navigate("/transportation/add");
    }
  }

  async function addTransportation(value) {
    try {
      const { data } = await axios({
        method: id ? "PUT" : "POST",
        url: id
          ? `http://localhost:3000/transportation/edit/${id}`
          : "http://localhost:3000/transportation/",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: {
          name: value.name,
          imgUrl: value.imgUrl,
          description: value.description,
          location: value.location,
          price: value.price,
          status: "Ready",
        },
      });

      setNotif({
        type: "success",
        message: id
          ? "Successfully Edit Transportation"
          : "Sucessfully Add Transportation",
      });

      navigate("/");
    } catch (error) {
      setNotif({
        type: "delete",
        message: error.response.data.message,
      });
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = {
            name: e.target[0].value,
            imgUrl: e.target[1].value,
            description: e.target[2].value,
            location : e.target[3].value,
            price : e.target[4].value

          };
          addTransportation(value);
        }}
        action=""
        style={{ padding: "50px" }}
      >
        <h1>{id ? `Edit Transportation` : `Add Transportation`}</h1>
        <label htmlFor="" style={{ width: "auto" }}>
          Name
        </label>
        <input id="name" type="text" defaultValue={rentcars?.data.name} />
        <label htmlFor="">Image</label>
        <input id="imgUrl" type="text" defaultValue={rentcars?.data.imgUrl} />
        <label htmlFor="">Description</label>
        <input id="description" type="text" defaultValue={rentcars?.data.description} />
        <label htmlFor="">Location</label>
        <input id="location" type="text" defaultValue={rentcars?.data.location} />
        <label htmlFor="">Price</label>
        <input id="price" type="number" defaultValue={rentcars?.data.price} />

        <Button value={id ? `Edit Transportation` : `Add Transportation`} />
      </form>
    </>
  );
}
