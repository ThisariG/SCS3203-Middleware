import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useRoutes, useMatch } from 'react-router-dom';

import { Skeleton } from '@mui/material';

import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import { authenticateUser } from './api';
import Cart from './pages/Cart';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Payments from './pages/Payments';
import Products from './pages/Products';
import Register from './pages/Register';
import SellerAddProducts from './pages/SellerAddProduct';
import User from './pages/User';

// ----------------------------------------------------------------------

const RequireAuth = ({ children, role }) => {
  // const { data: user, isSuccess: userSuccess } = useQuery('user', authenticateUser);
  // const isIndexPath = useMatch('/dashboard/index')
  // if (!userSuccess || !user) {
  //   return <Skeleton />;
  // }

  // if (isIndexPath)
  //   if (user.role === 'seller') return <Navigate to="/dashboard/sellerAddProduct" />;
  //   else if (user.role === 'buyer') return <Navigate to="/dashboard/products" />;

  // if (user.role === role) {
  //   return children;
  // }

  // return <Navigate to="/login" />;
  return children;
};

const ProtectedPage = ({ children, userRole }) => <RequireAuth role={userRole}>{children}</RequireAuth>;

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'index',
          element: <ProtectedPage />,
        },
        {
          path: 'products',
          element: (
            <ProtectedPage userRole={'buyer'}>
              <Products />
            </ProtectedPage>
          ),
          index: true,
        },
        {
          path: 'payments',
          element: (
            <ProtectedPage userRole={'buyer'}>
              <Payments />
            </ProtectedPage>
          ),
        },
        {
          path: 'cart',
          element: (
            <ProtectedPage userRole={'buyer'}>
              <Cart />
            </ProtectedPage>
          ),
        },
        {
          path: 'sellerAddProduct',
          element: (
            <ProtectedPage userRole={'seller'}>
              <SellerAddProducts />
            </ProtectedPage>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
