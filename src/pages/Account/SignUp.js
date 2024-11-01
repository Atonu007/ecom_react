import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const navigate = useNavigate();

  // Initial state for form fields
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [checked, setChecked] = useState(false);

  // State for error messages
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handlers for form input changes
  const handleName = (e) => { setClientName(e.target.value); setErrClientName(""); };
  const handleEmail = (e) => { setEmail(e.target.value); setErrEmail(""); };
  const handlePhone = (e) => { setPhone(e.target.value); setErrPhone(""); };
  const handlePassword = (e) => { setPassword(e.target.value); setErrPassword(""); };
  const handleAddress = (e) => { setAddress(e.target.value); setErrAddress(""); };
  const handleCity = (e) => { setCity(e.target.value); setErrCity(""); };
  const handleCountry = (e) => { setCountry(e.target.value); setErrCountry(""); };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSuccessMsg(""); 
    setErrorMsg(""); 

    if (!checked) {
      return setErrorMsg("You must agree to the Terms of Service and Privacy Policy.");
    }

    if (!clientName) setErrClientName("Enter your name");
    if (!email) setErrEmail("Enter your email");
    else if (!EmailValidation(email)) setErrEmail("Enter a valid email");
    if (!phone) setErrPhone("Enter your phone number");
    if (!password) setErrPassword("Create a password");
    else if (password.length < 6) setErrPassword("Passwords must be at least 6 characters");
    if (!address) setErrAddress("Enter your address");
    if (!city) setErrCity("Enter your city name");
    if (!country) setErrCountry("Enter the country you are residing");

    if (
      clientName && EmailValidation(email) &&
      phone && password && password.length >= 6 &&
      address && city && country
    ) {
      try {
        const response = await fetch("https://ecom-django.onrender.com/api/core/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: clientName,
            email,
            phone_number: phone,
            password,
            address,
            city,
            country,
            agreed_to_policy: checked,
          }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // Store tokens and user info in session storage
        sessionStorage.setItem("accessToken", data.access);
        sessionStorage.setItem("refreshToken", data.refresh);
        sessionStorage.setItem("user", JSON.stringify({ name: clientName, email })); 

        setSuccessMsg(`Welcome, ${clientName}! Check your email at ${email} for confirmation.`);

        // Clear form fields
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
        setCity("");
        setCountry("");
        setChecked(false);

        // Navigate to home page
        navigate("/"); 
      } catch (error) {
        setErrorMsg("Failed to register. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="text"
                    placeholder="Enter your name"
                  />
                  {errClientName && (
                    <p className="text-red-500 text-xs">{errClientName}</p>
                  )}
                </div>

                {/* email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errEmail && (
                    <p className="text-red-500 text-xs">{errEmail}</p>
                  )}
                </div>

                {/* phone */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                  {errPhone && (
                    <p className="text-red-500 text-xs">{errPhone}</p>
                  )}
                </div>

                {/* password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="password"
                    placeholder="Create your password"
                  />
                  {errPassword && (
                    <p className="text-red-500 text-xs">{errPassword}</p>
                  )}
                </div>

                {/* address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="text"
                    placeholder="Enter your address"
                  />
                  {errAddress && (
                    <p className="text-red-500 text-xs">{errAddress}</p>
                  )}
                </div>

                {/* city */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <input
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="text"
                    placeholder="Enter your city name"
                  />
                  {errCity && (
                    <p className="text-red-500 text-xs">{errCity}</p>
                  )}
                </div>

                {/* country */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm px-2 rounded-md bg-gray-300 text-gray-700"
                    type="text"
                    placeholder="Enter your country"
                  />
                  {errCountry && (
                    <p className="text-red-500 text-xs">{errCountry}</p>
                  )}
                </div>

                {/* Terms and conditions */}
                <div className="flex items-center">
                  <input
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    type="checkbox"
                    className="w-4 h-4 accent-primeColor"
                  />
                  <p className="text-sm ml-2">
                    I agree to the{" "}
                    <span className="text-primeColor font-semibold cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-primeColor font-semibold cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {errorMsg && (
                  <p className="text-red-500 text-xs">{errorMsg}</p>
                )}
                <button
                  onClick={handleSignUp}
                  className="w-full h-10 rounded-md bg-primeColor text-gray-200 text-base font-titleFont font-semibold 
                  tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Create account
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primeColor font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
