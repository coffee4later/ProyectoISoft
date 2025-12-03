import { number, object, string } from 'valibot';
export const DraftProductoSchema = object({
    name: string(),
    price: number(),
})