// import React, { useState, useEffect } from 'react';
// import {
//     Card,
//     CardContent,
//     Typography,
//     Avatar,
//     Grid,
//     IconButton,
//     TextField,
//     Button,
//     Box,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormControl,
//     FormLabel,
//     Divider,
// } from '@mui/material';
// // import EditIcon from '@mui/icons-material/Edit';
// // import SaveIcon from '@mui/icons-material/Save';
// // import CancelIcon from '@mui/icons-material/Cancel';

// //import icons from react
// import { Iconify } from 'src/components/iconify';
// import { toast } from 'react-toastify';
// import ApiService from 'src/service/network_service';
// import { EditIcon, SaveIcon, ShieldClose } from 'lucide-react';
// import UserAddEdit from './addEdit';

// interface UserDetailsProps {
//     userId: string;
// }

// interface UserDetails {
//     name: string;
//     email: string;
//     address: string;
//     status: string;
//     profileImage: string | null;
//     createdAt: string;
// }

// const UserDetailsCard = ({ userId }: UserDetailsProps) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [userDetails, setUserDetails] = useState<UserDetails>({
//         name: '',
//         email: '',
//         address: '',
//         status: 'active',
//         profileImage: null,
//         createdAt: '',
//     });
//     const [editedDetails, setEditedDetails] = useState<UserDetails>(userDetails);
//     const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

//     useEffect(() => {
//         fetchUserDetails();
//     }, [userId]);

// const fetchUserDetails = async () => {
//     try {
//         const response = await new ApiService().get(`admin/customer/show/${userId}`);
//         setUserDetails(response.data);
//         setEditedDetails(response.data);
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         toast.error('Failed to fetch user details');
//     }
// };

//     const handleEditClick = () => {
//         // setIsEditing(true);
//         // setEditedDetails({ ...userDetails });
//         < UserAddEdit    />
//     };

