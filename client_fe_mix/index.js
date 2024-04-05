import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';
import App from './src/components/App.js';

// MS OAuth Wrapper
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './src/components/Pages/OAuth/oauth_msalConfig.js';

const msalInstance = new PublicClientApplication(msalConfig);
const container = document.getElementById('main');

if ( !container ) {
  throw new Error("Failed to find the MAIN element in index.html");
} else {
  const root = createRoot(container); // Create a root.
  root.render(
    <React.StrictMode>
      {/* REDUX (Provider) */}
      <Provider store ={store}>  
        {/* REACT-ROUTER-DOM (BrowserRouter) */}
        <BrowserRouter>
          {/* MS OAuth (MSAL Provider) */}
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
};