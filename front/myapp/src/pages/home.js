import React, { useEffect } from "react";
import '../assets/home.scss';
import axios from 'axios';
import { observer } from "mobx-react-lite";
import { storeData } from "../store";
import { useLocation } from "react-router";
import Carts from "../component/carts";
import Filter from "../component/filter";


const Home = observer(() => {
    const location = useLocation()

    useEffect(() => {
        axios.get(`http://localhost:4000/${location.search || ""}`)
            .then((response) => {
                storeData.updateData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <main>
            <section><Filter /></section>
            <section className="container">
                <h1>Featured Products</h1>
                <div>
                    <div className="product__section">
                        {
                            storeData.data.length >= 1 ? storeData.data[storeData.data.length - 1].statusProduct ? storeData.data.map((e, i) => {
                                if (i !== storeData.data.length - 1) {
                                    return <Carts data={e} key={i} />;
                                } else {
                                    return null
                                }
                            }) : "not product" : 'Loading...'
                        }
                    </div>
                </div>
            </section>
        </main>
    );
})

export default Home;
