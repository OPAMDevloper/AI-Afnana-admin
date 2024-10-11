// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { _users } from 'src/_mock';
// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';

// import { TableNoData } from '../table-no-data';
// import { UserTableRow } from '../user-table-row';
// import { UserTableHead } from '../user-table-head';
// import { TableEmptyRows } from '../table-empty-rows';
// import { UserTableToolbar } from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';

// import type { UserProps } from '../user-table-row';

// // ----------------------------------------------------------------------

// export function UserView() {
//   const table = useTable();

//   const [filterName, setFilterName] = useState('');

//   const dataFiltered: UserProps[] = applyFilter({
//     inputData: _users,
//     comparator: getComparator(table.order, table.orderBy),
//     filterName,
//   });

//   const notFound = !dataFiltered.length && !!filterName;

//   return (
//     <DashboardContent>
//       <Box display="flex" alignItems="center" mb={5}>
//         <Typography variant="h4" flexGrow={1}>
//           Users
//         </Typography>
//         <Button
//           variant="contained"
//           color="inherit"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//         >
//           New user
//         </Button>
//       </Box>

//       <Card>
//         <UserTableToolbar
//           numSelected={table.selected.length}
//           filterName={filterName}
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
//                 rowCount={_users.length}
//                 numSelected={table.selected.length}
//                 onSort={table.onSort}
//                 onSelectAllRows={(checked) =>
//                   table.onSelectAllRows(
//                     checked,
//                     _users.map((user) => user.id)
//                   )
//                 }
//                 headLabel={[
//                   { id: 'name', label: 'Name' },
//                   { id: 'company', label: 'Company' },
//                   { id: 'role', label: 'Role' },
//                   { id: 'isVerified', label: 'Verified', align: 'center' },
//                   { id: 'status', label: 'Status' },
//                   { id: '' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   .slice(
//                     table.page * table.rowsPerPage,
//                     table.page * table.rowsPerPage + table.rowsPerPage
//                   )
//                   .map((row) => (
//                     <UserTableRow
//                       key={row.id}
//                       row={row}
//                       selected={table.selected.includes(row.id)}
//                       onSelectRow={() => table.onSelectRow(row.id)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={68}
//                   emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
//                 />

//                 {notFound && <TableNoData searchQuery={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           component="div"
//           page={table.page}
//           count={_users.length}
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
//   const [orderBy, setOrderBy] = useState('name');
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
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
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
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';

export function UserView({ type }: { type: string }) {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data from API
    const fetchUsers = async () => {
      try {
        if (type === 'trash') {
          const response = await new ApiService().get('admin/customer/show/trash/all');

          setUsers(response.data.data);
        } else {

          const response = await new ApiService().get('admin/customer/all');
          console.log('Response:', response);

          setUsers(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [type]);

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });



  const notFound = !dataFiltered.length && !!filterName;



  const handleDeleteUser = async (idss: string[]) => {
    try {
      const response = await new ApiService().delete(`admin/customer/delete-many`, { ids: idss });
      console.log('Response:', response);
      
      if (response.statusCode === 200) {
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => !idss.includes(user._id)));
        setSelectedRow([]);
        table.onResetPage();
      }

      // Optionally, refresh the user list or update the state
    } catch (error) {
      console.error('Error delete user:', error);
      toast.error('Error deleting user:', error);
    }
  }


  const handleRestoreUser = async (idss : string[]) => {
    try {
      const response = await new ApiService().post(`admin/customer/restore-many`, { ids: idss });

      
      if (response.statusCode === 200) {
        toast.success('User restored successfully');
        setUsers(users.filter((user) => !idss.includes(user._id)));
        setSelectedRow([]);
        table.onResetPage();
      }

      // Optionally, refresh the user list or update the state
    } catch (error) {
      console.error('Error restore user:', error);
      toast.error('Error deleting user:', error);
    }
  }

  const handleTrashUser = async (idss: string[]) => {
    try {

      const response = await new ApiService().post(`admin/customer/trash-many`, { ids: idss });
      console.log('Response:', response);
      
      if (response.statusCode === 200) {
        toast.success('User trashed successfully');
        // remove the deleted user from the table
        setUsers(users.filter((user) => !idss.includes(user._id)));
        setSelectedRow([]);

      }

      // Optionally, refresh the user list or update the state
    } catch (error) {
      toast.error('Error deleting user:', error);
      console.error('Error deleting user:', error);
    }
  }


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
          numSelected={table.selected.length}
          filterName={filterName}
          idsList={selectedRow}
          type={type}
          onDeleteRow={(ids: string[]) => {
            handleDeleteUser(ids);
          }}
          onRestoreRow={(ids: string[]) => {
            handleRestoreUser(ids);
          }}
          onTrashRow={(ids: string[]) => {
            handleTrashUser(ids);
          }}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  if (checked) {
                    setSelectedRow(users.map((user: any) => user._id));
                  } else {
                    setSelectedRow([]);
                  }
                  return table.onSelectAllRows(
                    checked,
                    users.map((user: any) => user._id)
                  );
                }
                }
                headLabel={[
                  { id: 'username', label: 'Username' },
                  { id: 'email', label: 'Email' },
                  { id: 'createdAt', label: 'Created At' },
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
                    <UserTableRow
                      type={type}
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

                          const updatedSelectedRow = [ id];
                          handleDeleteUser(updatedSelectedRow); // Pass updated state if needed 

                          return updatedSelectedRow;
                        })
                      }}
                      onEditRow={(id) => {
                        setSelectedRow([id]);
                        // return table.onEditRow(id);
                      }}
                      onRestoreRow={(id) => { 

                        // setSelectedRow(ids => [...ids, id]);
                        // handleRestoreUser();
                        setSelectedRow((prevSelectedRow) => {
                          const updatedSelectedRow = [ id];
                          handleRestoreUser(updatedSelectedRow); // Pass updated state if needed
                          return updatedSelectedRow;
                        })
                      }}
                      onTrashRow={(id) => {

                        
                        setSelectedRow((prevSelectedRow) => {
                          const updatedSelectedRow = [ id];
                          handleTrashUser(updatedSelectedRow); // Pass updated state if needed
                          return updatedSelectedRow;
                        });
                        // return table.onTrashRow(id);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
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
  const [orderBy, setOrderBy] = useState('username'); // Change to a field that exists in your data
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
