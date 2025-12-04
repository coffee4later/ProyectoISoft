import { Link, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProducto } from "../services/ProductosService";
import ProductForm from "../components/ProductForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}: ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData());
    let error = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
        console.log(error)

    }
    if (error.length){
        return error
    }
    await addProducto(data);
    return redirect('/');
}
export default function NewProducto() {
    const error = useActionData() as string
    console.log(error)
    return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Productos
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
        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
