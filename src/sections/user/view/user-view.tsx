

// import { useState, useEffect, useCallback } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import { useRouter } from 'src/routes/hooks';
// import TablePagination from '@mui/material/TablePagination';
// import { DashboardContent } from 'src/layouts/dashboard';
// import { Iconify } from 'src/components/iconify';
// import { toast } from 'react-toastify';f
// import { Scrollbar } from 'src/components/scrollbar';
// import ApiService from 'src/service/network_service';
// import { TableNoData } from '../table-no-data';
// import { UserTableRow } from '../user-table-row';
// import { UserTableHead } from '../user-table-head';
// import { TableEmptyRows } from '../table-empty-rows';
// import { UserTableToolbar } from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';
// import type { UserProps } from '../user-table-row';

// export function UserView({ type }: { type: string }) {
//   const table = useTable();
//   const [filterName, setFilterName] = useState('');
//   const [users, setUsers] = useState<UserProps[]>([]);
//   const [selectedRow, setSelectedRow] = useState<string[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch user data from API
//     const fetchUsers = async () => {
//       try {
//         if (type === 'trash') {
//           const response = await new ApiService().get('admin/customer/show/trash/all');

//           setUsers(response.data.data);
//         } else {

//           const response = await new ApiService().get('admin/customer/all');
//           console.log('Response:', response);

//           setUsers(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     fetchUsers();
//   }, [type]);

//   const dataFiltered: UserProps[] = applyFilter({
//     inputData: users,
//     comparator: getComparator(table.order, table.orderBy),
//     filterName,
//   });



//   const notFound = !dataFiltered.length && !!filterName;



//   const handleDeleteUser = async (idss: string[]) => {
//     try {
//       const response = await new ApiService().delete(`admin/customer/delete-many`, { ids: idss });
//       console.log('Response:', response);

//       if (response.statusCode === 200) {
//         toast.success('User deleted successfully');
//         setUsers(users.filter((user) => !idss.includes(user._id)));
//         setSelectedRow([]);
//         table.onResetPage();
//       }

//       // Optionally, refresh the user list or update the state
//     } catch (error) {
//       console.error('Error delete user:', error);
//       toast.error('Error deleting user:', error);
//     }
//   }


//   const handleRestoreUser = async (idss: string[]) => {
//     try {
//       const response = await new ApiService().post(`admin/customer/restore-many`, { ids: idss });


//       if (response.statusCode === 200) {
//         toast.success('User restored successfully');
//         setUsers(users.filter((user) => !idss.includes(user._id)));
//         setSelectedRow([]);
//         table.onResetPage();
//       }

//       // Optionally, refresh the user list or update the state
//     } catch (error) {
//       console.error('Error restore user:', error);
//       toast.error('Error deleting user:', error);
//     }
//   }

//   const handleTrashUser = async (idss: string[]) => {
//     try {

//       const response = await new ApiService().post(`admin/customer/trash-many`, { ids: idss });
//       console.log('Response:', response);

//       if (response.statusCode === 200) {
//         toast.success('User trashed successfully');
//         // remove the deleted user from the table
//         setUsers(users.filter((user) => !idss.includes(user._id)));
//         setSelectedRow([]);

//       }
//     } catch (error) {
//       toast.error('Error deleting user:', error);
//       console.error('Error deleting user:', error);
//     }
//   }


//   return (
//     <DashboardContent>

// <Box display="flex" alignItems="center" mb={5}>
//   <Typography variant="h4" flexGrow={1}>
//     {type === 'trash' ? 'Trash' : 'Users'}
//   </Typography>
//   <Button
//     variant="contained"
//     color="inherit"
//     startIcon={<Iconify icon="mingcute:add-line" />}
//   >
//     {type === 'trash' ? 'Restore' : 'New user'}
//   </Button>
// </Box>

//       <Card>
//         <UserTableToolbar
//           numSelected={table.selected.length}
//           filterName={filterName}
//           idsList={selectedRow}
//           type={type}
//           onDeleteRow={(ids: string[]) => {
//             handleDeleteUser(ids);
//           }}
//           onRestoreRow={(ids: string[]) => {
//             handleRestoreUser(ids);
//           }}
//           onTrashRow={(ids: string[]) => {
//             handleTrashUser(ids);
//           }}
//           onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
//             setFilterName(event.target.value);
//             table.onResetPage();
//           }}
//         />

