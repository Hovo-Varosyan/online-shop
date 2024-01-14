import React, { useState } from "react";
import "../assets/login.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import {  storeData, userStore } from "../store";
import { observer } from "mobx-react-lite";

const Login = observer(() => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/signin", { email, password })
      .then((response) => {
        if (response.data.message) {
          userStore.updateData([])
          storeData.updateData([])
          navigate("/");
        } else {
          alert(response.data.err);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="login">
      <section>
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)} >
          <label htmlFor="">Email</label>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} id="email" />
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" />
          <input type="submit" value="Sign in" />
        </form>
        <div className="section__div">
          <div>
            New customer? <a href="/registr">creat your acaunt</a>
          </div>
          <div>
            Forget Password? <a href="/#"> Reset Password</a>
          </div>
        </div>
      </section>
    </main>
  );
})

export default Login;
