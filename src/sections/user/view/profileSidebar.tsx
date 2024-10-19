import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Avatar, Typography } from '@mui/material';
import ApiService from 'src/service/network_service';
import { useParams } from 'react-router-dom';
import UserAddEdit from './addEdit';
import UserPasswordUpdate from './changePassword';

const ProfileSidebar = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('edit'); // Default option

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
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (selectedOption) {
            case 'edit':
                return <UserAddEdit />;
            case 'orders':
                return <div>Orders Content</div>;
            case 'change-password':
                return <UserPasswordUpdate></UserPasswordUpdate>;
            case 'personal-details':
                return <div>Personal Details Content</div>;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: 250,
                    backgroundColor: '#f5f5f5',
                    height: '100vh',
                    position: 'fixed',
                    padding: '16px',
                }}
            >
                {profile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Avatar alt={profile.name} src={'http://localhost:3000' + profile.profileImage} sx={{ width: 56, height: 56, marginRight: 2 }} />
                        <Box>
                            <Typography variant="h6">{profile.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{profile.email}</Typography>
                            <Typography variant="body2" color="textSecondary">{profile.status}</Typography>
                        </Box>
                    </Box>
                )}
                <Divider />
                <List>
                    <ListItem button onClick={() => setSelectedOption('edit')}>
                        <ListItemText primary="Edit Profile" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('orders')}>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('change-password')}>
                        <ListItemText primary="Change Password" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('personal-details')}>
                        <ListItemText primary="Personal Details" />
                    </ListItem>
                </List>
            </Box>

            {/* Adjusting the padding to offset the sidebar */}
            <Box sx={{
                width: 'calc(100% - 250px)',
                marginLeft: '250px',

                backgroundColor: '#f5f5f5',
                height: '100vh',
                position: 'fixed',
                overflow: 'auto',
                padding: '16px',
            }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default ProfileSidebar;
