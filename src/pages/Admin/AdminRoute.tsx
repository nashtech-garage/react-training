import type { RouteObject } from 'react-router';
import AdminPage from './AdminPage.tsx';
import { requireStaff } from '../../shared/StaffRequire.ts';

async function pageLoader({request}: { request: Request }) {
    const res = await requireStaff(request);
    return res ? res : null;
}

const adminRoutes: RouteObject[] = [
    {
        loader: pageLoader,
        path: 'admin',
        element: <AdminPage/>
    }
]


export default adminRoutes;