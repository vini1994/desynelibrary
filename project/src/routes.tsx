import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { PublicPreview } from './pages/PublicPreview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/preview/:id',
    element: <PublicPreview />
  }
]);
