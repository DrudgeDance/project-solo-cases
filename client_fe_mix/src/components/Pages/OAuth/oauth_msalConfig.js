export const msalConfig = {
    auth: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your client ID
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace YOUR_TENANT_ID
        redirectUri: 'http://localhost:3000'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};
