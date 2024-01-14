import axios from "axios";
import "../assets/card.scss";
import Rating from '@mui/material/Rating';
import { userStore } from "../store";
import { observer } from "mobx-react-lite";

const Carts = observer(({ data }) => {

  function handleSubmit() {

    axios.post("http://localhost:4000/cart/add", { id: data._id, name: data.name, price: data.price, img: data.img, count: 1 }).then(response => {
      userStore.updateData(response.data.updatedUser)
    }).catch(e => {
      console.log(e)
    })

  }

  return (
    <div className="card">
      <figure>
        <img
          src={data.img}
          alt="dfdf"
        />

      </figure>
      <div>{data.name}</div>
     <div className="rating">
            <Rating name="half-rating-read" value={parseFloat(data.ratings)} precision={0.5} readOnly /><span > {data.ratings}</span>

     </div>
      <div>price {data.price}</div>
      <button onClick={handleSubmit}>Add tto card</button>
    </div>
  );
})
export default Carts;
