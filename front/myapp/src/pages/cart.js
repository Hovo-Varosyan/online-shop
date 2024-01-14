import React  from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store';
import '../assets/cart.scss'
import axios from 'axios';

const Cart = observer(() => {
  
  function handleDelete(e) {

    axios.delete(`http://localhost:4000/cart/delete?id=${e}`)
      .then(response => { userStore.cardDelete(e) })
      .catch((err) => console.log(err))
  }

  function handleCount(e){
    axios.put(`http://localhost:4000/cart/count`,e)
    .then(response => { userStore.cardCount(e) })
    .catch((err) => console.log(err))
  }

  return (

    <main className='container'>
      <h1>Shoping cart</h1>
      {userStore.data?.card?.length > 0 ? (
        userStore.data.card.map((item, i) => (
          <section className='cart_section__container' key={i}>
            <div className='section__div'>
              <figure>
                <img src={item.img} alt='' />
              </figure>
              <span>{item.name}</span>
            </div>
            <div className='count__button'>
              <button onClick={()=>(handleCount({_id:item._id, count:item.count-1}))} disabled={item.count === 1}>-</button>
              <div>{item.count}</div>
              <button onClick={()=>(handleCount({_id:item._id, count:item.count+1}))}>+</button>
            </div>
            <div>{item.price}</div>
            <button  onClick={() => handleDelete(item._id)} className='delete'>delete</button>
          </section>
        ))
      ) : <p>no card</p>}
    </main>
  );
});

export default Cart;
