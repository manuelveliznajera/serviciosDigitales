import FooterSection from "../Components/FooterSection/FooterSection";
import CardGrid from "../Components/ProductCard/CardGrid";
import SuscribirseSection from "../Components/SuscribirseSection/SuscribirseSection";
import { Product } from "../Interfaces/Product";
import { useProductStore } from "../store/productStore";

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
  },
];

interface SoftwaresProps {
  role: string | null; // Define el tipo de la prop role
}

export const Softwares: React.FC<SoftwaresProps> = ({ role }) => {

 const {productos} = useProductStore();

console.log(productos , "productos en softwares")
  return (
    <>
      <div className="container mx-auto py-20">
        <h2 className="text-3xl font-bold mb-20">Softwares</h2>
        <CardGrid products={productos} />
      </div>
    
       
     
      {role=='Administrador' ? null :  <div className="container mx-auto"> <SuscribirseSection />
       <FooterSection className="pt-50" /></div>}
      
    </>
  );
};
