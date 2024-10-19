

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Box,
    Card,
    Avatar,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import ApiService from 'src/service/network_service';
import ProfileSidebar from '../view/profileSidebar'; // Import the sidebar

const UserAddEdit = () => {
    const { id } = useParams();

    const [userDetails, setUserDetails] = useState<{
        name: string;
        email: string;
        address: string;
        status: string; // "active" or "inactive"
        password: string; // Added password
        profileImage: File | null | undefined;
    }>({
        name: '',
        email: '',
        address: '',
        status: 'active',
        password: '',
        profileImage: null,
    });

    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (id) {
                try {
                    const response = await new ApiService().get(`admin/customer/show/${id}`);
                    setUserDetails({
                        ...response.data,
                        profileImage: response.data.profileImage,
                        name: response.data.name,
                    });
                    if (response.data.profileImage) {
                        setPreview(response.data.profileImage);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
        setIsEdit(!!id);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUserDetails({ ...userDetails, profileImage: file ?? null });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userDetails.name);
        formData.append('email', userDetails.email);
        formData.append('address', userDetails.address);
        formData.append('status', userDetails.status); // Append status
        formData.append('password', userDetails.password); // Append password
        if (userDetails.profileImage) {
            formData.append('profileImage', userDetails.profileImage);
        }

        const method = isEdit ? 'POST' : 'POST';
        const url = isEdit ? `admin/customer/update/${id}` : 'admin/customer/create';

        try {
            const response = await new ApiService().post(url, formData);
            if (response.statusCode === 201) {
                toast.success('User saved successfully');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit form');
            console.error('Error submitting form:', error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: '100%', margin: 'auto', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    {isEdit ? 'Edit User' : 'Add User'}
                </Typography>
                <Button variant="contained" >
                    New User
                </Button>
            </Box>

            <Card sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={userDetails.address}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup
                                    row
                                    name="status"
                                    value={userDetails.status}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={userDetails.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="profile-image-upload"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profile-image-upload">
                                <Button
                                    variant="contained"
                                    component="span"
                                >
                                    Upload Profile Picture
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={12} display="flex" alignItems="center">
                            {preview ? (
                                <Avatar
                                    alt="Profile Picture"
                                    src={preview}
                                    sx={{ width: 56, height: 56, mr: 2 }}
                                />
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No image uploaded
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                {isEdit ? 'Update User' : 'Add User'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>


        </Box>
    );
};

export default UserAddEdit;