import { useEffect } from 'react'
import { AddProduct } from '../../Components/Product/AddProduct'
import { ListProduct } from '../../Components/Product/ListProduct';
import { useProductStore } from '../../store/productStore';

export const ProductPage = () => {
  const { productosDb, fetchProductos } = useProductStore();

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <div className='flex' >
      <AddProduct />
      <ListProduct productos={productosDb} fetchProductos={fetchProductos} />
    </div>
  );
}
