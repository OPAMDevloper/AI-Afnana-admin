import { useState, useCallback, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { CartIcon } from '../admin-cart-widget';

import { Card, TableBody, TableRow, TableCell } from '@mui/material';
import { AdmintableToolbar } from '../admin-table-toolbar';
import { AdminProps, AdminTableRow } from '../admin-table-row';
import ApiService from 'src/service/network_service';
import { applyFilter, emptyRows, getComparator } from 'src/sections/admin/utils';
import { toast } from 'react-toastify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableEmptyRows } from 'src/sections/admin/table-empty-rows';
import { TableNoData } from 'src/sections/admin/table-no-data';
import { TablePagination } from '@mui/material';
import { AdminTableHead } from '../admin-table-head';
import { useRouter } from 'src/routes/hooks';
import { ProdcuttableToolbar } from 'src/sections/product/product-table-toolbar';


// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

interface PaginationData {
  totalItems: number;
  count: number;
  page: number;
  totalPages: number;
  isNextPage: boolean;
  isPrevPage: boolean;
}
export function AdminsView({ type = 'all' }) {

  const [sortBy, setSortBy] = useState('featured');
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [paginationData, setPaginationData] = useState<PaginationData>({
    totalItems: 0,
    count: 0,
    page: 1,
    totalPages: 1,
    isNextPage: false,
    isPrevPage: false,
  });


  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  // const handleSort = useCallback((newSort: string) => {
  //   setSortBy(newSort);
  // }, []);

  // const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
  //   setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  // }, []);

  // const canReset = Object.keys(filters).some(
  //   (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  // );

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
    setPage(0); // Reset to first page when sorting changes
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filterName, setFilterName] = useState('');
  const [admin, setAdmin] = useState<AdminProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  useEffect(() => {
    const fetchAdmins = async (pageNum: number, limit: number) => {
      try {
        const endpoint = type === 'trash'
          ? 'admin/admin/show/trash/all'
          : 'admin/admin/all';

        const params = new URLSearchParams({
          page: (pageNum + 1).toString(),
          count: limit.toString(),
          // sort: `${order === 'desc' ? '-' : ''}${orderBy}`,
        });

        const search = filterName ? `&search=${filterName}` : '';
        const response = await new ApiService().get(`${endpoint}?${params}${search}`);

        setAdmin(response.data.data);
        setPaginationData({
          totalItems: response.data.totalItems,
          count: response.data.count,
          page: response.data.page,
          totalPages: response.data.totalPages,
          isNextPage: response.data.isNextPage,
          isPrevPage: response.data.isPrevPage,
        });

      } catch (error) {
        console.error('Failed to fetch Admin:', error);
      }
    };

    fetchAdmins(page, rowsPerPage);
  }, [type, page, rowsPerPage, orderBy, order, filterName]);

  const handleDeleteAdmin = async (idss: string[]) => {
    try {
      const response = await new ApiService().delete(`admin/admin/delete-many`, { ids: idss });

      if (response.statusCode === 200) {
        toast.success('Admin deleted successfully');
        setAdmin(admin.filter((admin) => !idss.includes(admin._id)));
        setSelectedRow([]);
      }

      // Optionally, refresh the Admin list or update the state
    } catch (error) {
      console.error('Error delete Admin:', error);
      toast.error('Error deleting Admin:', error);
    }
  }


  const handleRestoreAdmin = async (idss: string[]) => {
    try {
      const response = await new ApiService().post(`admin/admin/restore-many`, { ids: idss });


      if (response.statusCode === 200) {
        toast.success('Admin restored successfully');
        setAdmin(admin.filter((admin) => !idss.includes(admin._id)));
        setSelectedRow([]);
      }

    } catch (error) {
      console.error('Error restore Admin:', error);
      toast.error('Error deleting Admin:', error);
    }
  }

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);

  };
  const handleTrashAdmin = async (idss: string[]) => {
    try {

      const response = await new ApiService().post(`admin/admin/trash-many`, { ids: idss });
      console.log('Response:', response);

      if (response.statusCode === 200) {
        toast.success('Admin trashed successfully');
        // remove the deleted Admin from the table
        setAdmin(admin.filter((admin) => !idss.includes(admin._id)));
        setSelectedRow([]);

      }
    } catch (error) {
      toast.error('Error deleting Admin:', error);
      console.error('Error deleting Admin:', error);
    }
  }

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Admins
      </Typography>

      {/* <CartIcon totalItems={8} /> */}


      <Card>
        <AdmintableToolbar
          numSelected={selectedRow.length}
          filterName={filterName}
          idsList={selectedRow}
          type={type}
          onDeleteRow={(ids: string[]) => {
            handleDeleteAdmin(ids);
          }}
          onRestoreRow={(ids: string[]) => {
            handleRestoreAdmin(ids);
          }}
          onTrashRow={(ids: string[]) => {
            handleTrashAdmin(ids);
          }}
          onFilterName={(data) => {
            handleFilterName(data);
          }}
        />

        <Scrollbar>
          <TableContainer >
            <Table sx={{ minWidth: 800, width: '100%', }} >
              <AdminTableHead
                order={order}
                orderBy={orderBy}
                rowCount={admin.length}
                numSelected={selectedRow.length}
                onSort={handleSort}
                onSelectAllRows={(checked: any) => {
                  const newSelected = checked ? admin.map(item => item._id) : [];
                  setSelectedRow(newSelected);
                }
                }
                headLabel={[
                  { id: 'name', label: 'name' },
                  { id: 'email', label: 'email' },

                  { id: 'role', label: 'role' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'options', label: 'Options' },
                ]}
              />


              <TableBody  >
                {admin
                  .map((row: any) => (
                    <AdminTableRow
                      type={type}
                      key={row._id}
                      row={row}
                      selected={selectedRow.includes(row._id)}
                      onSelectRow={() => {
                        const newSelected = selectedRow.includes(row._id)
                          ? selectedRow.filter(id => id !== row._id)
                          : [...selectedRow, row._id];
                        setSelectedRow(newSelected);
                      }}
                      onDeleteRow={() => handleDeleteAdmin([row._id])}
                      onRestoreRow={() => handleRestoreAdmin([row._id])}
                      onTrashRow={() => handleTrashAdmin([row._id])}
                      onEditRow={(id: any) => router.push(`/admin/${id}/edit`)}
                    />
                  ))}

                {admin.length === 0 && (
                  // <TableRow sx={{ width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}   >
                  //   <TableCell colSpan={6}>
                  <TableNoData searchQuery={type === 'trash' ? 'Trash admin' : 'Admins'} />
                  //   </TableCell>
                  // </TableRow>
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
          // labelRowsPerPage="Rows per page:"
          // labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          rowsPerPageOptions={[5, 10, 25]}
        >
        </TablePagination>
      </Card>


    </DashboardContent >
  );
}
