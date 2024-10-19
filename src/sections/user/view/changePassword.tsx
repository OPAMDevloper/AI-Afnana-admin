import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Card,
    TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import ApiService from 'src/service/network_service';

const UserPasswordUpdate = () => {
    const { id } = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // You can add any necessary logic here (like fetching user details if needed)
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await new ApiService().post(`admin/customer/update-password/${id}`, { password: newPassword });
            if (response.statusCode === 200) {
                toast.success('Password updated successfully');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update password');
            console.error('Error updating password:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{`Update Password - ${CONFIG.appName}`}</title>
            </Helmet>
            <DashboardContent>
                <Box display="flex">
                    <Box flexGrow={1} ml={2}>
                        <Box display="flex" alignItems="center" mb={5}>
                            <Typography variant="h4" flexGrow={1}>
                                Update Password
                            </Typography>
                        </Box>

                        <Card sx={{ p: 5 }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="New Password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    type="password"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    type="password"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Password'}
                                </Button>
                            </form>
                        </Card>
                    </Box>
                </Box>
            </DashboardContent>
        </>
    );
};

export default UserPasswordUpdate;
