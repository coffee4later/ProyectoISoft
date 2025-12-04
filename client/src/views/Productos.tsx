import { Link, useLoaderData, useFetcher } from "react-router-dom";
import { useEffect } from "react";
import ProductoDetails from "../components/ProductoDetails";
import type { Product } from "../types";

export default function Productos() {
  const productos = useLoaderData() as Product[];
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      // La acción se completó, los datos se han recargado automáticamente
      console.log('Acción completada, datos recargados');
    }
  }, [fetcher.state, fetcher.data]);

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
