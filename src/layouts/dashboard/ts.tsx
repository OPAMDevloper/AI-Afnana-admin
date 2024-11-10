import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

// import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import ApiService from 'src/service/network_service';
import { Collapse } from '@mui/material';
import { SvgColor } from 'src/components/svg-color';
import { ChevronDown, ChevronRight } from 'lucide-react';
// import { group } from 'console';

// ----------------------------------------------------------------------

// export type NavContentProps = {
// data: {
//   path: string;
//   title: string;
//   icon: React.ReactNode;
//   info?: React.ReactNode;
//   role: string[];
// }[];
//   slots?: {
//     topArea?: React.ReactNode;
//     bottomArea?: React.ReactNode;
//   };
//   sx?: SxProps<Theme>;
// };

// // NavContentProps for data structure


// export type NavItem = {
//     path: string;
//     title: string;
//     icon: string;
//     info?: React.ReactNode;
//     role: string[];
// };

// export type NavContentProps = {
//     data: NavItem[];
//     slots?: {
//         topArea?: React.ReactNode;
//         bottomArea?: React.ReactNode;
//     };
//     sx?: SxProps<Theme>;
//     old: {
//         path: string;
//         title: string;
//         icon: string;
//         info?: React.ReactNode;
//         role: string[];
//     }[];
// };

// export function NavDesktop({
//     sx,
//     data,
//     old,
//     slots,
//     layoutQuery,
// }: NavContentProps & { layoutQuery: Breakpoint }) {
//     const theme = useTheme();

//     return (
//         <Box
//             sx={{
//                 pt: 2.5,
//                 px: 2.5,
//                 top: 0,
//                 left: 0,
//                 height: 1,
//                 display: 'flex',
//                 position: 'fixed',
//                 flexDirection: 'column',
//                 bgcolor: 'var(--layout-nav-bg)',
//                 zIndex: 'var(--layout-nav-zIndex)',
//                 width: 'var(--layout-nav-vertical-width)',
//                 // width: '100',

//                 borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
//                 [theme.breakpoints.up(layoutQuery)]: {
//                     display: 'flex',
//                 },
//                 ...sx,

//             }}
//         >
//             <NavContent data={data} slots={slots} old={old} />
//         </Box>
//     );
// }

// ----------------------------------------------------------------------

// export function NavMobile({
//     sx,
//     data,
//     open,
//     slots,
//     onClose,
// }: NavContentProps & { open: boolean; onClose: () => void }) {
//     const pathname = usePathname();

//     useEffect(() => {
//         if (open) {
//             onClose();
//         }
// eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [pathname]);

//     return (
//         <Drawer
//             open={open}
//             onClose={onClose}
//             sx={{
//                 [`& .${drawerClasses.paper}`]: {
//                     pt: 2.5,
//                     px: 2.5,
//                     overflow: 'unset',
//                     bgcolor: 'var(--layout-nav-bg)',
//                     width: 'var(--layout-nav-mobile-width)',
//                     ...sx,
//                 },
//             }}
//         >
//             <NavContent data={data} slots={slots} />
//         </Drawer>
//     );
// }

// ----------------------------------------------------------------------

// export function NavContent({ data, slots, sx, old }: NavContentProps) {

//     console.log('oldold,', old);

//     const pathname = usePathname();

//     const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
//     const [roles, setRoles] = useState<string[]>([]);
//     // const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 // Replace with actual API call
//                 const response = await new ApiService().get('admin/auth/profile');
//                 setRoles(response.data.roles); // Assume response contains roles in the 'roles' field
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//             }
//         };

//         fetchProfile();
//     }, []);

// // Filter navData based on user roles
// const filteredNavData = navData.filter(item  =>
//   item.roles.some(role => roles.includes(role))
// );

// const filteredNavData = data.filter((item) => {
//   return item.roles?.some((role) => roles.includes(role));
// });
// const filteredNavData = old.filter((item: any) => {
// Ensure each item has a roles field and filter it based on user's roles
//     return item.role?.some((role: any) => roles.includes(role)); // Filter items if any of the roles match
// });



// const filteredNavData = Object.entries(data).reduce((acc, [groupName, items]) => {

//   console.log('filterssssss', items);

