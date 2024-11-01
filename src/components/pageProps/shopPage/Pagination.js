import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";


function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          const imgUrl = `https://ecom-django.onrender.com${item.img}`; 
          return (
            <div key={item.id} className="w-full">
              <Product
                _id={item.id}
                img={imgUrl}
                productName={item.productName}
                price={item.price}
                color={item.color}
                badge={item.badge}
                des={item.des}
                brand={item.brand}
                stock={item.stock}
              />
            </div>
          );
        })}
    </>
  );
}

const Pagination = ({
  itemsPerPage,
  selectedSubcategory,
  selectedBrand,
  selectedPriceRange,
  setBrands,
  sortOption,
  category, 
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
       
        const url = category
          ? `https://ecom-django.onrender.com/api/inventory/categories/list/${category}/`
          : "https://ecom-django.onrender.com/api/inventory/products/list/";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        
        setProducts(data);
        setFilteredProducts(data); 

        // Extract unique brands from fetched products and set them
        const uniqueBrands = [...new Set(data.map((product) => product.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setBrands, category]); 

  
  useEffect(() => {
    let updatedFilteredProducts = products;

  
    if (selectedSubcategory) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    if (selectedBrand) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    const [minPrice, maxPrice] = selectedPriceRange;
    updatedFilteredProducts = updatedFilteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

  
    if (sortOption === "Best Sellers") {
    
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.badge === true 
      );
    } else if (sortOption === "New Arrival") {
      updatedFilteredProducts.sort((a, b) => {
        const dateA = new Date(a.date_added); 
        const dateB = new Date(b.date_added);
        return dateB - dateA; 
      });
    } else if (sortOption === "Price Low to High") {
      updatedFilteredProducts.sort((a, b) => a.price - b.price); 
    } else if (sortOption === "Price High to Low") {
      updatedFilteredProducts.sort((a, b) => b.price - a.price);
    }


    setFilteredProducts(updatedFilteredProducts);
    setItemOffset(0); 
  }, [
    selectedSubcategory,
    selectedBrand,
    selectedPriceRange,
    products,
    sortOption,
  ]);

  
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>

      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to {Math.min(endOffset, filteredProducts.length)} of {filteredProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
