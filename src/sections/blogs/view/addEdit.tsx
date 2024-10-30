

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Grid,
    Box,
    Card,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Snackbar,
    Alert,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import ApiService from 'src/service/network_service';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
import { useRouter } from 'src/routes/hooks';
import { Icon } from '@iconify/react';
import { DeleteIcon, UploadIcon } from 'lucide-react';
import { Divider } from '@mui/material';

interface BlogsDetails {
    title: string;
    description: string;
    status: 'active' | 'inactive';
    image: File | null;
    gallery: File[];
}

// interface Category {
//     _id: string;
//     name: string;
// }

interface BlogsAddEditProps { }

const BlogsAddEdit: React.FC<BlogsAddEditProps> = () => {
    const { id } = useParams<{ id?: string }>();
    const router = useRouter();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [blogsDetails, setBlogsDetails] = useState<BlogsDetails>({
        title: '',
        description: '',
        status: 'active',
        image: null,
        gallery: [],
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewGallery, setPreviewGallery] = useState<string[]>([]);



    useEffect(() => {
        if (id) {
            setIsEdit(true);

            const fetchBlogsDetails = async () => {
                try {
                    const response = await new ApiService().get(`admin/blog/show/${id}`);
                    setBlogsDetails({
                        ...response.data,
                        image: response.data.image || null,
                        gallery: response.data.gallery || [],
                    });
                    if (response.data.image) {
                        setPreviewImage(import.meta.env.VITE_APP_BASE_URL + '/' + response.data.image);
                    }
                    if (response.data.gallery) {
                        setPreviewGallery(response.data.gallery.map((image: any) => import.meta.env.VITE_APP_BASE_URL + '/' + image));
                    }
                } catch (error) {
                    console.error("Error fetching blogs details:", error);
                }
            };

            fetchBlogsDetails();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown; }>) => {
        const { name, value } = e.target;
        setBlogsDetails((prevDetails) => ({ ...prevDetails, [name ?? '']: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        console.log('categogry category category category category ', event.target.value);

        setBlogsDetails((prevDetails) => ({ ...prevDetails, category: event.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBlogsDetails((prevDetails) => ({ ...prevDetails, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setBlogsDetails((prevDetails) => ({ ...prevDetails, gallery: files }));
            setPreviewGallery(files.map(file => URL.createObjectURL(file)));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', blogsDetails.title);
        formData.append('description', blogsDetails.description);
        formData.append('status', blogsDetails.status);

        if (blogsDetails.image) {
            formData.append('image', blogsDetails.image);
        }

        blogsDetails.gallery.forEach(image => {
            formData.append('gallery', image);
        });

        const url = isEdit ? `admin/blog/update/${id}` : 'admin/blog/create';

        try {
            const response = await new ApiService().post(url, formData);
            if (response.statusCode === 201) {
                router.push('/blogs');
                toast.success('Blogs saved successfully');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit form');
            console.error('Error submitting form:', error.message);
        }
    };


    const handleRemoveGalleryImage = (index: any) => {
        const newGallery = [...previewGallery];
        newGallery.splice(index, 1);
        setPreviewGallery(newGallery);
    };


    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    {isEdit ? 'Edit Blog' : 'Add Blogs'}
                </Typography>
            </Box>

            <Card sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" sx={{ mb: 3 }}>Blogs Details</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Blog Title"
                                        name="title"
                                        value={blogsDetails.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    {/* <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={blogsDetails.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        required
                                    /> */}
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={blogsDetails.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={1} // Start with 1 row
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                height: 100, // Set height dynamically
                                                overflow: 'hidden', // Prevent overflow
                                            },
                                        }}
                                        required
                                    />
                                </Grid>




                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            name="status"
                                            value={blogsDetails.status}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="active" control={<Radio />} label="Active" />
                                            <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Image Upload Section */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ mb: 3 }}>Blogs Images</Typography>

                            {/* Main Image Section */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>Main Image</Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #ccc',
                                        borderRadius: 2,
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        bgcolor: '#f5f5f5',
                                        mb: 2
                                    }}
                                >
                                    {previewImage ? (
                                        <Box
                                            component="img"
                                            src={previewImage}
                                            alt="Blogs preview"
                                            sx={{
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'contain',
                                                mb: 2,
                                                borderRadius: 1
                                            }}
                                        />
                                    ) : (
                                        // <AddPhotoAlternateIcon sx={{ fontSize: 60, color: '#bdbdbd', mb: 2 }} />
                                        <Icon icon={'eva:cloud-upload-fill'} color={'primary'} ></Icon>
                                    )}

                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="main-image-upload"
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="main-image-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<UploadIcon />}
                                        >
                                            {previewImage ? 'Change Image' : 'Upload Image'}
                                        </Button>
                                    </label>
                                </Box>
                            </Box>

                            {/* Gallery Section */}
                            <Divider sx={{ my: 3 }} />
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>Gallery Images</Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #ccc',
                                        borderRadius: 2,
                                        p: 2,
                                        bgcolor: '#f5f5f5',
                                    }}
                                >
                                    <Grid container spacing={1}>
                                        {previewGallery.map((preview, index) => (
                                            <Grid item xs={6} key={index}>
                                                <Box sx={{ position: 'relative' }}>
                                                    <Box
                                                        component="img"
                                                        src={preview}
                                                        alt={`Gallery ${index + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: 100,
                                                            objectFit: 'cover',
                                                            borderRadius: 1
                                                        }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            bgcolor: 'background.paper',
                                                            '&:hover': { bgcolor: 'error.light', color: 'white' }
                                                        }}
                                                        onClick={() => handleRemoveGalleryImage(index)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="gallery-upload"
                                            type="file"
                                            multiple
                                            onChange={handleGalleryChange}
                                        />
                                        <label htmlFor="gallery-upload">
                                            <Button
                                                variant="contained"
                                                component="span"
                                            // startIcon={<CollectionsIco   />}
                                            >
                                                Add Gallery Images
                                            </Button>
                                        </label>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mt: 3 }}
                                fullWidth
                            >
                                {isEdit ? 'Update Blog' : 'Add Blog'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
};

export default BlogsAddEdit;
