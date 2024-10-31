import React from "react";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({ itemsPerPageFromBanner, onSortChange, currentSortOption, currentItemsPerPage }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">

        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label htmlFor="sort-options" className="block">Sort by:</label>
          <select
            onChange={(e) => onSortChange(e.target.value)} 
            id="sort-options"
            value={currentSortOption} 
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="">Select Sorting</option> 
            <option value="Best Sellers">Best Sellers</option>
            <option value="New Arrival">New Arrival</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label htmlFor="items-per-page" className="block">Show:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)} 
            id="items-per-page"
            value={currentItemsPerPage} 
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