//   const filteredItems = items.filter((item: any) =>
//     item.role?.some((role: any) => roles.includes(role))
//   );
//   if (filteredItems.length > 0) {
//     acc[groupName] = filteredItems;
//   }
//   return acc;
// }, {} as { [key: string]: NavItem[] });

// return (
//     <>
//         <Logo />

//         {slots?.topArea}

//         {/* <WorkspacesPopover data={workspaces} sx={{ my: 2 }} /> */}

//         <Scrollbar fillContent>
//             <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
//                 <Box component="ul" gap={0.5} display="flex" flexDirection="column">
//                     {filteredNavData.map((item) => {
//                         const isActived = item.path === pathname;

//                         return (
//                             <ListItem disableGutters disablePadding key={item.title}>
//                                 <ListItemButton
//                                     disableGutters
//                                     component={RouterLink}
//                                     href={item.path}
//                                     sx={{
//                                         pl: 2,
//                                         py: 1,
//                                         gap: 2,
//                                         pr: 1.5,
//                                         borderRadius: 0.75,
//                                         typography: 'body2',
//                                         fontWeight: 'fontWeightMedium',
//                                         color: 'var(--layout-nav-item-color)',
//                                         minHeight: 'var(--layout-nav-item-height)',
//                                         ...(isActived && {
//                                             fontWeight: 'fontWeightSemiBold',
//                                             bgcolor: 'var(--layout-nav-item-active-bg)',
//                                             color: 'var(--layout-nav-item-active-color)',
//                                             '&:hover': {
//                                                 bgcolor: 'var(--layout-nav-item-hover-bg)',
//                                             },
//                                         }),
//                                     }}
//                                 >
//                                     <Box component="span" sx={{ width: 24, height: 24 }}>
//                                         {item.icon}
//                                     </Box>

//                                     <Box component="span" flexGrow={1}>
//                                         {item.title}
//                                     </Box>

//                                     {item.info && item.info}
//                                 </ListItemButton>
//                             </ListItem>

//                         );
//                     })}
//                 </Box>
//             </Box>
//         </Scrollbar>

//         {slots?.bottomArea}

//         {/* <NavUpgrade /> */}
//     </>
// );

// const toggleGroup = (groupName: string) => {
//     setExpandedGroups((prev) => ({
//         ...prev,
//         [groupName]: !prev[groupName],
//     }));
// };

// const icon = (name: string) => (
//     <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
// );


// return (
//     <>
//         <Logo />
//         {slots?.topArea}

//         <Scrollbar fillContent>
//             <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
//                 <Box component="ul" gap={0.5} display="flex" flexDirection="column">
//                     {Object.entries(filteredNavData).map(([groupName, items]) => {

//                         const isExpanded = expandedGroups[groupName] || false;


//                         return (
//                             <ListItem disableGutters disablePadding key={items[0].title}>
//                                 <ListItemButton
//                                     disableGutters
//                                     component={RouterLink}
//                                     href={items[0].path}
//                                     sx={{
//                                         pl: 2,
//                                         py: 1,
//                                         gap: 2,
//                                         pr: 1.5,
//                                         borderRadius: 0.75,
//                                         typography: 'body2',
//                                         fontWeight: 'fontWeightMedium',
//                                         color: 'var(--layout-nav-item-color)',
//                                         minHeight: 'var(--layout-nav-item-height)',
//                                         // ...(isActived && {
//                                         //   fontWeight: 'fontWeightSemiBold',
//                                         //   bgcolor: 'var(--layout-nav-item-active-bg)',
//                                         //   color: 'var(--layout-nav-item-active-color)',
//                                         //   '&:hover': {
//                                         //     bgcolor: 'var(--layout-nav-item-hover-bg)',
//                                         //   },
//                                         // }),
//                                     }}
//                                 >
//                                     <Box component="span" sx={{ width: 24, height: 24 }}>
//                                         {items[0].icon}
//                                     </Box>

//                                     <Box component="span" flexGrow={1}>
//                                         {items[0].title}
//                                     </Box>

//                                     {items[0].info && items[0].info}
//                                 </ListItemButton>
//                             </ListItem>

//                         );
//                     })}
//                 </Box>
//             </Box>
//         </Scrollbar>

