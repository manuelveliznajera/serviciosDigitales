import Hero from '../Components/HeroSection/Hero'
import BestSellers from '../Components/BestSellersSection/BestSellers'
import InfoExtras from '../Components/ProductCard/InfoExtraSection/InfoExtrasSection'
import ResenaSection from '../Components/ResenaSection/ResenaSection'
import SuscribirseSection from '../Components/SuscribirseSection/SuscribirseSection'
import FooterSection from '../Components/FooterSection/FooterSection'
import { Product } from '../Interfaces/Product';
import { useProductStore } from '../store/productStore'
import { useEffect, useState } from 'react'
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
  }]
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
