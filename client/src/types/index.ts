import { array, boolean, number, object, string, Output} from 'valibot';


export const DraftProductoSchema = object({
    name: string(),
    price: number(),
    availability: boolean(),
})

export const ProductoSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
})
export const ProductosSchema = array(ProductoSchema);
export type Product = Output<typeof ProductoSchema>;