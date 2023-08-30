import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import { Path } from './paths';
import Login from './pages/login/'
import Register from './pages/register/'


import './index.css';

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <h1>Home</h1>
  },
  {
    path: Path.login,
    element: <Login/>
  },
  {
    path: Path.register,
    element: <Register/>
  }
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}  />
    </Provider>
  </React.StrictMode>
);
