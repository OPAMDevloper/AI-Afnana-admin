
import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { useRouter } from 'src/routes/hooks';
import TablePagination from '@mui/material/TablePagination';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { toast } from 'react-toastify';
import { Scrollbar } from 'src/components/scrollbar';
import ApiService from 'src/service/network_service';
import { TableNoData } from '../table-no-data';
import { OrderTableRow } from '../order-table-row';
import { OrderTableHead } from '../order-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { OrderTableToolbar } from '../order-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../untils';
import type { OrdersProps } from '../order-table-row';



interface PaginationData {
    totalItems: number;
    count: number;
    page: number;
    totalPages: number;
    isNextPage: boolean;
    isPrevPage: boolean;
}

export function OrderView() {
    const [filterName, setFilterName] = useState('');
    const [orders, setOrders] = useState<OrdersProps[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const router = useRouter();

    const [paginationData, setPaginationData] = useState<PaginationData>({
        totalItems: 0,
        count: 0,
        page: 1,
        totalPages: 1,
        isNextPage: false,
        isPrevPage: false,
    });
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    useEffect(() => {
        // Fetch user data from API
        const fetchOrders = async () => {
            try {
                const response = await new ApiService().get('admin/orders/all');
                setOrders(response.data.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchOrders();
    }, []);


    const handleSort = (id: string) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
        setPage(0); // Reset to first page when sorting changes
    }



    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
        setPage(0);
    };



    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    'Orders'
                </Typography>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    New order
                </Button>
            </Box>

            <Card>
                <OrderTableToolbar
                    numSelected={selectedRow.length}
                    filterName={filterName}
                    idsList={selectedRow}
                    type={'All'}
                    onFilterName={handleFilterName}
                    onDeleteRow={() => {

                    }}
                    onRestoreRow={() => {

                    }}
                    onTrashRow={() => {

                    }}

                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <OrderTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={orders.length}
                                numSelected={selectedRow.length}
                                onSort={handleSort}
                                onSelectAllRows={(checked) => {
                                    const newSelected = checked ? orders.map(order => order._id) : [];
                                    setSelectedRow(newSelected);
                                }
                                }
                                headLabel={[
                                    { id: 'Product', label: 'product' },
                                    { id: 'customer name', label: 'customer name' },
                                    { id: 'price', label: 'price' },
                                    { id: 'quantity', label: 'quantity' },
                                    { id: 'total', label: 'total' },

                                    { id: 'status', label: 'Status' },
                                    { id: 'options', label: 'Options' },
                                ]}
                            />
                            <TableBody>
                                {orders
                                    .map((row: any) => (
                                        <OrderTableRow
                                            type={'All'}
                                            key={row._id}
                                            row={row}
                                            selected={selectedRow.includes(row._id)}
                                            onSelectRow={() => {
                                                const newSelected = selectedRow.includes(row._id)
                                                    ? selectedRow.filter(id => id !== row._id)
                                                    : [...selectedRow, row._id];
                                                setSelectedRow(newSelected);
                                            }}
                                            onDeleteRow={() => {

                                            }}
                                            onRestoreRow={() => {

                                            }}
                                            onTrashRow={() => {

                                            }}
                                            onEditRow={() => router.push(`/order/details/${row._id}`)}
                                        />
                                    ))}


                                {orders.length === 0 && (
                                    <TableNoData searchQuery={'orders'} />

                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={page}
                    count={paginationData.totalItems}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Rows per page:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                    rowsPerPageOptions={[5, 10, 25]}

                // onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
            </Card>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------
