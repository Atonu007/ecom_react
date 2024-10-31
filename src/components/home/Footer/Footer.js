import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const emailValidation = () => {
    return String(emailInfo)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = async () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setErrMsg(""); 
      setSubscription(true); 

      // Prepare the subscription request
      const subscriptionData = { email: emailInfo };

      try {
        const response = await fetch("https://ecom-django.onrender.com/api/core/subscribe/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscriptionData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Subscription successful:", data);
          setEmailInfo(""); 
        } else {
          const errorData = await response.json();
          setErrMsg(errorData.email ? errorData.email[0] : "Something went wrong. Please try again.");
          setSubscription(false); 
        }
      } catch (error) {
        console.error("Error subscribing:", error);
        setErrMsg("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://ecom-django.onrender.com/api/inventory/categories/list/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${categoryName}`);
  };

  return (
    <div className="w-full bg-[#F5F5F3] pt-10 pb-4 flex flex-col">
      <div className="max-w-container mx-auto flex flex-col md:flex-row justify-between px-4 gap-10">
        <div className="flex-1">
          <FooterListTitle title="More about to be named Shop" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
              ab ullam, numquam nesciunt in.
            </p>
            <ul className="flex items-center gap-2">
              <a href="#" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
            {categories.map(category => (
              <li
                key={category.id}
                className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <FooterListTitle title="Subscribe to our newsletter." />
          <div className="w-full">
            <p className="text-center mb-4">
              A at pellentesque et mattis porta enim elementum.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}
            <div className="border-gray-300 pt-8 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Orebi Shop. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
