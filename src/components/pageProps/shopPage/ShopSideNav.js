import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";

const ShopSideNav = ({ onSelectSubcategory, brands, onSelectBrand, onSelectPriceRange, onResetFilters }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      
      <Category onSelectSubcategory={onSelectSubcategory} icons={false} />
      <Brand brands={brands} onSelectBrand={onSelectBrand} />
      <Price onSelectPriceRange={onSelectPriceRange} />
      <button onClick={onResetFilters} className="bg-blue-500 text-white py-2 px-4 rounded">
        Reset Filter
      </button>
    </div>
  );
};

export default ShopSideNav;