//         <Scrollbar>
//           <TableContainer sx={{ overflow: 'unset' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <UserTableHead
//                 order={table.order}
//                 orderBy={table.orderBy}
//                 rowCount={users.length}
//                 numSelected={table.selected.length}
//                 onSort={table.onSort}
//                 onSelectAllRows={(checked) => {
//                   if (checked) {
//                     setSelectedRow(users.map((user: any) => user._id));
//                   } else {
//                     setSelectedRow([]);
//                   }
//                   return table.onSelectAllRows(
//                     checked,
//                     users.map((user: any) => user._id)
//                   );
//                 }
//                 }
//                 headLabel={[
//                   { id: 'name', label: 'name' },
//                   { id: 'email', label: 'Email' },
//                   { id: 'createdAt', label: 'Created At' },
//                   { id: 'status', label: 'Status' },
//                   { id: 'options', label: 'Options' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   .slice(
//                     table.page * table.rowsPerPage,
//                     table.page * table.rowsPerPage + table.rowsPerPage
//                   )
//                   .map((row: any) => (
//                     <UserTableRow
//                       type={type}
//                       key={row._id}
//                       row={row}
//                       selected={table.selected.includes(row._id)}
//                       onSelectRow={() => {
//                         if (selectedRow.includes(row._id)) {
//                           setSelectedRow(selectedRow.filter((id) => id !== row._id));
//                         } else {
//                           setSelectedRow([...selectedRow, row._id]);
//                         }
//                         return table.onSelectRow(row._id);
//                       }}
//                       onDeleteRow={(id) => {

//                         setSelectedRow((prevSelectedRow) => {

//                           const updatedSelectedRow = [id];
//                           handleDeleteUser(updatedSelectedRow); // Pass updated state if needed 

//                           return updatedSelectedRow;
//                         })
//                       }}
//                       onEditRow={(id) => {

//                         router.push(`/user/${id}/edit`);
//                       }}
//                       onRestoreRow={(id) => {
//                         setSelectedRow((prevSelectedRow) => {
//                           const updatedSelectedRow = [id];
//                           handleRestoreUser(updatedSelectedRow);
//                           return updatedSelectedRow;
//                         })
//                       }}
//                       onTrashRow={(id) => {


//                         setSelectedRow((prevSelectedRow) => {
//                           const updatedSelectedRow = [id];
//                           handleTrashUser(updatedSelectedRow);
//                           return updatedSelectedRow;
//                         });
//                       }}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={68}
//                   emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
//                 />

//                 {notFound && <TableNoData searchQuery={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           component="div"
//           page={table.page}
//           count={users.length}
//           rowsPerPage={table.rowsPerPage}
//           onPageChange={table.onChangePage}
//           rowsPerPageOptions={[5, 10, 25]}
//           onRowsPerPageChange={table.onChangeRowsPerPage}
//         />
//       </Card>
//     </DashboardContent>
//   );
// }

// // ----------------------------------------------------------------------

// export function useTable() {
//   const [page, setPage] = useState(0);
//   const [orderBy, setOrderBy] = useState('name'); // Change to a field that exists in your data
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');

//   const onSort = useCallback(
//     (id: string) => {
//       const isAsc = orderBy === id && order === 'asc';
//       setOrder(isAsc ? 'desc' : 'asc');
//       setOrderBy(id);
//     },
//     [order, orderBy]
//   );

//   const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
//     if (checked) {
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   }, []);

//   const onSelectRow = useCallback(
//     (inputValue: string) => {
//       const newSelected = selected.includes(inputValue)
//         ? selected.filter((value) => value !== inputValue)
//         : [...selected, inputValue];

//       setSelected(newSelected);
//     },
//     [selected]
//   );

//   const onResetPage = useCallback(() => {
//     setPage(0);
//   }, []);

//   const onChangePage = useCallback((event: unknown, newPage: number) => {
//     setPage(newPage);
//   }, []);

//   const onChangeRowsPerPage = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       onResetPage();
//     },
//     [onResetPage]
//   );

//   return {
//     page,
//     order,
//     onSort,
//     orderBy,
//     selected,
//     rowsPerPage,
//     onSelectRow,
//     onResetPage,
//     onChangePage,
//     onSelectAllRows,
//     onChangeRowsPerPage,
//   };
// }


