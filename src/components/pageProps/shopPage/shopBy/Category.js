import React, { useEffect, useState } from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = ({ onSelectSubcategory }) => {
  const [categories, setCategories] = useState([]);
  const [showSubCat, setShowSubCat] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://ecom-django.onrender.com/api/inventory/categories/list/");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
        
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubCatToggle = (categoryId) => {
    setShowSubCat((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.length === 0 ? (
            <li>No categories available</li>
          ) : (
            categories.map(({ id, name, subcategories }) => (
              <li key={id} className="border-b-[1px] border-b-[#F0F0F0] pb-2">
                <div className="flex items-center justify-between">
                  <span onClick={() => handleSubCatToggle(id)} className="cursor-pointer">
                    {name}
                  </span>
                  <span
                    onClick={() => handleSubCatToggle(id)}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    {showSubCat[id] ? <ImMinus /> : <ImPlus />}
                  </span>
                </div>
                {showSubCat[id] && subcategories.length > 0 && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {subcategories.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => {
                          onSelectSubcategory(sub.id); 
                          console.log("Selected Subcategory ID:", sub.id); 
                        }}
                        className="text-sm text-gray-500 cursor-pointer hover:text-black duration-200"
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Category;
