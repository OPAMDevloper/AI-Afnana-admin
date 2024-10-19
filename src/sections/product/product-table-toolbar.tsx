import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Box, Icon } from '@mui/material';
import { Icons } from 'react-toastify';
import ApiService from 'src/service/network_service';
import { ProductFilters } from './product-filters';

// ----------------------------------------------------------------------

type ProductTableToolbarProps = {
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






export function ProdcuttableToolbar({ numSelected, filterName, onFilterName, type, idsList, onDeleteRow, onRestoreRow, onTrashRow }: ProductTableToolbarProps) {



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
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                    sx={{ maxWidth: 320 }}
                />
            )}
            {/* <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        canReset={canReset}
                        filters={filters}
                        onSetFilters={handleSetFilters}
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                        onResetFilter={() => setFilters(defaultFilters)}
                        options={{
                            genders: GENDER_OPTIONS,
                            categories: CATEGORY_OPTIONS,
                            ratings: RATING_OPTIONS,
                            price: PRICE_OPTIONS,
                            colors: COLOR_OPTIONS,
                        }}
                    />

                    <ProductSort
                        sortBy={sortBy}
                        onSort={handleSort}
                        options={[
                            { value: 'featured', label: 'Featured' },
                            { value: 'newest', label: 'Newest' },
                            { value: 'priceDesc', label: 'Price: High-Low' },
                            { value: 'priceAsc', label: 'Price: Low-High' },
                        ]}
                    />
                </Box>
            </Box> */}


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
