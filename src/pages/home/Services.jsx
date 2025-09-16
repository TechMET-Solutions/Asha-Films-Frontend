import React, { useEffect } from 'react';
import CategoryCard from '../../components/home/CategoryCard';
import CategorySelector from '../../components/ui/CategorySelector';

const Services = () => {
  const categories = [
    { title: "ACTORS & ACTRESS", count: "9692", gender1: "MALE", gender2: "FEMALE" },
    { title: "FASHION MODELS", count: "4705", gender1: "MALE", gender2: "FEMALE" },
    { title: "KIDS", count: "9605", gender1: "BOYS", gender2: "GIRLS" },
    { title: "INFLUENCERS", count: "4705", gender1: "MALE", gender2: "FEMALE" },
    { title: "VOICE OVER", count: "9695", gender1: "MALE", gender2: "FEMALE" },
    { title: "DANCERS", count: "4705", gender1: "MALE", gender2: "FEMALE" },
    { title: "Freelance Foreigners", count: "4705", gender1: "MALE", gender2: "FEMALE" },
    { title: "Talent Agencies", count: "9695", gender1: "MALE", gender2: "FEMALE" },
    { title: "Theater Artist", count: "4705", gender1: "MALE", gender2: "FEMALE" },
  ];

   useEffect(() => {
    document.title = "Services | 1 on 1 Screen";
  }, []);

  return (
    <div className="mt-16 mb-4 max-w-[1440px] mx-auto">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-20 gap-4 mb-10">
        <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-primary">Services</h1>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-wrap justify-center gap-16">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            count={category.count}
            gender1={category.gender1}
            gender2={category.gender2}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
