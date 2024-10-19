

// // export default ProductAddEdit;
// import React, { useState, useEffect } from 'react';
// import {
//     TextField,
//     Button,
//     Typography,
//     Grid,
//     Box,
//     Card,
//     FormControl,
//     FormLabel,
//     RadioGroup,
//     FormControlLabel,
//     Radio,
//     Snackbar,
//     Alert,
//     IconButton,
// } from '@mui/material';
// import { Iconify } from 'src/components/iconify';
// import ApiService from 'src/service/network_service';
// import { toast } from 'react-toastify';
// import { useParams } from 'react-router-dom';
// // import { Add, CloudUpload } from '@mui/icons-material';

// // Define the shape of product details
// interface ProductDetails {
//     name: string;
//     description: string;
//     price: number;
//     discountPrice: number;
//     quantity: number;
//     status: 'active' | 'inactive';
//     image: File | null;
//     gallery: File[];
// }

// interface ProductAddEditProps {
//     id?: string;
// }

// const ProductAddEdit: React.FC<ProductAddEditProps> = () => {
//     const { id } = useParams();
//     const [isEdit, setIsEdit] = useState<boolean>(false);
//     const [productDetails, setProductDetails] = useState<ProductDetails>({
//         name: '',
//         description: '',
//         price: 0,
//         discountPrice: 0,
//         quantity: 0,
//         status: 'active',
//         image: null,
//         gallery: [],
//     });
//     const [previewImage, setPreviewImage] = useState<string | null>(null);
//     const [previewGallery, setPreviewGallery] = useState<string[]>([]);

//     useEffect(() => {
//         if (id) {

//             setIsEdit(true);
//         }
//     }, [id]);

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             if (id) {
//                 try {
//                     const response = await new ApiService().get(`admin/product/show/${id}`);
//                     setProductDetails({
//                         ...response.data,
//                         image: response.data.image || null,
//                         gallery: response.data.gallery || [],
//                     });
//                     if (response.data.image) {
//                         setPreviewImage('http://localhost:3000' + '/' + response.data.image);
//                     }
//                     if (response.data.gallery) {

//                         setPreviewGallery(response.data.gallery.map((image: any) => 'http://localhost:3000' + '/' + image));

//                     }
//                 } catch (error) {
//                     console.error("Error fetching product details:", error);
//                 }
//             }
//         };

//         fetchProductDetails();
//         setIsEdit(!!id);
//     }, [id]);


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProductDetails({ ...productDetails, [name]: value });
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setProductDetails({ ...productDetails, image: file });
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = Array.from(e.target.files || []);
//         if (files.length) {
//             setProductDetails({ ...productDetails, gallery: files });
//             setPreviewGallery(files.map(file => URL.createObjectURL(file)));
//         }
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', productDetails.name);
//         formData.append('description', productDetails.description);
//         formData.append('price', productDetails.price.toString());
//         formData.append('discountPrice', productDetails.discountPrice.toString());
//         formData.append('quantity', productDetails.quantity.toString());
//         formData.append('status', productDetails.status);

//         if (productDetails.image) {
//             formData.append('image', productDetails.image);
//         }

//         productDetails.gallery.forEach(image => {
//             formData.append('gallery', image);
//         });

//         const url = isEdit ? `admin/product/update/${id}` : 'admin/product/create';

//         try {
//             const response = await new ApiService().post(url, formData);
//             if (response.statusCode === 201) {
//                 toast.success('Product saved successfully');
//             }
//         } catch (error) {
//             toast.error(error.message || 'Failed to submit form');
//             console.error('Error submitting form:', error.message);
//         }
//     };




//     return (
//         <Box sx={{ maxWidth: '100%', margin: 'auto', p: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Typography variant="h4" component="h1">
//                     {isEdit ? 'Edit Product' : 'Add Product'}
//                 </Typography>
//                 <Button variant="contained"  >
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

//                         <Grid item xs={12} sm={6}>
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

//                         <Grid item xs={12}>
//                             <input
//                                 accept="image/*"
//                                 style={{ display: 'none' }}
//                                 id="main-image-upload"
//                                 type="file"
//                                 onChange={handleImageChange}
//                             />
//                             <label htmlFor="main-image-upload">
//                                 <Button
//                                     variant="contained"
//                                     component="span"
//                                 // startIcon={<CloudUpload />}
//                                 >
//                                     Upload Main Image
//                                 </Button>
//                             </label>
//                             {previewImage && (
//                                 <Box component="img" src={previewImage} alt="Product preview" sx={{ width: 100, height: 100, objectFit: 'cover', mt: 2, borderRadius: 1 }} />
//                             )}
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
//                                 // startIcon={<CloudUpload />}
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
//                                 onClick={handleSubmit}
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


//         </Box>
//     );
// };

// export default ProductAddEdit;


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
                        setPreviewImage('http://localhost:3000' + '/' + response.data.image);
                    }
                    if (response.data.gallery) {
                        setPreviewGallery(response.data.gallery.map((image: any) => 'http://localhost:3000' + '/' + image));
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
                toast.success('Product saved successfully');
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
                    {isEdit ? 'Edit Product' : 'Add Product'}
                </Typography>
                <Button variant="contained">
                    New Product
                </Button>
            </Box>

            <Card sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
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

                        {/* Dropdown for Category */}
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
                                >
                                    Upload Main Image
                                </Button>
                            </label>
                            {previewImage && (
                                <Box component="img" src={previewImage} alt="Product preview" sx={{ width: 100, height: 100, objectFit: 'cover', mt: 2, borderRadius: 1 }} />
                            )}
                        </Grid>

                        <Grid item xs={12}>
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
                                >
                                    Upload Gallery Images
                                </Button>
                            </label>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                {previewGallery.map((preview, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={preview}
                                        alt={`Gallery ${index + 1}`}
                                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Iconify icon="mingcute:add-line" />}
                                sx={{ mr: 3, width: '80%', alignItems: 'center' }}
                                size="large"
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
