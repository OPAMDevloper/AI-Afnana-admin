// import React, { useEffect, useState } from 'react';
// import { Box, List, ListItem, ListItemText, Divider, Avatar, Typography } from '@mui/material';
// import ApiService from 'src/service/network_service';
// import { useParams } from 'react-router-dom';
// import UserAddEdit from './addEdit';
// import UserPasswordUpdate from './changePassword';

// const ProfileSidebar = () => {
//     const { id } = useParams();
//     const [profile, setProfile] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedOption, setSelectedOption] = useState('edit'); // Default option

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await new ApiService().get(`admin/customer/show/${id}`);
//                 setProfile(response.data);
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const renderContent = () => {
//         switch (selectedOption) {
//             case 'edit':
//                 return <UserAddEdit />;
//             case 'orders':
//                 return <div>Orders Content</div>;
//             case 'change-password':
//                 return <UserPasswordUpdate></UserPasswordUpdate>;
//             case 'personal-details':
//                 return <div>Personal Details Content</div>;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <Box
//                 sx={{
//                     width: 250,
//                     backgroundColor: '#f5f5f5',
//                     height: '100vh',
//                     position: 'fixed',
//                     padding: '16px',
//                 }}
//             >
//                 {profile && (
//                     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//                         <Avatar alt={profile.name} src={import.meta.env.VITE_APP_BASE_URL + '/' + profile.profileImage} sx={{ width: 56, height: 56, marginRight: 2 }} />
//                         <Box>
//                             <Typography variant="h6">{profile.name}</Typography>
//                             <Typography variant="body2" color="textSecondary">{profile.email}</Typography>
//                             <Typography variant="body2" color="textSecondary">{profile.status}</Typography>
//                         </Box>
//                     </Box>
//                 )}
//                 <Divider />
//                 <List>
//                     <ListItem button onClick={() => setSelectedOption('edit')}>
//                         <ListItemText primary="Edit Profile" />
//                     </ListItem>
//                     <ListItem button onClick={() => setSelectedOption('orders')}>
//                         <ListItemText primary="Orders" />
//                     </ListItem>
//                     <ListItem button onClick={() => setSelectedOption('change-password')}>
//                         <ListItemText primary="Change Password" />
//                     </ListItem>
//                     <ListItem button onClick={() => setSelectedOption('personal-details')}>
//                         <ListItemText primary="Personal Details" />
//                     </ListItem>
//                 </List>
//             </Box>

//             {/* Adjusting the padding to offset the sidebar */}
//             <Box sx={{
//                 width: 'calc(100% - 250px)',
//                 marginLeft: '250px',

//                 backgroundColor: '#f5f5f5',
//                 height: '100vh',
//                 position: 'fixed',
//                 overflow: 'auto',
//                 padding: '16px',
//             }}>
//                 {renderContent()}
//             </Box>
//         </Box>
//     );
// };

// export default ProfileSidebar;import React, { useEffect, useState } from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Typography, Paper, Chip } from '@mui/material';
import { UserCog, ShoppingCart, KeyRound, User } from 'lucide-react';
import ApiService from 'src/service/network_service';
import { useParams } from 'react-router-dom';
import UserPasswordUpdate from './changePassword';
import { useEffect, useState } from 'react';
import UserDetailsCard from './personal_details';
import UserAddEdit from './addEdit';

const ProfileDashboard = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('personal-details');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await new ApiService().get(`admin/customer/show/${id}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    const renderContent = () => {
        switch (selectedOption) {
            case 'edit':
                return <UserAddEdit onupdate={(profile: any) => {

                    setSelectedOption('personal-details');
                    return setProfile(profile);
                }} />;
            case 'orders':
                return <div>Orders Content</div>;
            case 'change-password':
                return <UserPasswordUpdate />;
            case 'personal-details':
                return <UserDetailsCard userId={profile._id} />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: any) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'error';
            default:
                return 'default';
        }
    };

    const menuItems = [
        { text: 'Personal Details', icon: <User size={20} />, option: 'personal-details' },
        { text: 'Orders', icon: <ShoppingCart size={20} />, option: 'orders' },
        { text: 'Edit Profile', icon: <UserCog size={20} />, option: 'edit' },
        { text: 'Change Password', icon: <KeyRound size={20} />, option: 'change-password' },
    ];

    return (
        <Box sx={{ height: '100vh', p: 2, backgroundColor: '#f5f5f5' }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {profile && (
                            <Box sx={{ p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'justify-content-between' }}>
                                <Avatar
                                    alt={profile.name}
                                    src={`${import.meta.env.VITE_APP_BASE_URL}/${profile.profileImage}`}
                                    sx={{ width: 80, height: 80, margin: '0 auto 8px', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                />
                                <Box sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography >name : </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}> {profile.name}</Typography>
                                </ Box>
                                <Box sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography >email : </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>{profile.email}</Typography>
                                </Box>
                                <Chip
                                    label={profile.status}
                                    color={getStatusColor(profile.status)}
                                    size="small"
                                    sx={{ fontWeight: 'bold' }}
                                />

                            </Box>
                        )}
                        <Divider />
                        <List sx={{ flexGrow: 1, pt: 0 }}>
                            {menuItems.map((item) => (
                                <ListItem
                                    button
                                    key={item.text}
                                    onClick={() => setSelectedOption(item.option)}
                                    selected={selectedOption === item.option}
                                    sx={{
                                        mt: 0.5,
                                        mb: 0.5,
                                        py: 1.5,
                                        px: 2,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: '#f5f5f5',
                                        },
                                        '&.Mui-selected': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                        {renderContent()}
                    </Paper>
                </Grid>
            </Grid>
        </Box >
    );
};

export default ProfileDashboard;