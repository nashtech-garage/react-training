import ListComponent from '../../components/List/List.tsx';
import NotFound from '../../404.tsx';

const AdminPage = () => {
    return (
        <>
            <h1>Admin Page</h1>
            <ListComponent component={ <NotFound/>}>
              
            </ListComponent>
        </>
    )
}

export default AdminPage;