import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image"; 
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const {
    productName,
    img,  
    badge,
    price,
    color,
    _id
  } = props;

  const rootId = productName.toLowerCase().replace(/\s+/g, "");

 
  const imageUrl = img; 



  const handleAddToCart = () => {
    dispatch(addToCart({
      _id,
      name: productName,
      quantity: 1,
      image: imageUrl,
      badge,
      price,
      colors: color,
    }));
  };

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: props },
    });
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-hidden"> 
        <div className="relative w-full h-64"> 
          <Image
            className="w-full h-full object-cover" 
            imgSrc={imageUrl}
          />
        </div>
        <div className="absolute top-6 left-8">
          {badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{productName}</h2>
          <p className="text-[#767676] text-[14px]">${price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
