import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Parlour = () => {
  // Random data for beauty parlours (added more parlours)
  const parlours = [
    {
      name: "Glow Up Beauty Parlour",
      email: "contact@glowup.com",
      address: "123 Beauty St, City",
      image: "data:image/jpeg;base64,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",
    },
    {
      name: "Radiance Salon",
      email: "info@radiancesalon.com",
      address: "456 Shine Blvd, Town",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5sb37WeWqPHoe8AOlYvQo-jZK_tdCb6Nl7gDotvFltNzPZz8woYWiytA8xofdR-pQfU&usqp=CAU",
    },
    {
      name: "Luxe Glamour Studio",
      email: "luxe@glamour.com",
      address: "789 Glamour Ave, City",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+3",
    },
    {
      name: "Serenity Spa",
      email: "serenity@spa.com",
      address: "101 Calm Rd, Village",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+4",
    },
    {
      name: "Blissful Beauty",
      email: "bliss@beauty.com",
      address: "202 Happy St, City",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+5",
    },
    {
      name: "Elite Glamour",
      email: "elite@glamour.com",
      address: "333 Elite Blvd, Town",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+6",
    },
    {
      name: "Trendy Styles",
      email: "contact@trendystyles.com",
      address: "888 Trendy Rd, City",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+7",
    },
    {
      name: "Chic Salon & Spa",
      email: "chic@salon.com",
      address: "222 Chic St, Village",
      image: "https://via.placeholder.com/300x200?text=Beauty+Parlour+8",
    },
  ];

  // State to manage search input and filtered parlours
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParlours, setFilteredParlours] = useState(parlours);

  // Update filtered parlours based on search term
  useEffect(() => {
    setFilteredParlours(
      parlours.filter(parlour =>
        parlour.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Create a reference for the card element to apply animation
  const cardRef = useRef(null);

  // GSAP animation for each card on render
  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-2PmTnd3JD5ZgrSQwx7m43ucAKnQl-QYIg&s')]">
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 w-full text-white text-center py-6">
        <h1 className="text-3xl font-extrabold">Beauty Parlour Listings</h1>
        <p className="mt-2 text-lg">Find your perfect beauty parlour</p>
      </header>

      {/* Search Bar */}
      <div className="mb-8 w-full max-w-md mx-auto px-4">
        <input
          type="text"
          placeholder="Search Beauty Parlour..."
          className="mt-5 w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Container for the filtered parlour cards */}
      <div className="container mx-auto px-4 py-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredParlours.length > 0 ? (
          filteredParlours.map((parlour, index) => (
            <div 
              key={index}
              ref={cardRef} 
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={parlour.image}
                alt={parlour.name}
                className="w-50 h-50 mt-2 ml-11 object-cover transition-transform duration-500 transform hover:scale-110 rounded-full "
              />
              {/* Details */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 hover:text-pink-600">{parlour.name}</h3>
                <p className="text-gray-600 mt-3">{parlour.address}</p>
                <p className="text-gray-600">{parlour.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-3 text-center">No parlour found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Parlour;
