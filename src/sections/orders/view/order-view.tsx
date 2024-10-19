
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

export function OrderView() {
    const table = useTable();
    const [filterName, setFilterName] = useState('');
    const [orders, setOrders] = useState<OrdersProps[]>([]);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const router = useRouter();

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

    const dataFiltered: OrdersProps[] = applyFilter({
        inputData: orders,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });



    const notFound = !dataFiltered.length && !!filterName;



    // const handleDeleteOrder = async (idss: string[]) => {
    //     try {
    //         const response = await new ApiService().delete(`admin/orders/delete-many`, { ids: idss });
    //         console.log('Response:', response);

    //         if (response.statusCode === 200) {
    //             toast.success('User deleted successfully');
    //             setOrders(orders.filter((order) => !idss.includes(order._id)));
    //             setSelectedRow([]);
    //             table.onResetPage();
    //         }

    //         // Optionally, refresh the user list or update the state
    //     } catch (error) { 
    //         toast.error('Error deleting order:', error);
    //     }
    // }






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
                    numSelected={table.selected.length}
                    filterName={filterName}
                    idsList={selectedRow}
                    type={'All'}
                    onDeleteRow={(ids: string[]) => {
                        // handleDeleteUser(ids);
                    }}
                    onRestoreRow={(ids: string[]) => {
                        // handleRestoreUser(ids);
                    }}
                    onTrashRow={(ids: string[]) => {
                        // handleTrashUser(ids);
                    }}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <OrderTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={orders.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) => {
                                    if (checked) {
                                        setSelectedRow(orders.map((user: any) => user._id));
                                    } else {
                                        setSelectedRow([]);
                                    }
                                    return table.onSelectAllRows(
                                        checked,
                                        orders.map((user: any) => user._id)
                                    );
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
                                {dataFiltered
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    )
                                    .map((row: any) => (
                                        <OrderTableRow
                                            type={'All'}
                                            key={row._id}
                                            row={row}
                                            selected={table.selected.includes(row._id)}
                                            onSelectRow={() => {
                                                if (selectedRow.includes(row._id)) {
                                                    setSelectedRow(selectedRow.filter((id) => id !== row._id));
                                                } else {
                                                    setSelectedRow([...selectedRow, row._id]);
                                                }
                                                return table.onSelectRow(row._id);
                                            }}
                                            onDeleteRow={(id) => {

                                                setSelectedRow((prevSelectedRow) => {

                                                    const updatedSelectedRow = [id];
                                                    (updatedSelectedRow); // Pass updated state if needed 

                                                    return updatedSelectedRow;
                                                })
                                            }}
                                            onEditRow={(id) => {

                                                router.push(`/user/${id}/edit`);
                                            }}
                                            onRestoreRow={(id) => {
                                                setSelectedRow((prevSelectedRow) => {
                                                    const updatedSelectedRow = [id];
                                                    // handleRestoreUser(updatedSelectedRow);
                                                    return updatedSelectedRow;
                                                })
                                            }}
                                            onTrashRow={(id) => {


                                                setSelectedRow((prevSelectedRow) => {
                                                    const updatedSelectedRow = [id];
                                                    // handleTrashUser(updatedSelectedRow);
                                                    return updatedSelectedRow;
                                                });
                                            }}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, orders.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={table.page}
                    count={orders.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

export function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name'); // Change to a field that exists in your data
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        },
        [order, orderBy]
    );

    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    const onSelectRow = useCallback(
        (inputValue: string) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];

            setSelected(newSelected);
        },
        [selected]
    );

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const onChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            onResetPage();
        },
        [onResetPage]
    );

    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage,
    };
}
