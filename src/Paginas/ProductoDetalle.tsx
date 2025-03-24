import ProductCard from '../Components/ProductCard/ProductCard';
import SuscribirseSection from '../Components/SuscribirseSection/SuscribirseSection';
import FooterSection from '../Components/FooterSection/FooterSection';
import { Product } from '../Interfaces/Product';
import { useParams } from 'react-router-dom';

const products: Product[] = [
    {
      id: "1",
      urlImage: "/img/soft/Office2021.png",
      altName: "Office Professional Plus 2021",
      productName: "Office Professional Plus 2021",
      originalPrice: "Q295",
      discountedPrice: "Q115",
    },
    {
      id: "2",
      urlImage: "/img/soft/Windows11Pro.png",
      altName: "Microsoft Windows 11 Pro",
      productName: "Microsoft Windows 11 Pro",
      originalPrice: "Q150",
      discountedPrice: "Q80",
    },
    {
      id: "3",
      urlImage: "/img/soft/Internet.png",
      altName: "ESET Internet Security",
      productName: "ESET Internet Security",
      originalPrice: "Q195",
      discountedPrice: "Q90",
    },
    {
      id: "4",
      urlImage: "/img/soft/Civil3D.png",
      altName: "Civil 3D",
      productName: "Autodesk Civil 3D",
      originalPrice: "Q325",
      discountedPrice: "Q180",
    }
];
export const ProductoDetalle = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    const product = products.find((product) => product.id === id);
    if (!product) {
        return <div>Producto no encontrado</div>;
      }
      console.log(product)
  return (
    
        <>
          <div className="container mx-auto py-16">
            <div className="flex justify-between items-center mb-8">
              <div className="w-1/2">
                <img src={product.urlImage} alt={product.altName} className="w-full" />
              </div>
              <div className="w-1/2 pl-8">
                <h1 className="text-4xl font-bold mb-4">{product.productName}</h1>
                <p className="text-2xl text-blue-600 mb-4">Q115</p>
                <p className="text-gray-500 line-through mb-4">Q295</p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full mb-4">Añadir Al Carrito</button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full">Comprar Ahora</button>
                <ul className="mt-4">
                  <li>Empresa: Microsoft</li>
                  <li>Tipo de Entrega: Email</li>
                  <li>Sistema Operativo: Windows</li>
                  <li>Límite de Activación: 1 PC</li>
                </ul>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-8">Productos sugeridos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
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
