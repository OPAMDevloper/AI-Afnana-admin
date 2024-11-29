
// ----------------------------------------------------------------------


import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

import { Icon } from '@mui/material';

// import { Article } from '@mui/icons-material';
import { icons } from 'lucide-react';
import ApiService from 'src/service/network_service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavGroups, NavItem } from './dashboard/nav';


const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navDataold = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    role: ['dashboard']
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
    role: ['user']
  },
  {
    title: 'Add User',
    path: '/add-user',
    icon: icon('ic-user'),
    role: ['user']
  },
  {
    title: 'Trash User',
    path: '/trashuser',
    icon: icon('ic-user'),
    role: ["user"]
  },

  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    role: ["product"]

  },
  {
    title: 'Add Products',
    path: '/add-product',
    icon: icon('ic-cart'),
    role: ["product"]


  },
  {
    title: 'Trash Product',
    path: '/trash-product',
    icon: icon('ic-cart'),
    role: ["product"]

  },
  {
    title: 'Category',
    path: '/category',
    icon: icon('category'),
    role: ["category"]

  },
  {
    title: "Order",
    path: '/orders',
    icon: icon('ic-order'),
    role: ["order"]

  },
  {
    title: "Blogs",
    path: '/blogs',
    icon: icon('ic-blog'),
    role: ["blog"]

  },
  {
    title: "Add Blogs",
    path: '/add-blogs',
    icon: icon('ic-blog'),
    role: ["blog"]

  },
  {
    title: "Trash Blogs",
    path: '/trash-blogs',
    icon: icon('ic-blog'),
    role: ["blog"]

  },
  {
    title: "Admin",
    path: '/admin',
    icon: icon('ic-user'),
    role: ["admin"]

  },
  {
    title: "Add Admin",
    path: '/add-admin',
    icon: icon('ic-user'),
    role: ["admin"]

  },
  {
    title: "Trash Admin",
    path: '/trash-admin',
    icon: icon('ic-user'),
    role: ["admin"]

  },

];
export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: 'ic-analytics',
    role: ['dashboard']
  },
  {
    title: 'User',
    path: '/user',
    icon: 'ic-user',
    role: ['user']
  },
  {
    title: 'Add User',
    path: '/add-user',
    icon: 'ic-user',
    role: ['user']
  },
  {
    title: 'Trash User',
    path: '/trashuser',
    icon: 'ic-user',
    role: ["user"]
  },

  {
    title: 'Product',
    path: '/products',
    icon: 'ic-cart',
    role: ["product"]

  },
  {
    title: 'Add Products',
    path: '/add-product',
    icon: 'ic-cart',
    role: ["product"]


  },
  {
    title: 'Trash Product',
    path: '/trash-product',
    icon: 'ic-cart',
    role: ["product"]

  },
  {
    title: 'Category',
    path: '/category',
    icon: 'category',
    role: ["category"]

  },
  {
    title: "Order",
    path: '/orders',
    icon: 'ic-order',
    role: ["order"]

  },
  {
    title: 'Order Details',
    path: '/order/:id/show',
    icon: 'ic-order',
    role: ['order']

  },
  {
    title: "Blogs",
    path: '/blogs',
    icon: 'ic-blog',
    role: ["blog"]

  },
  {
    title: "Add Blogs",
    path: '/add-blogs',
    icon: 'ic-blog',
    role: ["blog"]

  },
  {
    title: "Trash Blogs",
    path: '/trash-blogs',
    icon: 'ic-blog',
    role: ["blog"]

  },
  {
    title: "Admin",
    path: '/admin',
    icon: 'ic-user',
    role: ["admin"]

  },
  {
    title: "Add Admin",
    path: '/add-admin',
    icon: 'ic-user',
    role: ["admin"]

  },
  {
    title: "Trash Admin",
    path: '/trash-admin',
    icon: 'ic-user',
    role: ["admin"]

  },

];





// Group the navigation items by their base category
export const navData1: NavGroups = {

  dashboard: [
    {
      title: 'Dashboard',
      path: '/',
      icon: 'ic-analytics',
      role: ['dashboard']
    }
  ],

  product: [
    {
      title: 'Product List',
      path: '/products',
      icon: 'ic-cart',
      role: ['product']
    },
    {
      title: 'Add Product',
      path: '/add-product',
      icon: 'ic-cart',
      role: ['product']
    },
    {
      title: 'Trash Product',
      path: '/trash-product',
      icon: 'ic-cart',
      role: ['product']
    }
  ],

  admin: [
    {
      title: 'Admin List',
      path: '/admin',
      icon: 'ic-user',
      role: ['admin']
    },
    {
      title: 'Add Admin',
      path: '/add-admin',
      icon: 'ic-user',
      role: ['admin']
    },
    {
      title: 'Trash Admin',
      path: '/trash-admin',
      icon: 'ic-user',
      role: ['admin']
    }
  ],

  order: [
    {
      title: 'Order',
      path: '/orders',
      icon: 'ic-order',
      role: ['order']
    }
  ],
  CMS: [
    {
      title: 'Category',
      path: '/category',
      icon: 'category',
      role: ['category']
    },
    {
      title: 'Country',
      path: '/country',
      icon: 'ic-country',
      role: ['country']
    }
  ],
  user: [
    {
      title: 'User List',
      path: '/user',
      icon: 'ic-user',
      role: ['user']
    },
    {
      title: 'Add User',
      path: '/add-user',
      icon: 'ic-user',
      role: ['user']
    },
    {
      title: 'Trash User',
      path: '/trashuser',
      icon: 'ic-user',
      role: ['user']
    }
  ],
  blog: [
    {
      title: 'Blog List',
      path: '/blogs',
      icon: 'ic-blog',
      role: ['blog']
    },
    {
      title: 'Add Blog',
      path: '/add-blogs',
      icon: 'ic-blog',
      role: ['blog']
    },
    {
      title: 'Trash Blogs',
      path: '/trash-blogs',
      icon: 'ic-blog',
      role: ['blog']
    }
  ],
};

