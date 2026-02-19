import ProductCard from '../Components/ProductCard/ProductCard';
import SuscribirseSection from '../Components/SuscribirseSection/SuscribirseSection';
import FooterSection from '../Components/FooterSection/FooterSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';

export const ProductoDetalle = () => {
     const { id } = useParams<{ id: string }>();
  const productos = useProductStore((state) => state.productos);
  console.log(productos,"productos del store");
  const [producto, setProducto] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducto = async () => {
      if (!id) return;

      // buscar en el store primero
      const encontrado = productos.find((p) => String(p.id) === id);

      if (encontrado) {
        setProducto(encontrado);
      } else {
        // si no está en el store, podrías llamar a getProductoById del store
        // const resultado = await getProductoById(id);
        // setProducto(resultado);
        console.warn(`Producto con id ${id} no encontrado en el store`);
      }
    };

    fetchProducto();
  }, [id, productos]);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }
   
  return (
    
        <>
          <div className="container mx-auto py-16">
            <div className="flex justify-between  mb-8">
              <div className="w-1/2">
              
               
                <img src={producto.urlImage} alt={producto.altName} className="w-full h-[80vh] object-contain" />
              </div>
              <div className="w-1/2 pl-8">
              <span className="text-xl text-gray-500">SKU: {producto.id}</span> 
                <h1 className="text-4xl font-bold mb-4">{producto.productName}</h1>
                <p className="text-2xl text-blue-600 mb-4">{producto.discountedPrice}</p>
                <p className="text-gray-500 line-through mb-4">{producto.originalPrice}</p>
                <button className="bg-[#0098DB] text-white py-2 px-4 rounded-full mb-4 mt-5">Añadir Al Carrito</button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full mt-14 mb-14 ml-4" >Comprar Ahora</button>
                <ul className="mt-4">
               
                  <li>Empresa: Microsoft</li>
                  <li>Tipo de Entrega: Email</li>
                  <li>Sistema Operativo: Windows</li>
                  <li>Límite de Activación: 1 PC</li>
                </ul>

                <div>
                <img src="/img/iconosProductoDetalle.png" alt="Garantía" className="w-90 h-auto mt-10" />
              </div>
              </div>
              
            </div>
            <h2 className="text-3xl font-bold mb-8">Productos sugeridos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productos.map((product, index) => (
                console.log(product.id),
                <ProductCard
                  key={index}
                  id={product.id}
                  urlImage={product.urlImage}
                  altName={product.altName}
                  productName={product.productName}
                  originalPrice={product.originalPrice}
                  discountedPrice={product.discountedPrice}
                />
              ))}
            </div>
          </div>
          <SuscribirseSection />
          <FooterSection />
        </>
   
  )
}
