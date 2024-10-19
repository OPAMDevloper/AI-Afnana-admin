import { useState, useCallback, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { CartIcon } from '../product-cart-widget';

import type { FiltersProps } from '../product-filters';
import { Card, TableBody } from '@mui/material';
import { ProdcuttableToolbar } from '../product-table-toolbar';
import { useTable } from 'src/sections/user/view';
import { useRouter } from 'src/routes/hooks';
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

export function ProductsView({ type = 'all' }) {

  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

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


  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const router = useRouter();
  ;
  useEffect(() => {
    // Fetch user data from API
    const fetchUsers = async () => {
      try {
        if (type === 'trash') {
          const response = await new ApiService().get('admin/product/show/trash/all');

          setProduct(response.data.data);
        } else {

          const response = await new ApiService().get('admin/product/all');
          console.log('Response:', response);

          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [type]);

  const dataFiltered: ProductProps[] = applyFilter({
    inputData: product,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });



  const notFound = !dataFiltered.length && !!filterName;



  const handleDeleteUser = async (idss: string[]) => {
    try {
      const response = await new ApiService().delete(`admin/product/delete-many`, { ids: idss });
      console.log('Response:', response);

      if (response.statusCode === 200) {
        toast.success('User deleted successfully');
        setProduct(product.filter((product) => !idss.includes(product._id)));
        setSelectedRow([]);
        table.onResetPage();
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
              <ProductTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={product.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  if (checked) {
                    setSelectedRow(product.map((user: any) => user._id));
                  } else {
                    setSelectedRow([]);
                  }
                  return table.onSelectAllRows(
                    checked,
                    product.map((user: any) => user._id)
                  );
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
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: any) => (
                    <ProductTableRow
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

                          const updatedSelectedRow = [id];
                          handleDeleteUser(updatedSelectedRow); // Pass updated state if needed 

                          return updatedSelectedRow;
                        })
                      }}
                      onEditRow={(id) => {

                        router.push(`/product/${id}/edit`);
                      }}
                      onRestoreRow={(id) => {
                        setSelectedRow((prevSelectedRow) => {
                          const updatedSelectedRow = [id];
                          handleRestoreUser(updatedSelectedRow);
                          return updatedSelectedRow;
                        })
                      }}
                      onTrashRow={(id) => {


                        setSelectedRow((prevSelectedRow) => {
                          const updatedSelectedRow = [id];
                          handleTrashUser(updatedSelectedRow);
                          return updatedSelectedRow;
                        });
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, product.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={product.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>


    </DashboardContent>
  );
}
