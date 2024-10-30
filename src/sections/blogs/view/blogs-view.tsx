

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
import { BlogsTableRow } from '../blogs-table-row';
import { BlogsTableHead } from '../blogs-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { BlogsTableToolbar } from '../blogs-table-toolbar';
import { getComparator } from '../utils';
import type { BlogsProps } from '../blogs-table-row';

interface PaginationData {
  totalItems: number;
  count: number;
  page: number;
  totalPages: number;
  isNextPage: boolean;
  isPrevPage: boolean;
}

export function BlogsView({ type }: { type: string }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');
  const [blogs, setBlogs] = useState<BlogsProps[]>([]);
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

  const fetchBlogs = async (pageNum: number, limit: number) => {
    try {
      var endpoint = type === 'trash'
        ? 'admin/blog/show/trash/all'
        : 'admin/blog/all';

      const params = new URLSearchParams({
        page: (pageNum + 1).toString(),
        count: limit.toString(),
        // sort: `${order === 'desc' ? '-' : ''}${orderBy}`,
        // search: filterName,
      });


      const search = filterName ? `&search=${filterName}` : '';

      const response = await new ApiService().get(`${endpoint}?${params}${search}`);

      setBlogs(response.data.data);
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
    fetchBlogs(page, rowsPerPage);
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
      const response = await new ApiService().delete('admin/blog/delete-many', { ids });
      if (response.statusCode === 200) {
        toast.success('Blogs deleted successfully');
        fetchBlogs(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error deleting Blogs:', error);
      toast.error('Error deleting Blogs');
    }
  };

  const handleRestoreUser = async (ids: string[]) => {
    try {
      const response = await new ApiService().post('admin/blog/restore-many', { ids });
      if (response.statusCode === 200) {
        toast.success('Blogs restored successfully');
        fetchBlogs(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error restoring Blogs:', error);
      toast.error('Error restoring Blogs');
    }
  };

  const handleTrashUser = async (ids: string[]) => {
    try {
      const response = await new ApiService().post('admin/blog/trash-many', { ids });
      if (response.statusCode === 200) {
        toast.success('Blogs trashed successfully');
        fetchBlogs(page, rowsPerPage);
        setSelectedRow([]);
      }
    } catch (error) {
      console.error('Error trashing Blogs:', error);
      toast.error('Error trashing Blogs');
    }
  };

  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {type === 'trash' ? 'Trash' : 'Blogs'}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          {type === 'trash' ? 'Restore' : 'New Blog'}
        </Button>
      </Box>


      <Card>
        <BlogsTableToolbar
          numSelected={selectedRow.length}
          filterName={filterName}
          idsList={selectedRow}
          type={type}
          onDeleteRow={handleDeleteUser}
          onRestoreRow={handleRestoreUser}
          onTrashRow={handleTrashUser}
          onFilterName={(data) => {
            handleFilterName(data);
          }}
        />

        <Scrollbar>
          <TableContainer className="overflow-unset">
            <Table>
              <BlogsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={blogs.length}
                numSelected={selectedRow.length}
                onSort={handleSort}
                onSelectAllRows={(checked) => {
                  const newSelected = checked ? blogs.map(user => user._id) : [];
                  setSelectedRow(newSelected);
                }}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'description' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'options', label: 'Options' },
                ]}
              />
              <TableBody>
                {blogs.map((row) => (
                  <BlogsTableRow
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
                    onEditRow={() => router.push(`/blog/${row._id}/edit`)}
                  />
                ))}

                {blogs.length === 0 && (
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