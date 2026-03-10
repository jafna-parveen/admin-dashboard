import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/authGuard';

import InstitutionProfile from 'ui-component/institution-profile';

// Pages
const DashboardDefault = Loadable(lazy(() => import('ui-component/dashboard')));
const Institutions = Loadable(lazy(() => import('ui-component/institutions')));
const Students = Loadable(lazy(() => import('ui-component/students')));
const Seatmanagement = Loadable(lazy(() => import('ui-component/seatmanagement')));
const Order = Loadable(lazy(() => import('ui-component/order')));
const Category = Loadable(lazy(() => import('ui-component/category')));
const Subcategory = Loadable(lazy(() => import('ui-component/subcategory')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor', 'Surveyor', 'Requester', 'Institution']}>
      <MainLayout />
    </AuthGuard>
  ),

  children: [

    /* Default route */
    {
      index: true,
      element: <Navigate to="/dashboard" replace />
    },

    {
      path: 'dashboard',
      element: <DashboardDefault />
    },

    {
      path: 'institutions',
      element: < Institutions/>
    },

    {
      path: 'students',
      element: <Students />
    },

    {
      path: 'category',
      element: <Category />
    },

    {
      path: 'order',
      element: <Order />
    },

    {
      path: 'seat-management',
      element: <Seatmanagement />
    },

    {
      path: 'subcategory',
      element: <Subcategory />
    },

    {
      path: 'institution-profile',
      element: <InstitutionProfile />
    }

  ]
};

export default MainRoutes;