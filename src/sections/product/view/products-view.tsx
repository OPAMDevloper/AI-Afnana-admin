import { useState, useCallback, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { CartIcon } from '../product-cart-widget';

import type { FiltersProps } from '../product-filters';
import { Card, TableBody, TableRow, TableCell } from '@mui/material';
import { ProdcuttableToolbar } from '../product-table-toolbar';
import { ProductProps, ProductTableRow } from '../product-table-row';
import ApiService from 'src/service/network_service';
import { applyFilter, emptyRows, getComparator } from 'src/sections/product/utils';
import { toast } from 'react-toastify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableEmptyRows } from 'src/sections/user/table-empty-rows';
import { TableNoData } from 'src/sections/user/table-no-data';
import { TablePagination } from '@mui/material';
import { ProductTableHead } from '../product-table-head';
import { useRouter } from 'src/routes/hooks';


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
export function ProductsView({ type = 'all' }) {

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

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );


  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filterName, setFilterName] = useState('');
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async (pageNum: number, limit: number) => {
      try {
        const endpoint = type === 'trash'
          ? 'admin/product/show/trash/all'
          : 'admin/product/all';

        const params = new URLSearchParams({
          page: (pageNum + 1).toString(),
          count: limit.toString(),
          // sort: `${order === 'desc' ? '-' : ''}${orderBy}`,
          // search: filterName,
        });
        const response = await new ApiService().get(`${endpoint}?${params}`);

        setProduct(response.data.data);
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
      }
    };

    fetchProducts(page, rowsPerPage);
  }, [type, page, rowsPerPage, orderBy, order, filterName]);

  const handleDeleteUser = async (idss: string[]) => {
    try {
      const response = await new ApiService().delete(`admin/product/delete-many`, { ids: idss });

      if (response.statusCode === 200) {
        toast.success('User deleted successfully');
        setProduct(product.filter((product) => !idss.includes(product._id)));
        setSelectedRow([]);
      }

      // Optionally, refresh the user list or update the state
    } catch (error) {
      console.error('Error delete user:', error);
      toast.error('Error deleting user:', error);
    }
  }


  const handleRestoreUser = async (idss: string[]) => {
    try {
      const response = await new ApiService().post(`admin/product/restore-many`, { ids: idss });


      if (response.statusCode === 200) {
        toast.success('User restored successfully');
        setProduct(product.filter((product) => !idss.includes(product._id)));
        setSelectedRow([]);
      }

    } catch (error) {
      console.error('Error restore user:', error);
      toast.error('Error deleting user:', error);
    }
  }

  const handleTrashUser = async (idss: string[]) => {
    try {

      const response = await new ApiService().post(`admin/product/trash-many`, { ids: idss });
      console.log('Response:', response);

      if (response.statusCode === 200) {
        toast.success('User trashed successfully');
        // remove the deleted user from the table
        setProduct(product.filter((product) => !idss.includes(product._id)));
        setSelectedRow([]);

      }
    } catch (error) {
      toast.error('Error deleting user:', error);
      console.error('Error deleting user:', error);
    }
  }

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <CartIcon totalItems={8} />


      <Card>
        <ProdcuttableToolbar
          numSelected={selectedRow.length}
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
          }}
        />

        <Scrollbar>
          <TableContainer >
            <Table sx={{ minWidth: 800, width: '100%', }} >
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                rowCount={product.length}
                numSelected={selectedRow.length}
                onSort={handleSort}
                onSelectAllRows={(checked) => {
                  const newSelected = checked ? product.map(item => item._id) : [];
                  setSelectedRow(newSelected);
                }
                }
                headLabel={[
                  { id: 'name', label: 'name' },
                  { id: 'category', label: 'category' },
                  { id: 'price', label: 'price' },
                  { id: 'quantity', label: 'quantity' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'options', label: 'Options' },
                ]}
              />


              <TableBody  >
                {product
                  .map((row: any) => (
                    <ProductTableRow
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
                      onDeleteRow={() => handleDeleteUser([row._id])}
                      onRestoreRow={() => handleRestoreUser([row._id])}
                      onTrashRow={() => handleTrashUser([row._id])}
                      onEditRow={(id) => router.push(`/product/${id}/edit`)}
                    />
                  ))}

                {product.length === 0 && (
                  // <TableRow sx={{ width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}   >
                  //   <TableCell colSpan={6}>
                  <TableNoData searchQuery={type === 'trash' ? 'Trash products' : 'Products'} />
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
