// import Tooltip from '@mui/material/Tooltip';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';

// import { Iconify } from 'src/components/iconify';
// import { Box, Icon, Menu, MenuItem } from '@mui/material';
// import { Icons } from 'react-toastify';
// import ApiService from 'src/service/network_service';
// import { ProductFilters } from './product-filters';
// import { useState } from 'react';

// // ----------------------------------------------------------------------

// type ProductTableToolbarProps = {
//     numSelected: number;
//     filterName: string;
//     onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     type: string;
//     idsList: string[];
//     fileterName: string[];

//     onDeleteRow: (id: string[]) => void;
//     onTrashRow: (id: string[]) => void;
//     onRestoreRow: (id: string[]) => void;
// };






// export function ProdcuttableToolbar({ fileterName, numSelected, filterName, onFilterName, type, idsList, onDeleteRow, onRestoreRow, onTrashRow }: ProductTableToolbarProps) {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     // Open the menu when the button is clicked
//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget); // Set the button as anchor for the menu
//     };
//     // Close the menu when clicking outside or on an item
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <Toolbar
//             sx={{
//                 height: 96,
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 p: (theme) => theme.spacing(0, 1, 0, 3),
//                 ...(numSelected > 0 && {
//                     color: 'primary.main',
//                     bgcolor: 'primary.lighter',
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography component="div" variant="subtitle1">
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <OutlinedInput
//                     fullWidth
//                     value={filterName}
//                     onChange={onFilterName}
//                     placeholder="Search user..."
//                     startAdornment={
//                         <InputAdornment position="start">
//                             <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//                         </InputAdornment>
//                     }
//                     sx={{ maxWidth: 320 }}
//                 />
//             )}



//             {numSelected > 0 ? (
//                 type === "trash" ? (
//                     <>

//                         <div>
//                             <Tooltip title="Deete">
//                                 <IconButton onClick={() => onRestoreRow(idsList)}>

//                                     <Iconify icon="mdi:restore" />
//                                 </IconButton>
//                             </Tooltip>

//                             <Tooltip title="Restore">
//                                 <IconButton onClick={() => onDeleteRow(idsList)}>
//                                     <Iconify icon="solar:trash-bin-trash-bold" />
//                                 </IconButton>
//                             </Tooltip>
//                         </div>
//                     </>
//                 ) : (
//                     <Tooltip title="Delete">
//                         <IconButton onClick={() => onTrashRow(idsList)}>
//                             <Iconify icon="solar:trash-bin-trash-bold" />
//                         </IconButton>
//                     </Tooltip>
//                 )
//             ) : (
//                 <>
//                     <Tooltip title="Filter list">
//                         <IconButton onClick={handleClick}>
//                             <Iconify icon="ic:round-filter-list" />
//                         </IconButton>
//                     </Tooltip>

//                     <Menu
//                         anchorEl={anchorEl} // Position the menu relative to the button
//                         open={Boolean(anchorEl)} // Menu is open when anchorEl is not null
//                         onClose={handleClose} // Close the menu on close
//                     >
//                         {/* <MenuItem onClick={() => {


//                         }}>Option 1</MenuItem>
//                         <MenuItem onClick={() => {

//                         }}>Option 2</MenuItem>
//                         <MenuItem onClick={() => { }}>Option 3</MenuItem> */}

//                         {fileterName.map((name) => (
//                             <MenuItem key={name} onClick={() => onFilterName(name)}>
//                                 {name}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                 </>
//             )}

//         </Toolbar>
//     );
// }


// ----------------------------------------------------------------------

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from 'src/components/iconify';
import { Box, Icon, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

interface FilterOption {
    name: string;
    _id: string;
}

type ProductTableToolbarProps = {
    numSelected: number;
    filterName: string;
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    idsList: string[];
    filterOptions: FilterOption[]; // Corrected type
    onDeleteRow: (id: string[]) => void;
    onTrashRow: (id: string[]) => void;
    onRestoreRow: (id: string[]) => void;
    handleFilterOptions: (id: string) => void; // Function passed down to the toolbar to update filter options dynamically
};

export function ProdcuttableToolbar({
    filterOptions,
    numSelected,
    filterName,
    onFilterName,
    type,
    idsList,
    onDeleteRow,
    onRestoreRow,
    onTrashRow,
    handleFilterOptions, // Accept the function to fetch/filter options
}: ProductTableToolbarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Open the menu when the button is clicked
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Set the button as anchor for the menu
    };

    // Close the menu when clicking outside or on an item
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle filter selection
    const handleFilterSelection = (filter: string) => {
        onFilterName({ target: { value: filter } } as React.ChangeEvent<HTMLInputElement>);
        handleClose(); // Close the menu after selection
    };

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

            {numSelected > 0 ? (
                type === 'trash' ? (
                    <>
                        <div>
                            <Tooltip title="Restore">
                                <IconButton onClick={() => onRestoreRow(idsList)}>
                                    <Iconify icon="mdi:restore" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
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
                // <>
                //     <Tooltip title="Filter list">
                //         <IconButton onClick={handleClick}>
                //             <Iconify icon="ic:round-filter-list" />
                //         </IconButton>
                //     </Tooltip>

                //     <Menu
                //         anchorEl={anchorEl} // Position the menu relative to the button
                //         open={Boolean(anchorEl)} // Menu is open when anchorEl is not null
                //         onClose={handleClose} // Close the menu on close
                //     >
                //         {filterOptions.map((option) => (
                //             <MenuItem key={option._id} onClick={function () {
                //                 handleClose();
                //                 return handleFilterOptions(option._id);
                //             }}>
                //                 {option.name}
                //             </MenuItem>
                //         ))}
                //     </Menu>
                // </>
                <>
                    {/* Show the selected filter name and cancel button to reset */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {filterName && (
                            <Typography variant="body2" sx={{ mr: 1 }}>
                                {filterName} {/* Display the selected filter name */}
                            </Typography>
                        )}

                        {filterName && (
                            <IconButton onClick={() => onFilterName({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)} sx={{ p: 0 }}>
                                <Iconify icon="eva:close-circle-fill" sx={{ color: 'text.disabled' }} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Filter icon button */}
                    <Tooltip title="Filter list">
                        <IconButton onClick={handleClick}>
                            <Iconify icon="ic:round-filter-list" />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl} // Position the menu relative to the button
                        open={Boolean(anchorEl)} // Menu is open when anchorEl is not null
                        onClose={handleClose} // Close the menu on close
                    >
                        {filterOptions.map((option) => (
                            <MenuItem
                                key={option._id}
                                onClick={() => handleFilterSelection(option.name)}
                            >
                                {option.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Toolbar>
    );
}
