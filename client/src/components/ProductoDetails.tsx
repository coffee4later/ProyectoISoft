import {Form, useNavigate,  useFetcher} from 'react-router-dom'
import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductoDetailsProps  ={

    product: Product;
}


export default function ProductoDetails({product}: ProductoDetailsProps) {

    const fetcher = useFetcher();
    const navigate = useNavigate();

    // Mostrar disponibilidad optimista: si hay data pendiente, mostrar el estado toggleado
    const isAvailable = fetcher.formData
        ? !(product.availability)
        : product.availability;

    return (
        <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}

        </td>
        <td className="p-3 text-lg text-gray-800">

            <fetcher.Form method='POST'>
                <button
                type='submit'
                name='id'
                value={product.id}
                disabled={fetcher.state === 'submitting'}
                className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg w-full p-2 uppercase font-bold text-xs text-center border border-black-100 hover:cursor-pointer disabled:opacity-50` }
                >
                    {fetcher.state === 'submitting' ? 'Actualizando...' : (isAvailable ? 'Disponible' : 'No Disponible')}
                </button>
            </fetcher.Form>

        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-3 items-center">
                <button

                onClick={() => navigate(`/producto/${product.id}/editar`)}

                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                >Editar</button>

                <Form
                    className='w-full'
                    method='POST'
                    action={`producto/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Deseas eliminar este producto?')) {
                            e.preventDefault();
                        }
                    }}
                >
                    <input
                    type="submit"
                    value='Eliminar'
                    className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    />
                </Form>

            </div>

        </td>
    </tr>
  )
}
