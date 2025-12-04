import { Link, useLoaderData } from "react-router-dom";
import ProductoDetails from "../components/ProductoDetails";
import type { Product } from "../types";

export default function Productos() {
  const productos = useLoaderData() as Product[];

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
        <Link
          to='/producto/nuevo'
          className='rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500'
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <ProductoDetails key={producto.id} product={producto} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
