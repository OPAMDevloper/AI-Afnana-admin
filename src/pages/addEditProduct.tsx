

import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';
import ProductAddEdit from 'src/sections/product/view/addEdit';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Users - ${CONFIG.appName}`}</title>
            </Helmet>

            {/* <UserView type="all" /> */}
            < ProductAddEdit />

        </>
    );
}