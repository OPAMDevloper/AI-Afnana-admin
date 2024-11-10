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

interface Category {
    _id: number;
    name: string;
    createdAt: string;
}


const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await new ApiService().get('admin/category/all');

            // const data = await response.json();
            setCategories(response.data);
        } catch (err) {
            setError(`Failed to load categories. Please try again. ${err}`,);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateOrUpdateCategory = async () => {
        if (categoryName.trim() === '') return;
        setIsLoading(true);
        try {
            if (editingCategory) {
                const response = await new ApiService().post(`admin/category/update/${editingCategory._id}`,
                    { name: categoryName.trim() },
                );
                // if (!response.ok) throw new Error('Failed to update category');
                if (response) {
                    toast.success('Category updated successfully');
                }
            } else {
                const response = await new ApiService().post('admin/category/create',

                    { name: categoryName.trim() }
                );
                // if (!response.ok) throw new Error('Failed to create category');
                if (response) {
                    toast.success('Category created successfully');
                }
            }
            fetchCategories(); // Refresh the list after create/update
            setCategoryName('');
            setEditingCategory(null);
        } catch (err) {
            setError('Failed to save category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await new ApiService().delete(`admin/category/delete/${id}`, {});
            // if (!response.ok) throw new Error('Failed to delete category');
            if (response) {
                toast.success('Category deleted successfully');
            }

            fetchCategories(); // Refresh the list after delete
            if (editingCategory?._id === id) {
                setEditingCategory(null);
                setCategoryName('');
            }
        } catch (err) {
            setError('Failed to delete category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryName(category.name);
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
                Category Management
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
                            {editingCategory ? 'Update Category' : 'Create New Category'}
                        </Typography>
                        <Box sx={{
                            mb: 2, mt: 3

                        }}>
                            <TextField
                                fullWidth
                                label="Category Name"
                                variant="outlined"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                sx={{ backgroundColor: '#f9f9f9' }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color={editingCategory ? 'secondary' : 'primary'}
                            onClick={handleCreateOrUpdateCategory}
                            startIcon={editingCategory ? <Icon icon={'ic:round-edit'} /> : <Icon icon={'ic:round-add'} />}
                            fullWidth
                        >
                            {editingCategory ? 'Update Category' : 'Create Category'}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                            Category List
                        </Typography>

                        <List>
                            {categories.map((category, index) => (
                                <React.Fragment key={category._id}>
                                    {index > 0 && <Divider />}
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#333' }}>
                                                    {category.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: '#777' }}>
                                                    Created: {new Date(category.createdAt).toLocaleString()}
                                                </Typography>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="edit"
                                                    onClick={() => handleEditCategory(category)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <Icon icon={'ic:round-edit'} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteCategory(category._id)}
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
                                No categories yet. Create your first category!
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryManagement;