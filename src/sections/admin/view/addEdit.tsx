

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     Container,
//     TextField,
//     Button,
//     Typography,
//     Grid,
//     Box,
//     Card,
//     Avatar,
//     FormControl,
//     FormLabel,
//     RadioGroup,
//     FormControlLabel,
//     Radio,
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import ApiService from 'src/service/network_service';
// import { Icon } from '@iconify/react';
// import { UploadIcon } from 'lucide-react';


// const AdminAddEdit = ({ onupdate }: { onupdate: (profile: any) => any }) => {
//     const { id } = useParams();

//     const [adminDetails, setAdminDetails] = useState<{
//         name: string;
//         phone: string;
//         email: string;
//         address: string;
//         status: string; // "active" or "inactive"
//         password: string; // Added password
//         profileImage: File | null | undefined;
//     }>({
//         name: '',
//         phone: '',
//         email: '',
//         address: '',
//         status: 'active',
//         password: '',
//         profileImage: null,
//     });

//     const [isEdit, setIsEdit] = useState(false);
//     const [preview, setPreview] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchAdminDetails = async () => {
//             if (id) {
//                 try {
//                     const response = await new ApiService().get(`admin/admin/show/${id}`);
//                     setAdminDetails({
//                         ...response.data,
//                         profileImage: response.data.profileImage,
//                         name: response.data.name,
//                     });
//                     if (response.data.profileImage) {
//                         setPreview(response.data.profileImage);
//                     }
//                 } catch (error) {
//                     console.error("Error fetching Admin details:", error);
//                 }
//             }
//         };

//         fetchAdminDetails();
//         setIsEdit(!!id);
//     }, [id]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setAdminDetails({ ...adminDetails, [name]: value });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         setAdminDetails({ ...adminDetails, profileImage: file ?? null });

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPreview(reader.result as string);
//         };
//         if (file) {
//             reader.readAsDataURL(file);
//         } else {
//             setPreview(null);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', adminDetails.name);
//         formData.append('email', adminDetails.email);
//         formData.append('address', adminDetails.address);
//         formData.append('status', adminDetails.status); // Append status
//         formData.append('password', adminDetails.password); // Append password
//         if (adminDetails.profileImage) {
//             formData.append('profileImage', adminDetails.profileImage);
//         }

//         const method = isEdit ? 'POST' : 'POST';
//         const url = isEdit ? `admin/customer/update/${id}` : 'admin/customer/create';

//         try {
//             const response = await new ApiService().post(url, formData);
//             if (response.statusCode === 200) {
//                 toast.success('Admin update successfully');
//                 onupdate(response.data);
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
//                     {isEdit ? 'Edit Admin' : 'Add Admin'}
//                 </Typography>
//                 <Button variant="contained">
//                     New Admin
//                 </Button>
//             </Box>
//             <Card sx={{ p: 3 }}>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={8}>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 name="name"
//                                 value={adminDetails.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <Box sx={{ mb: 4 }}>
//                                 <Typography variant="subtitle1" sx={{ mb: 2 }}>Main Image</Typography>
//                                 <Box
//                                     sx={{
//                                         border: '2px dashed #ccc',
//                                         borderRadius: 2,
//                                         p: 2,
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center',
//                                         bgcolor: '#f5f5f5',
//                                         mb: 2
//                                     }}
//                                 >
//                                     {preview ? (
//                                         <Box
//                                             component="img"
//                                             src={preview}
//                                             alt="Product preview"
//                                             sx={{
//                                                 width: '100%',
//                                                 height: 200,
//                                                 objectFit: 'contain',
//                                                 mb: 2,
//                                                 borderRadius: 1
//                                             }}
//                                         />
//                                     ) : (
//                                         <Icon icon={'eva:cloud-upload-fill'} color={'primary'} />
//                                     )}
//                                     <input
//                                         accept="image/*"
//                                         style={{ display: 'none' }}
//                                         id="main-image-upload"
//                                         type="file"
//                                         onChange={handleFileChange}
//                                     />
//                                     <label htmlFor="main-image-upload">
//                                         <Button
//                                             variant="contained"
//                                             component="span"
//                                             startIcon={<UploadIcon />}
//                                         >
//                                             {preview ? 'Change Image' : 'Upload Image'}
//                                         </Button>
//                                     </label>
//                                 </Box>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={8}>
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="email"
//                                 type="email"
//                                 value={adminDetails.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <TextField
//                                 fullWidth
//                                 label="Phone" // Optional field (you can customize it as needed)
//                                 name="phone"
//                                 value={adminDetails.phone}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Address"
//                                 name="address"
//                                 value={adminDetails.address}
//                                 onChange={handleChange}
//                                 multiline
//                                 rows={4}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <FormControl component="fieldset">
//                                 <FormLabel component="legend">Status</FormLabel>
//                                 <RadioGroup
//                                     row
//                                     name="status"
//                                     value={adminDetails.status}
//                                     onChange={handleChange}
//                                 >
//                                     <FormControlLabel value="active" control={<Radio />} label="Active" />
//                                     <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
//                                     <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Password"
//                                 name="password"
//                                 type="password"
//                                 value={adminDetails.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 fullWidth
//                                 size="large"
//                             >
//                                 {isEdit ? 'Update Admin' : 'Add Admin'}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Card>
//         </Box>
//     );

