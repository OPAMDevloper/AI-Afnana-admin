import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Grid,
    Typography,
    Paper,
    Divider,
    Tooltip,
    Chip,
    CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import ApiService from 'src/service/network_service';
import { toast } from 'react-toastify';

interface Country {
    _id: number;
    name: string;
    createdAt: string;
}


const CountryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Country[]>([]);
    const [countryName, setCountryName] = useState('');
    const [editingCountry, setEditingCountry] = useState<Country | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await new ApiService().get('admin/country/all');

            // const data = await response.json();
            setCategories(response.data);
        } catch (err) {
            setError(`Failed to load categories. Please try again. ${err}`,);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateOrUpdateCountry = async () => {
        if (countryName.trim() === '') return;
        setIsLoading(true);
        try {
            if (editingCountry) {
                const response = await new ApiService().post(`admin/country/update/${editingCountry._id}`,
                    { name: countryName.trim() },
                );
                // if (!response.ok) throw new Error('Failed to update country');
                if (response) {
                    toast.success('Country updated successfully');
                }
            } else {
                const response = await new ApiService().post('admin/country/create',

                    { name: countryName.trim() }
                );
                // if (!response.ok) throw new Error('Failed to create country');
                if (response) {
                    toast.success('Country created successfully');
                }
            }
            fetchCategories(); // Refresh the list after create/update
            setCountryName('');
            setEditingCountry(null);
        } catch (err) {
            setError('Failed to save country. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCountry = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await new ApiService().delete(`admin/country/delete/${id}`, {});
            // if (!response.ok) throw new Error('Failed to delete country');
            if (response) {
                toast.success('Country deleted successfully');
            }

            fetchCategories(); // Refresh the list after delete
            if (editingCountry?._id === id) {
                setEditingCountry(null);
                setCountryName('');
            }
        } catch (err) {
            setError('Failed to delete country. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCountry = (country: Country) => {
        setEditingCountry(country);
        setCountryName(country.name);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ color: '#777' }}>
                    Total Categories: <Chip label={categories.length} color="primary" size="small" />
                </Typography>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                Country Management
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                            {editingCountry ? 'Update Country' : 'Create New Country'}
                        </Typography>
                        <Box sx={{
                            mb: 2, mt: 3

                        }}>
                            <TextField
                                fullWidth
                                label="Country Name"
                                variant="outlined"
                                value={countryName}
                                onChange={(e) => setCountryName(e.target.value)}
                                sx={{ backgroundColor: '#f9f9f9' }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color={editingCountry ? 'secondary' : 'primary'}
                            onClick={handleCreateOrUpdateCountry}
                            startIcon={editingCountry ? <Icon icon={'ic:round-edit'} /> : <Icon icon={'ic:round-add'} />}
                            fullWidth
                        >
                            {editingCountry ? 'Update Country' : 'Create Country'}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                            Country List
                        </Typography>

                        <List>
                            {categories.map((country, index) => (
                                <React.Fragment key={country._id}>
                                    {index > 0 && <Divider />}
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#333' }}>
                                                    {country.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: '#777' }}>
                                                    Created: {new Date(country.createdAt).toLocaleString()}
                                                </Typography>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="edit"
                                                    onClick={() => handleEditCountry(country)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <Icon icon={'ic:round-edit'} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteCountry(country._id)}
                                                >
                                                    <Icon icon={'ic:round-delete'} />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                        {categories.length === 0 && (
                            <Typography variant="body1" sx={{ textAlign: 'center', color: '#999', my: 2 }}>
                                No categories yet. Create your first country!
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CountryManagement;