{/* <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {Object.entries(filteredNavData).map(([groupName, items]) => {

              const isExpanded = expandedGroups[groupName] || false;

              return (
                <Box key={groupName}> 
                  <ListItemButton
                    disableGutters
                    onClick={() => toggleGroup(groupName)}
                    sx={{
                      pl: 2,
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                      color: 'var(--layout-nav-item-color)',
                      minHeight: 'var(--layout-nav-item-height)',
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24 }}>
                      {icon(items[0].icon)}
                    </Box>

                    <Box component="span" flexGrow={1}>
                      {groupName.charAt(0).toUpperCase() + groupName.slice(1)} 
                    </Box>

                    <Box component="span">
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </Box>
                  </ListItemButton>


                  <Collapse in={isExpanded}>
                    <Box sx={{ pl: 2 }}>
                      {items.map((item) => {
                        const isActive = item.path === pathname;

                        return (
                          <ListItemButton
                            key={item.title}
                            disableGutters
                            component={RouterLink}
                            href={item.path}
                            sx={{
                              pl: 4,
                              py: 1,
                              gap: 2,
                              borderRadius: 0.75,
                              typography: 'body2',
                              color: 'var(--layout-nav-item-color)',
                              minHeight: 'var(--layout-nav-item-height)',
                              ...(isActive && {
                                fontWeight: 'fontWeightSemiBold',
                                bgcolor: 'var(--layout-nav-item-active-bg)',
                                color: 'var(--layout-nav-item-active-color)',
                              }),
                            }}
                          >
                            <Box component="span" sx={{ width: 24, height: 24 }}>
                              {icon(item.icon)}
                            </Box>

                            <Box component="span" flexGrow={1}>
                              {item.title}
                            </Box>
 
                          </ListItemButton>
                        );
                      })}
                    </Box>
                  </Collapse>


                </Box>
              );
            })}
          </Box>
        </Box >
      </Scrollbar > */}


{/* {slots?.bottomArea} */ }
//         </>

//     )




// }


// return (
//   <>
//     <Logo />
//     {slots?.topArea}
//     <Scrollbar fillContent>
//       <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
//         <Box component="ul" gap={0.5} display="flex" flexDirection="column">
//           {Object.entries(filteredNavData).map(([groupName, items]) => {

//             const isExpanded = expandedGroups[groupName] || false;

//             return (
//               <Box key={groupName}>
//                 {/* Group Header (Clickable) */}
//                 <ListItemButton
//                   disableGutters
//                   onClick={() => toggleGroup(groupName)}
//                   sx={{
//                     pl: 2,
//                     py: 1,
//                     gap: 2,
//                     pr: 1.5,
//                     borderRadius: 0.75,
//                     typography: 'body2',
//                     fontWeight: 'fontWeightMedium',
//                     color: 'var(--layout-nav-item-color)',
//                     minHeight: 'var(--layout-nav-item-height)',
//                   }}
//                 >
//                   <Box component="span" sx={{ width: 24, height: 24 }}>
//                     {icon(items[0].icon)}
//                   </Box>

//                   <Box component="span" flexGrow={1}>
//                     {groupName.charAt(0).toUpperCase() + groupName.slice(1)} {/* Capitalize group name */}
//                   </Box>

//                   <Box component="span">
//                     {isExpanded ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}
//                   </Box>
//                 </ListItemButton>


//                 <Collapse in={isExpanded}>
//                   <Box sx={{ pl: 2 }}>
//                     {/* Render nested items */}
//                     {items.map((item) => {
//                       const isActive = item.path === pathname;

//                       return (
//                         <ListItemButton
//                           key={item.title}
//                           disableGutters
//                           component={RouterLink}
//                           href={item.path}
//                           sx={{
//                             pl: 4,
//                             py: 1,
//                             gap: 2,
//                             borderRadius: 0.75,
//                             typography: 'body2',
//                             color: 'var(--layout-nav-item-color)',
//                             minHeight: 'var(--layout-nav-item-height)',
//                             ...(isActive && {
//                               fontWeight: 'fontWeightSemiBold',
//                               bgcolor: 'var(--layout-nav-item-active-bg)',
//                               color: 'var(--layout-nav-item-active-color)',
//                             }),
//                           }}
//                         >
//                           <Box component="span" sx={{ width: 24, height: 24 }}>
//                             {icon(item.icon)}
//                           </Box>

//                           <Box component="span" flexGrow={1}>
//                             {item.title}
//                           </Box>

