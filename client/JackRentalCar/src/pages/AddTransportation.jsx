import axios from "axios";
import Button from "../components/Button";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SERVER from "../../constants";

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

//   console.log(rentcars)

  async function getTransportation(id) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${SERVER}/transportation/${id}`, //`http://localhost:3000/transportation/${id}`,
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
        // console.log("masuk");
      const { data } = await axios({
        method: id ? "PUT" : "POST",
        url: id
          ? `${SERVER}/transportation/edit/${id}`  // http://localhost:3000/transportation/edit/${id}
          : `${SERVER}/transportation/`,  //"http://localhost:3000/transportation/"
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
    //   console.log(data, "<<dataa");
      setNotif({
        type: "success",
        message: id
          ? "Successfully Edit Transportation"
          : "Sucessfully Add Transportation",
      });

      navigate("/");
    } catch (error) {
        console.log(error);
      setNotif({
        type: "delete",
        message: error.response.data.message,
      });
    }
  }

  return (
    <>
    <div id="form">
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
        style={{ padding: "50px"}}
      >
        <h1>{id ? `Edit Transportation` : `Add Transportation`}</h1>
        <div className="input-type-text">
        <label htmlFor="" style={{ width: "auto" }}>
          Name
        </label>
        <input id="name" type="text" defaultValue={rentcars?.data.name} />
        </div>
        <div className="input-type-text">
        <label htmlFor="">Image</label>
        <input id="imgUrl" type="text" defaultValue={rentcars?.data.imgUrl} />
        </div>
        <div className="input-type-text">
        <label htmlFor="">Description</label>
        <input id="description" type="text" defaultValue={rentcars?.data.description} />
        </div>
        <div className="input-type-text">
        <label htmlFor="">Location</label>
        <input id="location" type="text" defaultValue={rentcars?.data.location} />
        </div>
        <div className="input-type-number">
        <label htmlFor="">Price</label>
        <input id="price" type="number" defaultValue={rentcars?.data.price} />
        </div>

        <Button value={id ? `Edit Transportation` : `Add Transportation`} />
      </form>
      </div>
    </>
  );
}
