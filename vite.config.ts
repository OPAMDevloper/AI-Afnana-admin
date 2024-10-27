// import path from 'path';
// import checker from 'vite-plugin-checker';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // ----------------------------------------------------------------------

// const PORT = 3039;

// export default defineConfig({
//   plugins: [
//     react(),
//     checker({
//       typescript: true,
//       eslint: {
//         lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
//         dev: { logLevel: ['error'] },
//       },
//       overlay: {
//         position: 'tl',
//         initialIsOpen: false,
//       },
//     }),
//   ],
//   resolve: {
//     alias: [
//       {

//         '@mui/material': '@mui/material',
//         '@mui/icons-material': '@mui/icons-material',
//       },
//       {
//         find: /^~(.+)/,
//         replacement: path.join(process.cwd(), 'node_modules/$1'),
//       },
//       {
//         find: /^src(.+)/,
//         replacement: path.join(process.cwd(), 'src/$1'),
//       },
//     ],
//   },
//   server: { port: PORT, host: true },
//   preview: { port: PORT, host: true },
// });

import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 3039;

export default defineConfig({
  define: {
    'import.meta.env.BASE_URL': JSON.stringify(process.env.VITE_APP_BASE_URL)
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [

      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});