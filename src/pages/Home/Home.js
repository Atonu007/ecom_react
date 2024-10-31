import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/inventory/products/list/");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Filter for new arrivals
        const filteredNewArrivals = data.filter(product => {
          const dateAdded = new Date(product.date_added);
          const today = new Date();
          const daysSinceAdded = Math.floor((today - dateAdded) / (1000 * 60 * 60 * 24));
          return daysSinceAdded <= 30; 
        });

        // Sort new arrivals by date_added in descending order
        filteredNewArrivals.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
        setNewArrivals(filteredNewArrivals);

        // Filter for best sellers (based on badge property)
        const filteredBestSellers = data.filter(product => product.badge === true);
        setBestSellers(filteredBestSellers);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <NewArrivals products={newArrivals} /> 
        <BestSellers products={bestSellers} /> 
        <YearProduct />
      </div>
    </div>
  );
};

export default Home;
