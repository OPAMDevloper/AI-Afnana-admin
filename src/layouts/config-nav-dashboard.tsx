import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

import { Icon } from '@mui/material';

// import { Article } from '@mui/icons-material';
import { icons } from 'lucide-react';



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
    icon: icon('category'),
  },
  {
    title: "Order",
    path: '/orders',
    icon: icon('ic-order')
  },
  {
    title: "Blogs",
    path: 'blogs',
    icon: icon('ic-blog')
  },
  {
    title: "Add Blogs",
    path: 'add-blogs',
    icon: icon('ic-blog')
  },
  {
    title: "Trash Blogs",
    path: 'trash-blogs',
    icon: icon('ic-blog')
  }


];
