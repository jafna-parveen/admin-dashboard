import {
  IconLayoutDashboard,
  IconBook,
  IconUsers,
  IconArmchair,
  IconStar,
  IconBell,
  IconFileAnalytics,
  IconShoppingCart,
  IconMessageDots
} from '@tabler/icons-react';
// constant
const icons = {
  IconLayoutDashboard,
  IconBook,
  IconUsers,
  IconArmchair,
  IconStar,
  IconBell,
  IconFileAnalytics,
  IconShoppingCart,
  IconMessageDots
};
const RoleMenu = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'item',
      url: '/courses',
      icon: icons.IconBook,
      breadcrumbs: false
    },
    {
      id: 'students',
      title: 'Students',
      type: 'item',
      url: '/students',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
     {
      id: 'enquiry',
      title: 'Enquiry',
      type: 'item',
      url: '/enquiry',
      icon: icons.IconMessageDots,
      breadcrumbs: false
    },
    {
      id: 'seat-management',
      title: 'Seat Management',
      type: 'item',
      url: '/seat-management',
      icon: icons.IconArmchair,
      breadcrumbs: false
    },
//     {
//   id: 'order',
//   title: 'Orders',
//   type: 'item',
//   url: '/order',
//   icon: icons.IconShoppingCart,
//   breadcrumbs: false
// },

    {
      id: 'rating',
      title: 'Ratings & Feedback',
      type: 'item',
      url: '/rating',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    // {
    //   id: 'notifications',
    //   title: 'Notification',
    //   type: 'item',
    //   url: '/notification',
    //   icon: icons.IconBell,
    //   breadcrumbs: false
    // },
   
    
     




  ]
};

export default RoleMenu;