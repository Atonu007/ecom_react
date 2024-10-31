import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = ({ brands, onSelectBrand }) => { 
  const [showBrands, setShowBrands] = useState(true);

  

  return (
    <div>
      <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer">
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands && brands.length > 0 ? (
              brands.map((item) => (
                <li
                  key={item} 
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
                  onClick={() => onSelectBrand(item)} 
                >
                  {item} 
                </li>
              ))
            ) : (
              <li className="text-gray-500">No brands available</li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
