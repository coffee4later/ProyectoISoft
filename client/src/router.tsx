import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Productos from './views/Productos';

import NewProducto, {action as newProductoAction} from './views/NewProducto';
import EditProducto, {loader as editProductoLoader, action as editProductAction} from './views/EditProducto';
import { action2 as deleteProductAction,loader as productosLoader, action as updateAvailabilityAction } from './routes/productos.server';


export const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children : [
            {
                index : true,
                element: <Productos/>,
                loader: productosLoader,
                action: updateAvailabilityAction
            },
            {
                path : 'producto/nuevo',
                element : <NewProducto/>,
                action : newProductoAction
            },
            {
                path : 'producto/:id/editar',//ROA pattern
                element : <EditProducto/>,
                loader : editProductoLoader,
                action : editProductAction
            },
            {
                path : 'producto/:id/eliminar',//ROA pattern
                action: deleteProductAction
            }
        ]
    },
])