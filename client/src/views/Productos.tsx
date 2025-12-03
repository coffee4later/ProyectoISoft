import React from 'react'
import {Link} from 'react-router-dom'
export default function Productos() {
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
    </>
  )
}
