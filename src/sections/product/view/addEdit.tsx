

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

// Define the shape of product details
interface ProductDetails {
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    quantity: number;
    status: 'active' | 'inactive';
    image: File | null;
    gallery: File[];
    category: string; // Category field
}

interface Category {
    _id: string;
    name: string;
}

interface ProductAddEditProps { }

const ProductAddEdit: React.FC<ProductAddEditProps> = () => {
    const { id } = useParams<{ id?: string }>();
    const router = useRouter();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [productDetails, setProductDetails] = useState<ProductDetails>({
        name: '',
        description: '',
        price: 0,
        discountPrice: 0,
        quantity: 0,
        status: 'active',
        image: null,
        gallery: [],
        category: '', // Initialize category
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewGallery, setPreviewGallery] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); // State for categories

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await new ApiService().get('admin/category/all'); // Adjust the API endpoint as needed
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            const fetchProductDetails = async () => {
                try {
                    const response = await new ApiService().get(`admin/product/show/${id}`);
                    setProductDetails({
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
                    console.error("Error fetching product details:", error);
                }
            };

            fetchProductDetails();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown; }>) => {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({ ...prevDetails, [name ?? '']: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        console.log('categogry category category category category ', event.target.value);

        setProductDetails((prevDetails) => ({ ...prevDetails, category: event.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductDetails((prevDetails) => ({ ...prevDetails, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setProductDetails((prevDetails) => ({ ...prevDetails, gallery: files }));
            setPreviewGallery(files.map(file => URL.createObjectURL(file)));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price.toString());
        formData.append('discountPrice', productDetails.discountPrice.toString());
        formData.append('quantity', productDetails.quantity.toString());
        formData.append('status', productDetails.status);
        formData.append('category', productDetails.category); // Include category

        if (productDetails.image) {
            formData.append('image', productDetails.image);
        }

        productDetails.gallery.forEach(image => {
            formData.append('gallery', image);
        });

        const url = isEdit ? `admin/product/update/${id}` : 'admin/product/create';

        try {
            const response = await new ApiService().post(url, formData);
            if (response.statusCode === 201) {
                router.push('/products');
                toast.success('Product saved successfully');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit form');
            console.error('Error submitting form:', error.message);
        }
    };

    //     return (
    //         <Box sx={{ maxWidth: '100%', margin: 'auto', p: 3 }}>
    //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
    //                 <Typography variant="h4" component="h1">
    //                     {isEdit ? 'Edit Product' : 'Add Product'}
    //                 </Typography>
    //                 <Button variant="contained">
    //                     New Product
    //                 </Button>
    //             </Box>

    //             <Card sx={{ p: 3 }}>
    //                 <form onSubmit={handleSubmit}>
    //                     <Grid container spacing={3}>
    //                         <Grid item xs={12}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Product Name"
    //                                 name="name"
    //                                 value={productDetails.name}
    //                                 onChange={handleChange}
    //                                 required
    //                             />
    //                         </Grid>

    //                         <Grid item xs={12}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Description"
    //                                 name="description"
    //                                 value={productDetails.description}
    //                                 onChange={handleChange}
    //                                 multiline
    //                                 rows={4}
    //                                 required
    //                             />
    //                         </Grid>

    //                         <Grid item xs={12} sm={6}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Price"
    //                                 name="price"
    //                                 type="number"
    //                                 value={productDetails.price}
    //                                 onChange={handleChange}
    //                                 InputProps={{ inputProps: { min: 0, step: 0.01 } }}
    //                                 required
    //                             />
    //                         </Grid>

    //                         <Grid item xs={12} sm={6}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Discount Price"
    //                                 name="discountPrice"
    //                                 type="number"
    //                                 value={productDetails.discountPrice}
    //                                 onChange={handleChange}
    //                                 InputProps={{ inputProps: { min: 0, step: 0.01 } }}
    //                             />
    //                         </Grid>

    //                         <Grid item xs={12} sm={6}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Quantity"
    //                                 name="quantity"
    //                                 type="number"
    //                                 value={productDetails.quantity}
    //                                 onChange={handleChange}
    //                                 InputProps={{ inputProps: { min: 0 } }}
    //                                 required
    //                             />
    //                         </Grid>

    //                         <Grid item xs={12} sm={6} >
    //                             <FormControl component="fieldset">
    //                                 <FormLabel component="legend">Status</FormLabel>
    //                                 <RadioGroup
    //                                     row
    //                                     name="status"
    //                                     value={productDetails.status}
    //                                     onChange={handleChange}
    //                                 >
    //                                     <FormControlLabel value="active" control={<Radio />} label="Active" />
    //                                     <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
    //                                 </RadioGroup>
    //                             </FormControl>
    //                         </Grid>

    //                         {/* Dropdown for Category */}
    //                         <Grid item xs={12} sm={6}>
    //                             <FormControl fullWidth>
    //                                 <InputLabel id="category-label">Category</InputLabel>
    //                                 <Select
    //                                     labelId="category-label"
    //                                     name="category"
    //                                     value={productDetails.category}
    //                                     onChange={handleSelectChange}
    //                                     required
    //                                 >
    //                                     {categories.map(category => (
    //                                         <MenuItem key={category._id} value={category._id}>
    //                                             {category.name}
    //                                         </MenuItem>
    //                                     ))}
    //                                 </Select>
    //                             </FormControl>
    //                         </Grid>

    //                         <Grid item xs={12} className="image-uploader">
    //                             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center-rigth', p: 3 }}>
    //                                 {previewImage && (
    //                                     <Box component="img" src={previewImage ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt="Product preview" sx={{ width: 100, height: 100, objectFit: 'cover', mt: 2, borderRadius: 1 }} />
    //                                 )}
    //                                 <input
    //                                     accept="image/*"
    //                                     style={{ display: 'none' }}
    //                                     id="main-image-upload"
    //                                     type="file"
    //                                     onChange={handleImageChange}
    //                                 />

    //                                 <label htmlFor="main-image-upload">
    //                                     <Button
    //                                         // make good looking image button for image
    //                                         variant="contained"
    //                                         component="span"
    //                                         sx={{ width: '100', height: '50', mt: 3 }}
    //                                         disabled={false}
    //                                         color='primary'
    //                                     >
    //                                         Upload Main Image
    //                                     </Button>
    //                                 </label>
    //                             </Box>

    //                         </Grid>

    //                         <Grid item xs={12}>
    //                             <input
    //                                 accept="image/*"
    //                                 style={{ display: 'none' }}
    //                                 id="gallery-upload"
    //                                 type="file"
    //                                 multiple
    //                                 onChange={handleGalleryChange}
    //                             />
    //                             <label htmlFor="gallery-upload">
    //                                 <Button
    //                                     variant="contained"
    //                                     component="span"
    //                                 >
    //                                     Upload Gallery Images
    //                                 </Button>
    //                             </label>
    //                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
    //                                 {previewGallery.map((preview, index) => (
    //                                     <Box
    //                                         key={index}
    //                                         component="img"
    //                                         src={preview}
    //                                         alt={`Gallery ${index + 1}`}
    //                                         sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
    //                                     />
    //                                 ))}
    //                             </Box>
    //                         </Grid>

    //                         <Grid item xs={12}>
    //                             <Button
    //                                 type="submit"
    //                                 variant="contained"
    //                                 color="primary"
    //                                 startIcon={<Iconify icon="mingcute:add-line" />}
    //                                 sx={{ mr: 3, width: '80%', alignItems: 'center' }}
    //                                 size="large"
    //                             >
    //                                 {isEdit ? 'Update Product' : 'Add Product'}
    //                             </Button>
    //                         </Grid>
    //                     </Grid>
    //                 </form>
    //             </Card>
    //         </Box >
    //     );
    // };

    const handleRemoveGalleryImage = (index: any) => {
        const newGallery = [...previewGallery];
        newGallery.splice(index, 1);
        setPreviewGallery(newGallery);
    };


    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    {isEdit ? 'Edit Product' : 'Add Product'}
                </Typography>
            </Box>

            <Card sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Product Details Section */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" sx={{ mb: 3 }}>Product Details</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        name="name"
                                        value={productDetails.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={productDetails.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={productDetails.price}
                                        onChange={handleChange}
                                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Discount Price"
                                        name="discountPrice"
                                        type="number"
                                        value={productDetails.discountPrice}
                                        onChange={handleChange}
                                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={productDetails.quantity}
                                        onChange={handleChange}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            name="category"
                                            value={productDetails.category}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            {categories.map(category => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            name="status"
                                            value={productDetails.status}
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
                            <Typography variant="h6" sx={{ mb: 3 }}>Product Images</Typography>

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
                                            alt="Product preview"
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
                                {isEdit ? 'Update Product' : 'Add Product'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
};

export default ProductAddEdit;
