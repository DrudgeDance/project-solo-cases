import React from 'react';
import { useMsal } from '@azure/msal-react';

const MicrosoftOAuth = ({ onSignIn }) => {
    const { instance } = useMsal();

    const handleLogin = (e) => {
        e.preventDefault();
        instance.loginPopup({
            scopes: ["User.Read"] // Specify the scopes you need
        }).then(response => {
            // You could get tokens here if needed
            onSignIn(response.account);
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <button onClick={handleLogin}>Sign in with Microsoft</button>
    );
};

export default MicrosoftOAuth;
