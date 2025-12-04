
import { deleteProducto, getProductos, updateProductAvailability } from "../services/ProductosService";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  try{
  console.log('se ejecuta')
  const data = Object.fromEntries(await request.formData());
  console.log(data)
  await updateProductAvailability(data.id);}
  catch(e){
    console.log(e);
  }
  console.log()
  return {};
}

export async function loader() {
  return getProductos();
}

export async function action2({params}: ActionFunctionArgs){
    if(params.id!==undefined) {

        await deleteProducto(+params.id );

        return redirect('/');

    }
}
