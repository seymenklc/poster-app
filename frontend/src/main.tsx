import React from 'react';
import ReactDOM from 'react-dom/client';

import ApolloClientProvider from '@/components/ApolloProvider';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '@/App';
import '@/index.css';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ApolloClientProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloClientProvider>
  </React.StrictMode>
);