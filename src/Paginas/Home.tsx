import Hero from '../Components/HeroSection/Hero'
import BestSellers from '../Components/BestSellersSection/BestSellers'
import InfoExtras from '../Components/ProductCard/InfoExtraSection/InfoExtrasSection'
import ResenaSection from '../Components/ResenaSection/ResenaSection'
import SuscribirseSection from '../Components/SuscribirseSection/SuscribirseSection'
import FooterSection from '../Components/FooterSection/FooterSection'


export const Home = () => {
  return (
    <>   
    < Hero />
    <div className='container mx-auto'>
        <BestSellers />
        
    </div>
    <InfoExtras />
    <div className='container mx-auto'>
        <ResenaSection />
        <SuscribirseSection />

    </div>
    <FooterSection />
    </>
  )
}
