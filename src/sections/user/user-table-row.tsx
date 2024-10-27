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

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { fToNow } from 'src/utils/format-time';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export type UserProps = {
  _id: string;
  name: string;
  status: string;
  profileImage: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
};

type UserTableRowProps = {
  row: UserProps;
  type: string;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: (id: string) => void;
  onRestoreRow: (id: string) => void;
  onEditRow: (id: string) => void;
  onTrashRow: (id: string) => void;

};



export function UserTableRow({ row, type, selected, onSelectRow, onDeleteRow, onRestoreRow, onEditRow, onTrashRow }: UserTableRowProps) {
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


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {/* <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={import.meta.env.VITE_APP_BASE_URL + '/' + row.profileImage || ''} />
            <a onClick={() => router.push(`/profile/${row._id}`)} style={{ cursor: 'pointer' }}>
              {row.name}
            </a>
          </Box> */}
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={`${import.meta.env.VITE_APP_BASE_URL}/${row.profileImage || ''}`} />
            <button
              type="button" // Added type attribute
              onClick={() => router.push(`/profile/${row._id}`)}
              style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'inherit', font: 'inherit' }}
              aria-label={`View profile of ${row.name}`} // Accessible label
            >
              {row.name}
            </button>
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{fToNow(row?.createdAt)}</TableCell>

        <TableCell align="center">
          {row.status === 'active' ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            // inacitve status
            <Iconify width={22} icon="solar:close-circle-bold" sx={{ color: 'error.main' }} />
          )}
        </TableCell>

        {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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
