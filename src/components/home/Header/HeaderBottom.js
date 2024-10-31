import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logo } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import { clearUserInfo } from "../../../redux/orebiSlice"; 

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/inventory/search_products/?query=${searchQuery}`);
          if (response.ok) {
            const data = await response.json();
            setFilteredProducts(data);
            setShowSearchResults(true);
          } else {
            console.error("Failed to fetch products");
            setFilteredProducts([]);
            setShowSearchResults(false);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setFilteredProducts([]);
          setShowSearchResults(false);
        }
      };
      fetchProducts();
    } else {
      setFilteredProducts([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  


  const handleLogout = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    console.log("logout rt: ", refreshToken);
  
    if (!refreshToken) {
      console.error("No refresh token found");
      setErrorMsg("Session expired. Please log in again.");
      navigate("/signin");
      return;
    }
  
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("logout at: ", accessToken);
  
    if (!accessToken) {
      console.error("No access token found");
      setErrorMsg("Session expired. Please log in again.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/core/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Token is expired, redirect to login
          setErrorMsg("Session expired. Please log in again.");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.error("Logout failed with status:", response.status, "Response:", errorData);
          setErrorMsg("Logout failed. Please try again.");
        }
        return;
      }
  
      // Clear tokens and redirect
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setErrorMsg("An error occurred while logging out. Please try again.");
    }
  };
  
  
  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Logo */}
          <Link to="/">
            <Image className="w-20 object-cover" imgSrc={logo} />
          </Link>

          <div>
            <motion.ul className="flex items-center w-auto z-50 p-0 gap-2">
              {navBarList.map(({ _id, title, link }) => (
                <NavLink
                  key={_id}
                  className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                  to={link}
                  state={{ data: location.pathname.split("/")[1] }}
                >
                  <li>{title}</li>
                </NavLink>
              ))}
            </motion.ul>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {showSearchResults && filteredProducts.length > 0 && (
              <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/product/${item.productName.toLowerCase().replace(/\s+/g, '')}`, {
                        state: { item: item },
                      });
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                  >
                    <img className="w-24" src={`http://127.0.0.1:8000${item.img}`} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.productName}</p>
                      <p className="text-xs">{item.des}</p>
                      <p className="text-sm">
                        Price:{" "}
                        <span className="text-primeColor font-semibold">${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex items-center">
              <FaUser />
              {userInfo.email && <span className="ml-2 text-base">{userInfo.email}</span>} {/* Display email if logged in */}
              <FaCaretDown />
            </div>
            {showUser && (
    <motion.ul
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
    >
      {userInfo.email ? ( // Check if the user is logged in
        <>
          <Link to="/order-history">
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Order History
            </li>
          </Link>
          <li onClick={handleLogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
            Logout
          </li>
        </>
      ) : (
        <>
          <Link to="/signin">
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Login
            </li>
          </Link>
          <Link onClick={() => setShowUser(false)} to="/signup">
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Sign Up
            </li>
          </Link>
        </>
      )}
    </motion.ul>
  )}



            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
      {errorMsg && <div className="text-red-500">{errorMsg}</div>} {/* Display error message */}
    </div>
  );
};

export default HeaderBottom;
