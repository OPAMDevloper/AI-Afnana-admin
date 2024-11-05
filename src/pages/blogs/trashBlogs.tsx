import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlogView } from 'src/sections/blog/view';
import { BlogsView } from 'src/sections/blogs/view/blogs-view';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Blog - ${CONFIG.appName}`}</title>
            </Helmet>

            <BlogsView type='trash' />
        </>
    );
}
