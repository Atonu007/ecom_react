import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]); 
  const [brands, setBrands] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState(null); 
  const location = useLocation(); 

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl); 
    } else {
      setCategory(null); 
    }
  }, [location]);

  // Update items per page
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  // Handle subcategory selection
  const handleSelectSubcategory = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedBrand(null);
    setSelectedPriceRange([0, Infinity]);
  };

  // Handle brand selection
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedSubcategory(null);
    setSelectedPriceRange([0, Infinity]);
  };

  // Handle price range selection
  const handleSelectPriceRange = (priceOne, priceTwo) => {
    setSelectedPriceRange([priceOne, priceTwo]);
    setSelectedBrand(null);
    setSelectedSubcategory(null);
  };

  // Handle sort option changes
  const handleSortChange = (selectedSortOption) => {
    setSortOption(selectedSortOption);
  };

  // Reset filters function
  const resetFilters = () => {
    setSelectedSubcategory(null);
    setSelectedBrand(null);
    setSelectedPriceRange([0, Infinity]); 
    setSortOption(""); 
    setCategory(null); 
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Product" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav 
            onSelectSubcategory={handleSelectSubcategory} 
            brands={brands} 
            onSelectBrand={handleSelectBrand} 
            onSelectPriceRange={handleSelectPriceRange} 
            onResetFilters={resetFilters} 
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner 
            itemsPerPageFromBanner={itemsPerPageFromBanner} 
            onSortChange={handleSortChange} 
            currentSortOption={sortOption}
          />
          <Pagination 
            itemsPerPage={itemsPerPage} 
            selectedSubcategory={selectedSubcategory} 
            selectedBrand={selectedBrand} 
            selectedPriceRange={selectedPriceRange} 
            setBrands={setBrands} 
            sortOption={sortOption} 
            category={category} 
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
