import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Footer from "./components/footer";
import Form from "./components/form";
import Admin from "./components/admin";
import Login from "./components/login";
import GuardRoute from "./hook/GuardedRoute";
import Edit from "./components/edit";
import Azure_Callback from "./components/azure_callback";
import { PageLayout } from './components/PageLayout';
import { PublicClientApplication } from '@azure/msal-browser';
import {AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import { msalConfig } from './authConfig';



function App() {
    const getAuth = localStorage.getItem('auth');


    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/newsletter" element={<Form/>}></Route>
                    <Route exact path="/login" element={<Login/>}></Route>
                    <Route exact path="/azure_callback" element={<Azure_Callback/>}></Route>
                    <Route exact path="/admin" element={<Admin/>}></Route>
                    {/*<Route exact path="/admin_backup" element={<GuardRoute auth={getAuth}><Admin/></GuardRoute>}></Route>*/}
                    <Route exact path="/newsletter/edit/:id_customerNwl" element={<GuardRoute auth={getAuth}><Edit /></GuardRoute>}></Route>
                </Routes>
                <Footer/>
            </Router>

        </>
    );
}

export default App;