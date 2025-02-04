import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // shtohet per me bo check
import axios from 'axios';
import {graphConfig, msalConfig} from "../authConfig";
import * as msal from "@azure/msal-browser";



function GuardRoute({auth, children}) {
    const getAuth = localStorage.getItem('auth');
    const getAzure = localStorage.getItem('auth_ad');
    const [checkAuth, setCheckAuth] = useState(false);

    function checkUser() {
       axios.get(`http://localhost:3333/api/checkuser/`+ getAuth)
            .then(res => {
                const response = res.data.response;
                console.log(res);
                setCheckAuth(true);
            }).catch(error => {
           localStorage.removeItem('auth');
           window.location.href = '/login';
       });

    }

    /*    function checkAdUser() {
        axios.get(`http://localhost:3333/api/checkAdUser/`+ getAzure)
            .then(res => {
                const response = res.data.response;
                setCheckAuth(true);
            })
    }*/

    useEffect(() => {
        if(getAuth){
            checkUser();
        } else if (getAzure){
            setCheckAuth(true);
        }
    },[]);

    return (
        getAuth || getAzure && checkAuth ? children : <Navigate to="/login" replace />

    );
}

export default GuardRoute;

