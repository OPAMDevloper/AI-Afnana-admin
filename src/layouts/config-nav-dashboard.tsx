import { Icon } from '@iconify/react';
import { Icons } from 'react-toastify';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Add User',
    path: '/add-user',
    icon: icon('ic-user'),
  },
  {
    title: 'Trash User',
    path: '/trashuser',
    icon: icon('ic-user'),
  },

  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
  },
  {
    title: 'Add Products',
    path: '/add-product',
    icon: icon('ic-cart'),
  },
  {
    title: 'Trash Product',
    path: '/trash-product',
    icon: icon('ic-cart'),
  },
  {
    title: 'Category',
    path: '/category',
    icon: icon('ic-category'),
  },
  {
    title: "Order",
    path: '/orders',
    icon: icon('ic-order')
  }
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
