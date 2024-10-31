import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null); 

  useEffect(() => {
    if (location.state && location.state.item) {
      setProductInfo(location.state.item);
      setPrevLocation(location.pathname);
    }
  }, [location]);


  if (!productInfo) {
    return <div>Loading...</div>; 
  }

  const BASE_URL = "http://127.0.0.1:8000"; 


  const imageSrc =
    productInfo.img.startsWith("http") 
      ? productInfo.img
      : `${BASE_URL}${productInfo.img}`;

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={imageSrc}
              alt={productInfo.productName}
              onError={(e) => {
                e.target.src = 'path/to/fallback/image.jpg';
                e.target.alt = 'Image not available'; 
              }}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