import { useState, useEffect, useCallback } from 'react';

// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import { Card, CardHeader, CardContent, TablePagination, Box, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Button } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { toast } from 'react-toastify';
import { Scrollbar } from 'src/components/scrollbar';
import ApiService from 'src/service/network_service';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { getComparator } from '../utils';
import type { UserProps } from '../user-table-row';

interface PaginationData {
  totalItems: number;
  count: number;
  page: number;
  totalPages: number;
  isNextPage: boolean;
  isPrevPage: boolean;
}

export function UserView({ type }: { type: string }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
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
  const router = useRouter();

  const fetchUsers = async (pageNum: number, limit: number) => {
    try {
      var endpoint = type === 'trash'
        ? 'admin/customer/show/trash/all'
        : 'admin/customer/all';




      const params = new URLSearchParams({
        page: (pageNum + 1).toString(),
        count: limit.toString(),
        // sort: `${order === 'desc' ? '-' : ''}${orderBy}`,
        // search: filterName,
      });


      const search = filterName ? `&search=${filterName}` : '';

      const response = await new ApiService().get(`${endpoint}?${params}${search}`);

      setUsers(response.data.data);
      setPaginationData({
        totalItems: response.data.totalItems,
        count: response.data.count,
        page: response.data.page,
        totalPages: response.data.totalPages,
        isNextPage: response.data.isNextPage,
        isPrevPage: response.data.isPrevPage,
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [type, page, rowsPerPage, orderBy, order, filterName]);

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
    setPage(0); // Reset to first page when sorting changes
  };

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

  const handleDeleteUser = async (ids: string[]) => {
    try {
      const response = await new ApiService().delete('admin/customer/delete-many', { ids });
      if (response.statusCode === 200) {
        toast.success('User deleted successfully');
        fetchUsers(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  const handleRestoreUser = async (ids: string[]) => {
    try {
      const response = await new ApiService().post('admin/customer/restore-many', { ids });
      if (response.statusCode === 200) {
        toast.success('User restored successfully');
        fetchUsers(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error restoring user:', error);
      toast.error('Error restoring user');
    }
  };

  const handleTrashUser = async (ids: string[]) => {
    try {
      const response = await new ApiService().post('admin/customer/trash-many', { ids });
      if (response.statusCode === 200) {
        toast.success('User trashed successfully');
        fetchUsers(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error trashing user:', error);
      toast.error('Error trashing user');
    }
  };

  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {type === 'trash' ? 'Trash' : 'Users'}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          {type === 'trash' ? 'Restore' : 'New user'}
        </Button>
      </Box>


      <Card>
        <UserTableToolbar
          numSelected={selectedRow.length}
          filterName={filterName}
          idsList={selectedRow}
          type={type}
          onDeleteRow={handleDeleteUser}
          onRestoreRow={handleRestoreUser}
          onTrashRow={handleTrashUser}
          onFilterName={(data) => {
            console.log('filterName $filtername', data)
            handleFilterName(data);
          }}
        />

        <Scrollbar>
          <TableContainer className="overflow-unset">
            <Table>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selectedRow.length}
                onSort={handleSort}
                onSelectAllRows={(checked) => {
                  const newSelected = checked ? users.map(user => user._id) : [];
                  setSelectedRow(newSelected);
                }}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'options', label: 'Options' },
                ]}
              />
              <TableBody>
                {users.map((row) => (
                  <UserTableRow
                    key={row._id}
                    row={row}
                    type={type}
                    selected={selectedRow.includes(row._id)}
                    onSelectRow={() => {
                      const newSelected = selectedRow.includes(row._id)
                        ? selectedRow.filter(id => id !== row._id)
                        : [...selectedRow, row._id];
                      setSelectedRow(newSelected);
                    }}
                    onDeleteRow={() => handleDeleteUser([row._id])}
                    onRestoreRow={() => handleRestoreUser([row._id])}
                    onTrashRow={() => handleTrashUser([row._id])}
                    onEditRow={() => router.push(`/user/${row._id}/edit`)}
                  />
                ))}

                {users.length === 0 && (
                  <TableNoData searchQuery={filterName} />

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
        >
        </TablePagination>
      </Card>
    </DashboardContent >

  );
}