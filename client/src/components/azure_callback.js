import axios from 'axios';
import { useState } from 'react';
import { msalConfig, loginRequest } from '../authConfig';
import {AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal,} from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { callMSGraph } from '../graph';
import * as msal from '@azure/msal-browser';
import { PageLayout } from '../components/PageLayout';
import React from 'react';


const msalInstance = new msal.PublicClientApplication(msalConfig);
const ExampleComponent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const ProfileData = (props) => {
        const { id, email } = props.graphData;

                 axios.post('http://localhost:3333/api/azure_callback', {
                    test: 'abc',
                     id: 'props.graphData.id',
                     email: 'props.graphData.email'
                }).then((res) => {
                    const response = res.data;
                    console.log(response);
                }).catch((error) => {
                    console.log(error)
                });


        return (
            <div>
                <h2>Profile Data</h2>
                <p>ID: {id}</p>
                <p>Email: {email}</p>

            </div>
        );
    };

    const getGraphData = async () => {
        try {
            const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            });
            console.log(response);
            const graphResponse = await callMSGraph(response.accessToken);
            setGraphData(graphResponse);
        } catch (err) {
            if (err instanceof InteractionRequiredAuthError) {
                await instance.acquireTokenRedirect({
                    ...loginRequest,
                    account: accounts[0],
                });
            } else {
                console.log(err);
            }
        }
    };

    return (
        <div>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <button onClick={getGraphData}>Request Profile Information</button>
            )}
        </div>
    );
};

const Azure_Callback = (props) => {
    return (
        <>
        <MsalProvider instance={msalInstance}>
                    <ExampleComponent />
        </ MsalProvider>
        </>
    );
};

export default Azure_Callback;
