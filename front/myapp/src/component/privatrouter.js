import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { userStore } from "../store";
export const PrivateRoute = () => {

    useEffect(() => {
        const tUser = document.cookie.includes("t_user");
    
        if (tUser) {
          axios
            .get('http://localhost:4000/user')
            .then(response => {
              userStore.updateData(response.data.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, []);
    

    return (
        document.cookie.includes('t_user') === true ?
            <Outlet /> :            <Navigate to="/signin" />

    )
};

export default PrivateRoute