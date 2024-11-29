import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import type { PostItemProps } from '../blog/post-item';
import { useEffect, useState } from 'react';
import ApiService from 'src/service/network_service';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};



export function AnalyticsNews({ title, subheader, ...other }: Props) {

  const [list, setList] = useState([]);

  useEffect(() => {

    const getData = async () => {
      const response = await new ApiService().get('admin/blog/recent');
      // const data = await response.json();

      setList(response.data);
    };

    getData();
  }, []);




  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 405 }}>
        <Box sx={{ minWidth: 640 }}>
          {list.map((data: any) => (
            <PostItem key={data._id} item={data} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function PostItem({ sx, item, ...other }: BoxProps & { item: any }) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 1,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={import.meta.env.BASE_URL + '/' + item.image}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        sx={{ width: '10 ' }}
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: 'span' }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(item.createdAt)}
      </Box>
    </Box>
  );
}
