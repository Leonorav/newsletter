import axios from 'axios';
import {useForm} from "react-hook-form";
import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as msal from '@azure/msal-browser';
import {msalConfig, loginRequest, graphConfig} from '../authConfig';
import {InteractionRequiredAuthError} from "@azure/msal-browser";
import {callMSGraph} from '../graph';
import {AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import Azure_Callback from "./azure_callback";
import ReactDOM from 'react-dom/client';


function Login() {
        const getAuth = localStorage.getItem('auth');
        const {register, handleSubmit, reset, formState: {errors}} = useForm();
        const onSubmit = data => Add(data);

        const handleLogin = async () => {
            console.log('onClick');

            const msalInstance = new msal.PublicClientApplication(msalConfig);
            const root = ReactDOM.createRoot(document.getElementById('root'));

            /**
             * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
             */
            root.render(
                <React.StrictMode>
                    <MsalProvider instance={msalInstance}>
                        <Azure_Callback />
                    </MsalProvider>
                </React.StrictMode>
            );


            //Redirect: once login is successful and redirects with tokens,call Graph API
            //myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
            //console.error(err);
            //});

            try {
                const loginResponse = await msalInstance.loginRedirect(loginRequest);
                console.log('HERE0');
                console.log(loginResponse);
                const accessToken = loginResponse.accessToken;
                localStorage.setItem("auth_ad", accessToken);
                window.location.replace("/admin");
            } catch (err) {
                console.log('Error');
                // handle error
            }


            //Acquiring an Access Token

            msalInstance.acquireTokenSilent(loginRequest).then(tokenResponse => {
                // Do something with the tokenResponse
                callMSGraph(graphConfig.graphMeEndpoint, tokenResponse, () => {

                });
            }).catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return msalInstance.acquireTokenRedirect(loginRequest)
                }

                // handle other errors
            });
        };


        function Add(data) {
                axios.post(process.env.REACT_APP_API_URL + '/api/login', {data}).then(res => {
                        const response = res.data.response;
                        console.log(response);

                        if (response !== 403) {
                            localStorage.setItem('auth', response);
                            window.location.replace("/admin");
                        } else {
                            toast.error("Email or password wrong!");
                        }
                    }).catch((error) => {
                        console.log(error)
                })
        }


//  useEffect(() => {
//      if(getAuth){
//          window.location.replace("/admin");
//      }
//  });

        return (
            <>
                <ToastContainer/>
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
                    <div className="w-full max-w-md space-y-7">
                        <div>
                            <img
                                className="mx-auto w-auto"
                                src="https://cdn.loeffelhardt.de/images/general/loeffelhardt-logo-small.png"
                                alt="Loeffelhardt"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Welcome in Login Site
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" name="remember" defaultValue="true"/>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input {...register("email", {required: true})}
                                           name="email"
                                           type="email"
                                           className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Email address"
                                    />
                                    {errors.email && <span><div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4  rounded relative"
                                        role="alert">This field is required</div></span>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input {...register("password", {required: true})}
                                           name="password"
                                           type="password"
                                           className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Password"
                                    />
                                    {errors.password && <span><div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4  rounded relative"
                                        role="alert">This field is required</div></span>}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-el-100 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Login
                                </button>
                            </div>
                        </form>
                        <button onClick={handleLogin}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-el-100 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Log in with Löffelhardt account
                        </button>
                    </div>
                </div>
            </>
        );



};

export default Login;