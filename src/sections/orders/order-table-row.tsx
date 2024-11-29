import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { Alert, FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import ApiService from 'src/service/network_service';
import { toast } from 'react-toastify';
import { fDateTime, fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export type OrdersProps = {
  _id: string;
  name: string;
  products: [
    {
      productId: {
        name: string,
        image: string,
      },
      quantity: number
    }];
  status: string;
  userId: {
    name: string
  };
  orders: string;
  amount: string;
  address: string;
  createdAt: string;
};

type OrderTableRowProps = {
  row: OrdersProps;
  type: string;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: (id: string) => void;
  onRestoreRow: (id: string) => void;
  onEditRow: (id: string) => void;
  onStatusChanged: (updatedStatus: string, orderId: string) => void;
  onTrashRow: (id: string) => void;
};

export function OrderTableRow({ row, type, selected, onSelectRow, onDeleteRow, onRestoreRow, onEditRow, onTrashRow, onStatusChanged }: OrderTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDeleteRow(row._id); // Call the passed delete function
    }
    handleClosePopover();
  }, [row._id, onDeleteRow, handleClosePopover]);



  const handleStatus = async (id: any, status: any) => {
    try {
      const response = await new ApiService().post(`admin/order/update/${id}`, { 'status': status });
      row.status = status
      onStatusChanged(status, id);
      toast.success('Status updated successfully');
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row._id} src={import.meta.env.VITE_APP_BASE_URL + '/' + row.products[0].productId.image || ''} />
            <a onClick={() => router.push(`/order/${row._id}/show`)} style={{ cursor: 'pointer' }}>
              {row.products[0].productId.name}
            </a>
          </Box>
        </TableCell>

        <TableCell>{row.userId?.name}</TableCell>

        <TableCell>{row.amount}</TableCell>

        <TableCell>{row.products[0].quantity}</TableCell>

        <TableCell>{row.amount}</TableCell>

        {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}


        { /* make a drop down status for orders -> pending, shipped, delivered */}
        <TableCell>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={row.status}
              onChange={(value) => {
                handleStatus(row._id, value.target.value)
              }} // Handle status change
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="completed ">Completed</MenuItem>
            </Select>
          </FormControl>
        </TableCell>

        <TableCell>{fDateTime(row.createdAt)}</TableCell>


      </TableRow>



      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => (type === 'trash' ? onRestoreRow(row._id) : onEditRow(row._id))}>

            <Iconify icon="solar:pen-bold" />
            {type === 'trash' ? 'Restore' : 'Edit'}
          </MenuItem>

          <MenuItem onClick={() => (type === 'trash' ? onDeleteRow(row._id) : onTrashRow(row._id))} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
