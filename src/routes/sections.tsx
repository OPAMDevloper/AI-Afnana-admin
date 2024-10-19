import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import ProfileSidebar from 'src/sections/user/view/profileSidebar';
import CategoryManagement from 'src/pages/categoryPage';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
const AddEditUserPage = React.lazy(() => import('src/pages/userAddEdit'));
const profileSidebar = React.lazy(() => import('src/sections/user/view/profileSidebar'));
export const TrashUserPage = lazy(() => import('src/pages/trashuser'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
const TrashProductPage = lazy(() => import('src/pages/trashproduct'));
const AddEditProductPage = lazy(() => import('src/pages/addEditProduct'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'trashuser', element: <TrashUserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'add-product', element: <AddEditProductPage /> },
        { path: 'product/:id/edit', element: <AddEditProductPage /> },
        { path: 'trash-product', element: <TrashProductPage />, },
        { path: 'category', element: <CategoryManagement /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'user/:id/edit',
          element: <AddEditUserPage />,
        },
        {
          path: 'profile/:id',
          element: <ProfileSidebar />,
        },
        { path: 'add-user', element: <AddEditUserPage /> },

      ],
    },

    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);
}
