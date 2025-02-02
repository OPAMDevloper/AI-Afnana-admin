import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Icon } from '@mui/material';
import { Icons } from 'react-toastify';
import ApiService from 'src/service/network_service';

// ----------------------------------------------------------------------

type OrderTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  idsList: string[];

  // pass deledte funtion

  onDeleteRow: (id: string[]) => void;
  onTrashRow: (id: string[]) => void;
  onRestoreRow: (id: string[]) => void;
};






export function OrderTableToolbar({ numSelected, filterName, onFilterName, type, idsList, onDeleteRow, onRestoreRow, onTrashRow }: OrderTableToolbarProps) {



  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search customer..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        type === "trash" ? (
          <>

            <div>
              <Tooltip title="Deete">
                <IconButton onClick={() => onRestoreRow(idsList)}>

                  <Iconify icon="mdi:restore" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Restore">
                <IconButton onClick={() => onDeleteRow(idsList)}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </div>
          </>
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={() => onTrashRow(idsList)}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}

    </Toolbar>
  );
}
