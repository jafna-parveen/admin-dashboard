import {
  IconLayoutDashboard,
  IconBuilding,
  IconCategory,
  IconHierarchy,
  IconHeadset
} from '@tabler/icons-react';

// constant
const icons = {
  IconLayoutDashboard,
  IconBuilding,
  IconCategory,
  IconHierarchy,
  IconHeadset
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
      id: 'institutions',
      title: 'Institutions',
      type: 'item',
      url: '/institutions',
      icon: icons.IconBuilding,
      breadcrumbs: false
    },
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/category',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: 'subcategory',
      title: 'Sub Category',
      type: 'item',
      url: '/subcategory',
      icon: icons.IconHierarchy,
      breadcrumbs: false
    },
    {
      id: 'support',
      title: 'Support',
      type: 'item',
      url: '/support',
      icon: icons.IconHeadset,
      breadcrumbs: false
    }
  ]
};

export default RoleMenu;