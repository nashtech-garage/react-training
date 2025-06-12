import type { RouteObject } from 'react-router';
import AdminPage from './AdminPage.tsx';

const adminRoutes: RouteObject[] = [
    {
        path: 'admin',
        element: <AdminPage/>
    }
]


export default adminRoutes;