//                           {/* {item.info && item.info} */}
//                         </ListItemButton>
//                       );
//                     })}
//                   </Box>
//                 </Collapse>


//               </Box>
//             );
//           })}
//         </Box>
//       </Box >
//     </Scrollbar >
//     {slots?.bottomArea}
//   </>

// )
// import React, { useEffect, useState } from 'react';
// import { Box, ListItem, ListItemButton, Collapse, SxProps, Theme } from '@mui/material';
// import { ChevronDown, ChevronRight } from 'lucide-react';
// import { RouterLink } from 'src/routes/components';
// import ApiService from 'src/service/network_service';
// import { usePathname } from 'src/routes/hooks';
// import { Logo } from 'src/components/logo';
// import { Scrollbar } from 'src/components/scrollbar';
// import { varAlpha } from 'src/theme/styles';
// import { useTheme } from '@emotion/react';
// import { Breakpoint } from '@mui/material';

// // Type for individual nav item
// export type NavItem = {
//   path: string;
//   title: string;
//   icon: React.ReactNode;
//   info?: React.ReactNode;
//   role: string[];
// };

// // NavContentProps for data structure
// export type NavContentProps = {
//   data: NavItem[];
//   slots?: {
//     topArea?: React.ReactNode;
//     bottomArea?: React.ReactNode;
//   };
//   sx?: SxProps<Theme>;
// };

// export function NavData({ sx, data, slots, layoutQuery }: NavContentProps & { layoutQuery: Breakpoint }) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         pt: 2.5,
//         px: 2.5,
//         top: 0,
//         left: 0,
//         height: 1,
//         display: 'none',
//         position: 'fixed',
//         flexDirection: 'column',
//         bgcolor: 'var(--layout-nav-bg)',
//         zIndex: 'var(--layout-nav-zIndex)',
//         width: 'var(--layout-nav-vertical-width)',
//         borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
//         [theme.breakpoints.up(layoutQuery)]: {
//           display: 'flex',
//         },
//         ...sx,
//       }}
//     >
//       <NavContent data={data} slots={slots} />
//     </Box>
//   );
// }

// // NavMobile Component
// export function NavMobile({ sx, data, open, slots, onClose }: NavContentProps & { open: boolean; onClose: () => void }) {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (open) {
//       onClose();
//     }
//   }, [pathname]);

//   // return (
//   //   // <Drawer
//   //   //   open={open}
//   //   //   onClose={onClose}
//   //   //   sx={{
//   //   //     [`& .${drawerClasses.paper}`]: {
//   //   //       pt: 2.5,
//   //   //       px: 2.5,
//   //   //       overflow: 'unset',
//   //   //       bgcolor: 'var(--layout-nav-bg)',
//   //   //       width: 'var(--layout-nav-mobile-width)',
//   //   //       ...sx,
//   //   //     },
//   //   //   }}
//   //   // >
//   //   //   <NavContent data={data} slots={slots} />
//   //   // </Drawer>
//   // );
// }

// // NavContent for rendering the navigation
// export function NavContent({ data, slots, sx }: NavContentProps) {
//   const pathname = usePathname();
//   const [roles, setRoles] = useState<string[]>([]);
//   const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await new ApiService().get('admin/auth/profile');
//         setRoles(response.data.roles); // Assume response contains roles in the 'roles' field
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Filter nav items based on roles
//   const filteredNavData = data.filter((item) =>
//     item.role?.some((role) => roles.includes(role))
//   );

//   // Function to toggle the group visibility (collapse/expand)
//   const toggleGroup = (groupName: string) => {
//     setExpandedGroups((prev) => ({
//       ...prev,
//       [groupName]: !prev[groupName],
//     }));
//   };

//   return (
//     <>
//       <Logo />

//       {slots?.topArea}

//       <Scrollbar fillContent>
//         <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
//           <Box component="ul" gap={0.5} display="flex" flexDirection="column">
//             {filteredNavData.map((item, index) => {
//               const isActive = item.path === pathname;
//               const isExpanded = expandedGroups[item.title] || false; // Track collapse state for each item

