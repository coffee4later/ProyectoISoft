import { Link, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import { Form } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductoById, updateProducto } from "../services/ProductosService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}: LoaderFunctionArgs) {
    console.log(params.id);
    if(params.id!==undefined){
      const producto=await getProductoById(+params.id);
      if(!producto){
        return redirect('/');
      }
      return producto;

    }
    return {}

}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request, params}: ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData());
    let error = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
        console.log(error)

    }
    if (error.length){
        return error
    }
    if(params.id!==undefined){
      try {
        await updateProducto(data, +params.id);
        return redirect('/');
      } catch (err) {
        console.error('Error en acción de actualizar:', err);
        return 'Error al actualizar el producto';
      }
    }
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]
export default function EditProducto() {
    const producto = useLoaderData() as Product
    const error = useActionData() as string
    console.log(error)
    return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Editar Productos
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}


      <Form className="mt-10"
      method='POST'
      >
        <ProductForm
          producto={producto}
        />
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="availability"
            >Disponibilidad:</label>
            <select
                id="availability"
                className="mt-2 block w-full p-3 bg-gray-50"
                name="availability"
                defaultValue={producto?.availability.toString()}
            >
                {availabilityOptions.map(option => (
                  <option key={option.name} value={option.value.toString()}>{option.name}</option>
                ))}
            </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
