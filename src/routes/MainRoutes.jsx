import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/authGuard';

import InstitutionProfile from 'ui-component/institution-profile';
// dashboard routing

// Pages
const DashboardDefault = Loadable(lazy(() => import('ui-component/dashboard')));
const Course = Loadable(lazy(() => import('ui-component/courses')));
const Students = Loadable(lazy(() => import('ui-component/students')));
const Seatmanagement = Loadable(lazy(() => import('ui-component/seatmanagement')));
const Order = Loadable(lazy(() => import('ui-component/order')));
const Enquiry= Loadable(lazy(() => import('ui-component/enquiry')));

/* ✅ Ratings Page */
const UserRatingPage = Loadable(
  lazy(() => import('ui-component/user_rating'))
);

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor', 'Surveyor', 'Requester','Institution']}>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    
    {
  path: '',
  element: <Navigate to="/login" replace />
},
   

    {
      path: 'dashboard',
      element: <DashboardDefault />
    },

    {
      path: 'courses',
      element: <Course />
    },

    {
      path: 'students',
      element: <Students />
    },

    {
      path: 'enquiry',
      element: <Enquiry />
    },
    {
      path: 'order',
      element: <Order />
    },

    {
      path: 'seat-management',
      element: <Seatmanagement />
    },

    /* ✅ Ratings Page */
    {
      path: 'rating',
      element: <UserRatingPage />

    },
    {
  path: 'institution-profile',
  element: <InstitutionProfile />
}

    


  ]
};

export default MainRoutes;