//               return (
//                 <Box key={item.title}>
//                   {/* Group Header (Clickable) */}
//                   <ListItemButton
//                     disableGutters
//                     onClick={() => toggleGroup(item.title)}
//                     sx={{
//                       pl: 2,
//                       py: 1,
//                       gap: 2,
//                       borderRadius: 0.75,
//                       typography: 'body2',
//                       fontWeight: 'fontWeightMedium',
//                       color: 'var(--layout-nav-item-color)',
//                       minHeight: 'var(--layout-nav-item-height)',
//                     }}
//                   >
//                     <Box component="span" sx={{ width: 24, height: 24 }}>
//                       {item.icon}
//                     </Box>

//                     <Box component="span" flexGrow={1}>
//                       {item.title}
//                     </Box>

//                     <Box component="span">
//                       {isExpanded ? (
//                         <ChevronDown size={16} />
//                       ) : (
//                         <ChevronRight size={16} />
//                       )}
//                     </Box>
//                   </ListItemButton>

//                   {/* Collapsable Items */}
//                   <Collapse in={isExpanded}>
//                     <Box sx={{ pl: 2 }}>
//                       {/* Render nested items (if any) */}
//                       {item.info && (
//                         <ListItemButton
//                           disableGutters
//                           component={RouterLink}
//                           href={item.path}
//                           sx={{
//                             pl: 4,
//                             py: 1,
//                             gap: 2,
//                             borderRadius: 0.75,
//                             typography: 'body2',
//                             color: 'var(--layout-nav-item-color)',
//                             minHeight: 'var(--layout-nav-item-height)',
//                             ...(isActive && {
//                               fontWeight: 'fontWeightSemiBold',
//                               bgcolor: 'var(--layout-nav-item-active-bg)',
//                               color: 'var(--layout-nav-item-active-color)',
//                             }),
//                           }}
//                         >
//                           <Box component="span" flexGrow={1}>
//                             {item.title}
//                           </Box>
//                           {item.info && item.info}
//                         </ListItemButton>
//                       )}
//                     </Box>
//                   </Collapse>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>
//       </Scrollbar>

//       {slots?.bottomArea}
//     </>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { Box, ListItem, ListItemButton, Collapse, SxProps, Theme } from '@mui/material';
// import { ChevronDown, ChevronRight } from 'lucide-react';
// import { RouterLink } from 'src/routes/components';
// import ApiService from 'src/service/network_service';
// import { usePathname } from 'src/routes/hooks';
// import { Logo } from 'src/components/logo';
// import { Scrollbar } from 'src/components/scrollbar';
// import { varAlpha } from 'src/theme/styles';
// import { SvgColor } from 'src/components/svg-color';

// // Define the navData structure
// export const navData = {
//   dashboard: [
//     { title: 'Dashboard', path: '/', icon: 'ic-analytics', role: ['dashboard'] }
//   ],
//   user: [
//     { title: 'User List', path: '/user', icon: 'ic-user', role: ['user'] },
//     { title: 'Add User', path: '/add-user', icon: 'ic-user', role: ['user'] },
//     { title: 'Trash User', path: '/trashuser', icon: 'ic-user', role: ['user'] }
//   ],
//   product: [
//     { title: 'Product List', path: '/products', icon: 'ic-cart', role: ['product'] },
//     { title: 'Add Product', path: '/add-product', icon: 'ic-cart', role: ['product'] },
//     { title: 'Trash Product', path: '/trash-product', icon: 'ic-cart', role: ['product'] }
//   ],
//   blog: [
//     { title: 'Blog List', path: '/blogs', icon: 'ic-blog', role: ['blog'] },
//     { title: 'Add Blog', path: '/add-blogs', icon: 'ic-blog', role: ['blog'] },
//     { title: 'Trash Blogs', path: '/trash-blogs', icon: 'ic-blog', role: ['blog'] }
//   ],
//   admin: [
//     { title: 'Admin List', path: '/admin', icon: 'ic-user', role: ['admin'] },
//     { title: 'Add Admin', path: '/add-admin', icon: 'ic-user', role: ['admin'] },
//     { title: 'Trash Admin', path: '/trash-admin', icon: 'ic-user', role: ['admin'] }
//   ],
//   category: [
//     { title: 'Category', path: '/category', icon: 'category', role: ['category'] }
//   ],
//   order: [
//     { title: 'Order', path: '/orders', icon: 'ic-order', role: ['order'] }
//   ]
// };

