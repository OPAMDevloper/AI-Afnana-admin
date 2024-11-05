

import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AdminAddEdit from 'src/sections/admin/view/addEdit';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Amdin - ${CONFIG.appName}`}</title>
            </Helmet>

            {/* <UserView type="all" /> */}
            < AdminAddEdit onupdate={() => { }} />

        </>
    );
}