// };

// export default AdminAddEdit;


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
    Checkbox,
    FormGroup,
} from '@mui/material';
import { toast } from 'react-toastify';
import ApiService from 'src/service/network_service';
import { Icon } from '@iconify/react';
import { UploadIcon } from 'lucide-react';

const AdminAddEdit = ({ onupdate }: { onupdate: (profile: any) => any }) => {
    const { id } = useParams();

    const [adminDetails, setAdminDetails] = useState<{
        name: string;
        phone: string;
        email: string;
        address: string;
        status: string;
        password: string;
        profileImage: File | null | undefined;
        roles: string[]; // Added roles field
    }>({
        name: '',
        phone: '',
        email: '',
        address: '',
        status: 'active',
        password: '',
        profileImage: null,
        roles: [], // Initialize with empty array
    });

    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const rolesList = ["admin", "blog", "product", "user", "order", "category", "dashboard", 'country']; // List of available roles

    useEffect(() => {
        const fetchAdminDetails = async () => {
            if (id) {
                try {
                    const response = await new ApiService().get(`admin/admin/show/${id}`);
                    setAdminDetails({
                        ...response.data,
                        profileImage: response.data.profileImage,
                        name: response.data.name,
                        roles: response.data.roles || [], // Ensure roles are populated
                    });
                    if (response.data.profileImage) {
                        setPreview(response.data.profileImage);
                    }
                } catch (error) {
                    console.error("Error fetching Admin details:", error);
                }
            }
        };

        fetchAdminDetails();
        setIsEdit(!!id);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        if (name === 'roles') {
            // Update the roles array when a checkbox is toggled
            setAdminDetails((prevDetails) => {
                const newRoles = checked
                    ? [...prevDetails.roles, value] // Add role if checked
                    : prevDetails.roles.filter((role) => role !== value); // Remove role if unchecked
                return { ...prevDetails, roles: newRoles };
            });
        } else {
            setAdminDetails({ ...adminDetails, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setAdminDetails({ ...adminDetails, profileImage: file ?? null });

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
        formData.append('name', adminDetails.name);
        formData.append('email', adminDetails.email);
        formData.append('address', adminDetails.address);
        formData.append('status', adminDetails.status); // Append status
        formData.append('password', adminDetails.password); // Append password
        // formData.append('roles', JSON.stringify(adminDetails.roles)); // Add roles field
        adminDetails.roles.forEach((role) => {
            formData.append('roles[]', role);  // 'roles[]' ensures roles are passed as an array
        });
        if (adminDetails.profileImage) {
            formData.append('profileImage', adminDetails.profileImage);
        }

        const method = isEdit ? 'POST' : 'POST';
        const url = isEdit ? `admin/admin/update/${id}` : 'admin/admin/create';

        try {
            const response = await new ApiService().post(url, formData);
            if (response.statusCode === 200) {
                toast.success('Admin update successfully');
                onupdate(response.data);
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
                    {isEdit ? 'Edit Admin' : 'Add Admin'}
                </Typography>
                <Button variant="contained">
                    New Admin
                </Button>
            </Box>
            <Card sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={adminDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                                    {preview ? (
                                        <Box
                                            component="img"
                                            src={preview}
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
                                        <Icon icon={'eva:cloud-upload-fill'} color={'primary'} />
                                    )}
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="main-image-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="main-image-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<UploadIcon />}
                                        >
                                            {preview ? 'Change Image' : 'Upload Image'}
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={adminDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={adminDetails.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={adminDetails.address}
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
                                    value={adminDetails.status}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                    <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {!isEdit && <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={adminDetails.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>}
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Roles</FormLabel>
                                <FormGroup>
                                    {rolesList.map((role) => (
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox
                                                    checked={adminDetails.roles.includes(role)}
                                                    onChange={handleChange}
                                                    name="roles"
                                                    value={role}
                                                />
                                            }
                                            label={role}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                {isEdit ? 'Update Admin' : 'Add Admin'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
};

export default AdminAddEdit;
