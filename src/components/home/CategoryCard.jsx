import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ title, count, gender1, gender2 }) => {


  
  const desc = "Browse our talented professionals in this category";

 const navigate = useNavigate();

  const handleClick = (gender) => {
    navigate("/profiles", { 
      state: { category: title, gender }  // 🔥 pass data
    });
  };
  return (
    <div className="relative w-[370px] h-[360px] shadow-lg border border-gray-200/80 cursor-pointer group overflow-hidden font-secondary">
      {/* Main card */}
      <div className="h-full bg-white shadow-2xl flex flex-col items-center justify-center p-6">
        <img src="/girl.png" alt="category" width={200} className='mb-4' />
        <h3 className="font-bold text-2xl text-[#2D2D2D] mb-2">{title}</h3>
        <p className="text-[#2D2D2D] text-lg">({count} Talents)</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary border-[10px] border-secondary text-[#fff5de] flex flex-col items-center justify-center text-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="flex space-x-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="w-2 h-2 bg-white rounded-full" />
          ))}
        </div>
        <p className="text-lg mb-8">{desc}</p>
        <div className="space-y-4 w-full max-w-[200px]">
          <button className="w-full px-3 py-2 border border-[#fff5de] font-semibold hover:bg-gradient-to-b hover:from-secondary hover:to-primary cursor-pointer"onClick={() => handleClick(gender1)}>
            {gender1}
          </button>
          <button className="w-full px-3 py-2 border border-[#fff5de] font-semibold hover:bg-gradient-to-b hover:from-secondary hover:to-primary cursor-pointer" onClick={() => handleClick(gender2)}>
            {gender2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