// const icon = (name: string) => (
//   <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
// );

// // Type for individual nav item
// export type NavItem = {
//   path: string;
//   title: string;
//   icon: string;
//   role: string[];
// };

// // NavContentProps for data structure
// export type NavContentProps = {
//   data: typeof navData; // Use the type of navData directly
//   slots?: {
//     topArea?: React.ReactNode;
//     bottomArea?: React.ReactNode;
//   };
//   sx?: SxProps<Theme>;
// };

// export function NavContent({ data, slots, sx }: NavContentProps) {
//   const pathname = usePathname();
//   const [roles, setRoles] = useState<string[]>([]);
//   const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await new ApiService().get('admin/auth/profile');
//         setRoles(response.data.roles); // Assume response contains roles in the 'roles' field
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Filter nav items based on roles
// const filteredNavData = Object.entries(data).reduce((acc, [groupName, items]) => {
//   const filteredItems = items.filter(item =>
//     item.role?.some(role => roles.includes(role))
//   );
//   if (filteredItems.length > 0) {
//     acc[groupName] = filteredItems;
//   }
//   return acc;
// }, {} as { [key: string]: NavItem[] });

//   // Function to toggle the group visibility (collapse/expand)
// const toggleGroup = (groupName: string) => {
//   setExpandedGroups((prev) => ({
//     ...prev,
//     [groupName]: !prev[groupName],
//   }));
// };

//   return (
//     <>
//       <Logo />
//       {slots?.topArea}
//       <Scrollbar fillContent>
//         <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
//           <Box component="ul" gap={0.5} display="flex" flexDirection="column">
//             {Object.entries(filteredNavData).map(([groupName, items]) => {
//               const isExpanded = expandedGroups[groupName] || false; // Track collapse state for each item

//               return (
//                 <Box key={groupName}>
//                   {/* Group Header (Clickable) */}
//                   <ListItemButton
//                     disableGutters
//                     onClick={() => toggleGroup(groupName)}
//                     sx={{
//                       pl: 2,
//                       py: 1,
//                       gap: 2,
//                       borderRadius: 0.75,
//                       typography: 'body2',
//                       fontWeight: 'fontWeightMedium',
//                       color: 'var(--layout-nav-item-color)',
//                       minHeight: 'var(--layout-nav-item-height)',
//                     }}
//                   >
//                     <Box component="span" sx={{ width: 24, height: 24 }}>
//                       {icon(items[0].icon)}
//                     </Box>

//                     <Box component="span" flexGrow={1}>
//                       {groupName.charAt(0).toUpperCase() + groupName.slice(1)} {/* Capitalize group name */}
//                     </Box>

//                     <Box component="span">
//                       {isExpanded ? (
//                         <ChevronDown size={16} />
//                       ) : (
//                         <ChevronRight size={16} />
//                       )}
//                     </Box>
//                   </ListItemButton>

//                   {/* Collapsable Items */}
//                   <Collapse in={isExpanded}>
//                     <Box sx={{ pl: 2 }}>
//                       {/* Render nested items */}
//                       {items.map((item) => {
//                         const isActive = item.path === pathname;

//                         return (
//                           <ListItemButton
//                             key={item.title}
//                             disableGutters
//                             component={RouterLink}
//                             href={item.path}
//                             sx={{
//                               pl: 4,
//                               py: 1,
//                               gap: 2,
//                               borderRadius: 0.75,
//                               typography: 'body2',
//                               color: 'var(--layout-nav-item-color)',
//                               minHeight: 'var(--layout-nav-item-height)',
//                               ...(isActive && {
//                                 fontWeight: 'fontWeightSemiBold',
//                                 bgcolor: 'var(--layout-nav-item-active-bg)',
//                                 color: 'var(--layout-nav-item-active-color)',
//                               }),
//                             }}
//                           >
//                             <Box component="span" sx={{ width: 24, height: 24 }}>
//                               {icon(item.icon)}
//                             </Box>

//                             <Box component="span" flexGrow={1}>
//                               {item.title}
//                             </Box>

//                             {/* {item.info && item.info} */}
//                           </ListItemButton>
//                         );
//                       })}
//                     </Box>
//                   </Collapse>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>
//       </Scrollbar>
//       {slots?.bottomArea}
//     </>
//   );
// }
