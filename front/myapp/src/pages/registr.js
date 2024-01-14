import React, { useState } from "react";
import "../assets/login.scss";
import axios from "axios";
import { useNavigate } from "react-router";

function Registr() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [name, setName] = useState();

const navigate=useNavigate()

  function handleSubmit(e) {

    
    e.preventDefault();
    if (password === confPassword) {
      
      axios.post("http://localhost:4000/registr", { email, password, name })
        .then((response) => {
           if (response.data.status) {
             navigate("/signin");
           } else {
             alert(response.data.message);
           }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("false password");
    }
  }

  return (
    <main className="login">
      <section>
        <h1>Registration</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />{" "}
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <label htmlFor="confpassword">Confirm Password</label>
          <input
            type="password"
            name="confpassword"
            onChange={(e) => setConfPassword(e.target.value)}
            id="confpassword"
          />
          <input type="submit" value="registr" />
        </form>
        <div className="section__div">
          <div>
            customer? <a href="/signin"> your acaunt</a>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Registr;
