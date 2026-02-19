import Hero from '../Components/HeroSection/Hero'
import BestSellers from '../Components/BestSellersSection/BestSellers'
import InfoExtras from '../Components/ProductCard/InfoExtraSection/InfoExtrasSection'
import ResenaSection from '../Components/ResenaSection/ResenaSection'
import SuscribirseSection from '../Components/SuscribirseSection/SuscribirseSection'
import FooterSection from '../Components/FooterSection/FooterSection'
import { useProductStore } from '../store/productStore'
import { useEffect } from 'react'

export const Home = () => {
  const {productos ,fetchProductos } = useProductStore();
  useEffect(() => {
      fetchProductos();
      
      }, [])
  
      console.log( "Productos en homeTsx desde store",productos)


  

  return (
    <>   
    < Hero />
    <div className='container mx-auto'>

       <BestSellers products={productos} /> 
        
    </div>
    <InfoExtras />
    <div className='container mx-auto'>
        <ResenaSection />
        <SuscribirseSection />

    </div>

    <FooterSection className='pt-50' />
    </>
  )
}
