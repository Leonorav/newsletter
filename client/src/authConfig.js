import * as msal from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
        directoryId: "",
        clientId: "",
        authority: "https://login.microsoftonline.com/",
        redirectUri: "https://localhost:3000/azure_callback",
        client_secret: "",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    response_type: 'code',
    approval_prompt: 'auto',
    scopes: ["User.Read"] };

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages"
};

export const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false,
};

export const silentRequest = {
    scopes: ["openid", "profile", "User.Read", "Mail.Read"]
};

