import {safeParse} from 'valibot';
import axios from 'axios';
import { DraftProductoSchema } from "../types";

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
        }else{
            throw new Error('Datos de producto inválidos');
        }
    } catch (error) {
        console.log('Error al agregar el producto:', error);
    }
}