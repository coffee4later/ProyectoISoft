import {safeParse, transform, number, parse, pipe, unknown} from 'valibot';
import axios from 'axios';
import { DraftProductoSchema, ProductosSchema ,type Product, ProductoSchema} from "../types";
import { toBoolean } from '../utils';

type ProductoData = {
    [k: string]: FormDataEntryValue;
}

export async function addProducto(data: ProductoData) {
    try {
        const result = safeParse(DraftProductoSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url =`${import.meta.env.VITE_API_URL}/productos`;
            const {data} = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            console.log('Producto agregado:', data);
        }else{
            throw new Error('Datos de producto inválidos');
        }
    } catch (error) {
        console.log('Error al agregar el producto:', error);
    }
}
export async function getProductos() {
    try {
        const url =`${import.meta.env.VITE_API_URL}/productos`;
        const {data} = await axios(url);
        const result = safeParse(ProductosSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error de validación de productos');
        }
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        return [];
    }
}

export async function getProductoById(id:Product['id']) {
    try {
        const url =`${import.meta.env.VITE_API_URL}/productos/${id}`;
        const {data} = await axios(url);
        const result = safeParse(ProductoSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error de validación de productos');
        }
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        return [];
    }
}

export async function updateProducto(data: ProductoData, id: Product['id']) {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const NumberSchema = pipe(unknown(), transform((v) => Number(v)), number())

        const result = safeParse(DraftProductoSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        console.log(result);
        if (result.success) {
            const url =`${import.meta.env.VITE_API_URL}/productos/${id}`;
            await axios.put(url, result.output);
        }

    } catch (error) {
        console.log('Error al actualizar el producto:', error);
    }


}

export async function deleteProducto(id: Product['id']) {
    try {

        const url =`${import.meta.env.VITE_API_URL}/productos/${id}`;
        await axios.delete(url);

    } catch (error) {
        console.log('Error al eliminar el producto:', error);

    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url =`${import.meta.env.VITE_API_URL}/productos/${id}`
        const res = await axios.patch(url);
        console.log(res);

    } catch (error) {
        console.log('Error al actualizar la disponibilidad del producto:', error);
    }

}