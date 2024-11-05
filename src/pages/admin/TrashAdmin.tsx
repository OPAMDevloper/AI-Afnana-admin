import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AdminsView } from 'src/sections/admin/view';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>
      <AdminsView type='trash' />
    </>
  );
}
