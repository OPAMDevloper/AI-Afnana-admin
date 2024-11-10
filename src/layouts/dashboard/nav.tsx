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
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapse } from '@mui/material';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

// export type NavContentProps = {
//   data: {
//     path: string;
//     title: string;
//     icon: React.ReactNode;
//     info?: React.ReactNode;
//     role: string[];
//   }[];
//   slots?: {
//     topArea?: React.ReactNode;
//     bottomArea?: React.ReactNode;
//   };
//   sx?: SxProps<Theme>;
// };


export type NavItem = {
  path: string;
  title: string;
  icon: string;
  info?: React.ReactNode;
  role: string[];
};

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
  old?: {
    path: string;
    title: string;
    icon: string;
    info?: React.ReactNode;
    role: string[];
  }[];
};


export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();

  const [roles, setRoles] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        const response = await new ApiService().get('admin/auth/profile');
        setRoles(response.data.roles); // Assume response contains roles in the 'roles' field
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // // Filter navData based on user roles
  // const filteredNavData = navData.filter(item  =>
  //   item.roles.some(role => roles.includes(role))
  // );

  // const filteredNavData = data.filter((item) => {
  //   return item.roles?.some((role) => roles.includes(role));
  // });
  // const filteredNavData = data.filter((item) => {
  //   // Ensure each item has a roles field and filter it based on user's roles
  //   return item.role?.some((role) => roles.includes(role)); // Filter items if any of the roles match
  // });


  // return (
  //   <>
  //     <Logo />

  //     {slots?.topArea}


  //     <Scrollbar fillContent>
  //       <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
  //         <Box component="ul" gap={0.5} display="flex" flexDirection="column">
  //           {filteredNavData.map((item) => {
  //             const isActived = item.path === pathname;

  //             return (
  //               <ListItem disableGutters disablePadding key={item.title}>
  //                 <ListItemButton
  //                   disableGutters
  //                   component={RouterLink}
  //                   href={item.path}
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
  //                     ...(isActived && {
  //                       fontWeight: 'fontWeightSemiBold',
  //                       bgcolor: 'var(--layout-nav-item-active-bg)',
  //                       color: 'var(--layout-nav-item-active-color)',
  //                       '&:hover': {
  //                         bgcolor: 'var(--layout-nav-item-hover-bg)',
  //                       },
  //                     }),
  //                   }}
  //                 >
  //                   <Box component="span" sx={{ width: 24, height: 24 }}>
  //                     {item.icon}
  //                   </Box>

  //                   <Box component="span" flexGrow={1}>
  //                     {item.title}
  //                   </Box>

  //                   {item.info && item.info}
  //                 </ListItemButton>
  //               </ListItem>
  //             );
  //           })}
  //         </Box>
  //       </Box>
  //     </Scrollbar>

  //     {slots?.bottomArea}

  //   </>
  // );

  const filteredNavData = Object.entries(data).reduce((acc, [groupName, items]) => {
    const filteredItems = items.filter((item: any) =>
      item.role?.some((role: any) => roles.includes(role))
    );
    if (filteredItems.length > 0) {
      acc[groupName] = filteredItems;
    }
    return acc;
  }, {} as { [key: string]: NavItem[] });

  // Function to toggle the group visibility (collapse/expand)
  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const icon = (name: string) => (
    <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
  );


  return (
    <>
      <Logo />
      {slots?.topArea}
      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {Object.entries(filteredNavData).map(([groupName, items]) => {
              const isExpanded = expandedGroups[groupName] || false; // Track collapse state for each item

              return (
                <Box key={groupName}>
                  {/* Group Header (Clickable) */}
                  <ListItemButton
                    disableGutters
                    onClick={() => toggleGroup(groupName)}
                    sx={{
                      pl: 2,
                      py: 1,
                      gap: 2,
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
                      {groupName.charAt(0).toUpperCase() + groupName.slice(1)} {/* Capitalize group name */}
                    </Box>

                    <Box component="span">
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </Box>
                  </ListItemButton>

                  {/* Collapsable Items */}
                  <Collapse in={isExpanded}>
                    <Box sx={{ pl: 2 }}>
                      {/* Render nested items */}
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

                            {/* {item.info && item.info} */}
                          </ListItemButton>
                        );
                      })}
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>
      {slots?.bottomArea}
    </>
  );
}