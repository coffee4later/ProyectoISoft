import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Productos from './views/Productos';
import NewProducto, {action as newProductoAction} from './views/NewProducto';

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children : [
            {
                index : true,
                element: <Productos/>
            },
            {
                path : 'producto/nuevo',
                element : <NewProducto/>,
                action : newProductoAction
            }
        ]
    },
])