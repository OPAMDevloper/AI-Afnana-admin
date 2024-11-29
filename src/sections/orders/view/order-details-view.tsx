import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    SelectChangeEvent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Grid,
    Divider,
    Button,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ApiService from 'src/service/network_service';
import { MapPinIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';

interface Product {
    productId: string;
    quantity: number;
    _id: string;
    name?: string;
    price: number;
    image: string;
}

interface OrderDetails {
    _id: string;
    userId: {
        name: string;
        _id: String;
        email: String;
        profileImage: String;
    };
    products: Product[];
    amount: number;
    address: string;
    status: 'pending' | 'delivered' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export function OrderDetailsPage() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            const response = await new ApiService().get(`admin/order/show/${id}`);
            if (response.statusCode === 200) {
                setOrderDetails(response.data);
            }
        } catch (error) {
            toast.error('Failed to fetch order details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value as OrderDetails['status'];
        try {
            const response = await new ApiService().post(`admin/order/update/${id}`, {
                status: newStatus
            });

            if (response.statusCode === 200) {
                setOrderDetails(prev => prev ? { ...prev, status: newStatus } : null);
                toast.success('Order status updated successfully');
            }
        } catch (error) {
            toast.error('Failed to update order status');
        }
    };

    if (loading) {
        return <Box sx={{ p: 3 }}><CircularProgress color="primary" /></Box>;
    }

    if (!orderDetails) {
        return <Box sx={{ p: 3 }}><Typography>Order not found</Typography></Box>;
    }

    return (
        <Box sx={{ p: 3, maxWidth: '100%', bgcolor: '#F8FAFC' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Order Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Order ID: {orderDetails._id}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* User and Status Section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                User Details
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    src={String(orderDetails.userId?.profileImage) || '/default-avatar.png'}
                                    sx={{ width: 60, height: 60 }}
                                />
                                <Box>
                                    <Typography variant="subtitle2">{orderDetails.userId?.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{orderDetails.userId?.email}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Order Status
                            </Typography>
                            <Select
                                value={orderDetails.status}
                                onChange={handleStatusChange}
                                size="small"
                                sx={{ width: '100%', minWidth: 200 }}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="accepted">Accepted</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </Box>
                    </Paper>
                </Grid>

                {/* Products Table */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Products Ordered
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Date</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails.products.map((product: any) => {
                                        console.log('product product', product.productId);
                                        return (
                                            <TableRow key={product._id}>
                                                <TableCell>
                                                    <Avatar variant="rounded" src={import.meta.env.VITE_APP_BASE_URL + '/' + product.productId.image} sx={{ width: 60, height: 60 }} />
                                                </TableCell>
                                                <TableCell>{product.productId.name}</TableCell>
                                                <TableCell align="center">{product.quantity}</TableCell>
                                                <TableCell align="right">${product.productId.price}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Order Summary
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MapPinIcon size={20} />
                                <Typography variant="subtitle2">Shipping Address</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{orderDetails.address}</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DollarSignIcon size={20} />
                                <Typography variant="subtitle2">Payment Details</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                                <Typography variant="h6">${orderDetails.amount.toFixed(2)}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarIcon size={20} />
                                <Typography variant="subtitle2">Order Dates</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Created At: {new Date(orderDetails.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Updated: {new Date(orderDetails.updatedAt).toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
