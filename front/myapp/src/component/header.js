import React, {  useState } from 'react';
import axios from 'axios';
import '../assets/header.scss';
import { storeData, userStore } from '../store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

const Header = observer(() => {

  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');

  function handleLogout() {
    axios.post("http://localhost:4000/logout").then(response => {
      userStore.updateData([])
      storeData.updateData([])
      navigate('/signin')
    }).catch(err => {
      console.log(err)
    })
  }


  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="headers">
      <nav>
        <div className="flex">
          <div className="menu_button">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <a href="/" className="logo">
            magazin
          </a>
          <div>
            <form method='GET' onSubmit={ ()=>   navigate(`/?search=${searchValue}`)}>
              <input
                type="search"
                name="search"
                placeholder='search product'
                value={searchValue}
                onChange={handleInputChange}
              />
              <input type='submit' className='search' value="search" />
            </form>
          </div>
        </div>
        <div className="menu">
          <div className='count__div'>
            <a href="/cart">cart</a>
            {userStore.data?.card?.length > 0 && (
              <div className='count'>{userStore.data.card.length}</div>
            )}

          </div>
          {document.cookie.includes("t_user") ? <button onClick={handleLogout}>Sign out</button> : <a href="/signin">signin</a>}
        </div>
      </nav>
    </header>
  );
})

export default Header;