//     const handleCancelEdit = () => {
//         setIsEditing(false);
//         setEditedDetails(userDetails);
//         setProfileImageFile(null);
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setEditedDetails(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setProfileImageFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setEditedDetails(prev => ({
//                     ...prev,
//                     profileImage: reader.result as string
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('name', editedDetails.name);
//             formData.append('email', editedDetails.email);
//             formData.append('address', editedDetails.address);
//             formData.append('status', editedDetails.status);
//             if (profileImageFile) {
//                 formData.append('profileImage', profileImageFile);
//             }

//             const response = await new ApiService().post(
//                 `admin/customer/update/${userId}`,
//                 formData
//             );

//             if (response.statusCode === 200) {
//                 toast.success('User details updated successfully');
//                 setUserDetails(editedDetails);
//                 setIsEditing(false);
//                 fetchUserDetails();
//             }
//         } catch (error) {
//             console.error('Error updating user details:', error);
//             toast.error('Failed to update user details');
//         }
//     };

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });
//     };

//     return (
// <Card sx={{ maxWidth: 800, margin: 'auto', mt: 3 }}>
//     <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//             <Typography variant="h5" component="div">
//                 User Details
//             </Typography>
//             {!isEditing ? (
//                 <IconButton onClick={handleEditClick} color="primary">
//                     <EditIcon />
//                 </IconButton>
//             ) : (
//                 <Box>
//                     <IconButton onClick={handleSubmit} color="primary">
//                         <SaveIcon />
//                     </IconButton>
//                     <IconButton onClick={handleCancelEdit} color="error">
//                         <ShieldClose />
//                     </IconButton>
//                 </Box>
//             )}
//         </Box>

//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Box sx={{ textAlign: 'center' }}>
//                     <Avatar
//                         src={userDetails.profileImage || ''}
//                         sx={{ width: 120, height: 120, mb: 2, margin: 'auto' }}
//                     />
//                     {isEditing && (
//                         <Button
//                             variant="outlined"
//                             component="label"
//                             size="small"
//                         >
//                             Change Photo
//                             <input
//                                 type="file"
//                                 hidden
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                             />
//                         </Button>
//                     )}
//                 </Box>
//             </Grid>

//             <Grid item xs={12} sm={8}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         {isEditing ? (
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 name="name"
//                                 value={editedDetails.name}
//                                 onChange={handleChange}
//                             />
//                         ) : (
//                             <Typography variant="body1">
//                                 <strong>Name:</strong> {userDetails.name}
//                             </Typography>
//                         )}
//                     </Grid>

//                     <Grid item xs={12}>
//                         {isEditing ? (
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="email"
//                                 value={editedDetails.email}
//                                 onChange={handleChange}
//                             />
//                         ) : (
//                             <Typography variant="body1">
//                                 <strong>Email:</strong> {userDetails.email}
//                             </Typography>
//                         )}
//                     </Grid>

//                     <Grid item xs={12}>
//                         {isEditing ? (
//                             <TextField
//                                 fullWidth
//                                 label="Address"
//                                 name="address"
//                                 value={editedDetails.address}
//                                 onChange={handleChange}
//                                 multiline
//                                 rows={3}
//                             />
//                         ) : (
//                             <Typography variant="body1">
//                                 <strong>Address:</strong> {userDetails.address}
//                             </Typography>
//                         )}
//                     </Grid>

//                     <Grid item xs={12}>
//                         {isEditing ? (
//                             <FormControl component="fieldset">
//                                 <FormLabel component="legend">Status</FormLabel>
//                                 <RadioGroup
//                                     row
//                                     name="status"
//                                     value={editedDetails.status}
//                                     onChange={handleChange}
//                                 >
//                                     <FormControlLabel value="active" control={<Radio />} label="Active" />
//                                     <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
//                                 </RadioGroup>
//                             </FormControl>
//                         ) : (
//                             <Typography variant="body1">
//                                 <strong>Status:</strong> {userDetails.status}
//                             </Typography>
//                         )}
//                     </Grid>

//                     <Grid item xs={12}>
//                         <Typography variant="body1">
//                             <strong>Member Since:</strong> {formatDate(userDetails.createdAt)}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     </CardContent>
// </Card>
//     );
// };

// export default UserDetailsCard;

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    IconButton,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import ApiService from 'src/service/network_service';
import { EditIcon, SaveIcon, ShieldClose } from 'lucide-react';
import UserAddEdit from './addEdit';
import { fDate } from 'src/utils/format-time';


interface UserDetailsProps {
    userId: string;
}

interface UserDetails {
    name: string;
    email: string;
    address: string;
    status: string;
    profileImage: string | null;
    createdAt: string;
}

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Avatar, Grid, IconButton, Box } from '@mui/material';
// import { toast } from 'react-toastify';
// import ApiService from 'src/service/network_service';
// // import UserEdit from './UserEdit'; // Import the new UserEdit component
// import { EditIcon } from 'lucide-react';
// import UserAddEdit from './addEdit';

const UserDetailsCard = ({ userId }: UserDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        email: '',
        address: '',
        status: '',
        profileImage: null,
        createdAt: '',
    });

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    const fetchUserDetails = async () => {
        try {
            const response = await new ApiService().get(`admin/customer/show/${userId}`);
            setUserDetails(response.data);
            // setIsEditing(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to fetch user details');
        }
    };

    // const handleEditClick = () => {
    //     setIsEditing(true);
    // };

    // const handleCancelEdit = () => {
    //     setIsEditing(false);
    // };



    return (
        <>
            {isEditing ? (
                <UserAddEdit onupdate={() => {
                    console.log('onupdate');

                }}
                />
            ) : (
                <Card sx={{ maxWidth: 800, margin: 'auto', mt: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5" component="div">
                                User Details
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        src={userDetails?.profileImage || ''}
                                        sx={{ width: 120, height: 120, mb: 2, margin: 'auto' }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Name:</strong> {userDetails.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {userDetails.email}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Address:</strong> {userDetails.address}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Status:</strong> {userDetails.status}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Member Since:</strong> {fDate(userDetails.createdAt)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default UserDetailsCard;
