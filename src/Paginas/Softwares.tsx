import FooterSection from "../Components/FooterSection/FooterSection";
import CardGrid from "../Components/ProductCard/CardGrid";
import SuscribirseSection from "../Components/SuscribirseSection/SuscribirseSection";
import { useProductStore } from "../store/productStore";



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
