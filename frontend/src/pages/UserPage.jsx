import { useContext, useEffect, useState, useRef } from "react";
import { UserContextData } from "../context/UserContext";
import axios from "axios";
import { FaMapMarkerAlt, FaLocationArrow, FaChevronDown } from "react-icons/fa";
import gsap from "gsap";

import { LocationsName } from "../components/LocationsName";

export const UserPage = () => {
  const { setUser } = useContext(UserContextData);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs for GSAP animations
  const searchContainerRef = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const inputsContainerRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [setUser]);

  const handleSearchFocus = () => {
    if (!isSearchFocused) {
      setIsSearchFocused(true);
      const tl = gsap.timeline();

      tl.to(searchContainerRef.current, {
        duration: 0.5,
        y: 0,
        height: "100%",
        borderRadius: 0,
        ease: "power3.inOut"
      })
        .to(headerRef.current, {
          duration: 0.3,
          display: "flex",
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }, "-=0.2")
        .to(logoRef.current, {
          duration: 0.3,
          opacity: 0,
          y: -20,
          ease: "power2.inOut"
        }, "-=0.3")
        .to(inputsContainerRef.current, {
          duration: 0.3,
          y: -20,
          ease: "power2.out"
        }, "-=0.3");
    }
  };

  const handleClose = () => {
    if (isSearchFocused) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSearchFocused(false);
          setPickup("");
          setDestination("");
        }
      });

      tl.to(inputsContainerRef.current, {
        duration: 0.3,
        y: 0,
        ease: "power2.inOut"
      })
        .to(headerRef.current, {
          duration: 0.3,
          opacity: 0,
          y: -10,
          display: "none",
          ease: "power2.inOut"
        }, "-=0.2")
        .to(searchContainerRef.current, {
          duration: 0.5,
          height: "auto",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          ease: "power3.inOut"
        }, "-=0.2")
        .to(logoRef.current, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }, "-=0.3");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Logo */}
        <img
          ref={logoRef}
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="absolute top-6 left-6 z-20 h-10 w-auto"
        />

        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="Background"
        />

        {/* Search Container */}
        <div
          ref={searchContainerRef}
          className="absolute w-full bottom-0 bg-white rounded-t-3xl shadow-lg z-30"
        >
          {/* Header */}
          <div
            ref={headerRef}
            className="hidden items-center p-4 border-b opacity-0"
          >
            <button
              onClick={handleClose}
              className="p-2 transition-transform hover:scale-110"
            >
              <FaChevronDown className="text-xl" />
            </button>
            <h2 className="text-xl font-semibold ml-4">Where to?</h2>
          </div>

          {/* Input Container */}
          <div ref={inputsContainerRef} className="p-6 space-y-4">
            {!isSearchFocused && (
              <h2 className="text-2xl font-bold mb-6">Where to?</h2>
            )}

            {/* Pickup Location Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLocationArrow className="text-gray-400" />
              </div>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Current location"
                className="pl-10 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Destination Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Enter destination"
                className="pl-10 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {isSearchFocused && (
              <div className="mt-4">
                <LocationsName
                  pickup={pickup}
                  destination={destination}
                />
              </div>
            )}

            {/* Request Button */}
            {!isSearchFocused && (
              <button className="w-full bg-black text-white p-4 rounded-lg font-semibold hover:bg-gray-800 transition-transform hover:scale-[1.02]">
                Request Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};