import axios from "axios";
import React, { useEffect, useState } from "react";

const Plans = () => {
   const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedPlan, setSelectedPlan] = useState(null); // For modal
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/plans", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading plans...
      </div>
    );
  }

  return (


     <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white py-16 px-6 md:px-12 lg:px-24 flex flex-col gap-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-poppins font-bold text-[36px] leading-[100%] tracking-[0] text-[#8B2F63] mb-4">
            Get Discovered, Start Now.
          </h2>

          <p className="text-gray-600 mt-20">
            Whether you’re a fresh face entering the industry or a seasoned
            performer looking for your next big break, enrolling with us is the
            first step toward real, meaningful opportunities.
          </p>
          <p className="text-gray-600 mt-4">
            We believe in keeping things simple — one straightforward plan with
            full access to everything you need. No complicated tiers, no hidden
            fees, no confusion. Just pure visibility to top casting directors,
            agencies, and brands actively looking for talent like you.
          </p>
          <p className="font-semibold mt-4 text-[20px]">
            Ready to be seen? Let’s make it official.
          </p>
        </div>

        
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative border-2 border-pink-300 rounded-md p-6 pt-12 shadow-sm hover:shadow-lg transition w-[350px] h-[442px]"
            >
              {/* Banner */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white border border-pink-300 px-6 py-1 rounded-md shadow-sm text-[16px] font-semibold w-[302px] h-[50px] flex justify-center items-center text-[#494C4E]">
               {plan.name} ₹{plan.price} {Math.round(plan.duration_in_days / 30)} Month

              </div>

              <h4 className="font-semibold text-[#8B3C68] mb-3 text-center">
                Features
              </h4>
              
              {/* Render HTML description */}
             <div
  className="text-gray-700 line-clamp-7"
  dangerouslySetInnerHTML={{ __html: plan.description }}
></div>

              <div className="mt-10 text-center">
                 <button
                onClick={() => setSelectedPlan(plan)} // Open modal
                className="border border-[#8B3C68] px-6 py-2 rounded-md text-[#494C4E] font-medium hover:bg-[#8B3C68] w-[215px] h-[49px] text-[20px] hover:text-white"
              >
                Buy Now
              </button>
              </div>
            </div>
          ))}
      </div>
      

      {selectedPlan && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="relative bg-white rounded-md shadow-lg max-w-2xl w-full p-6 border-2 border-pink-300">

      {/* Plan Banner on top border */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white border border-pink-300 px-6 py-2 rounded-md text-[#8B2F63] font-bold text-center shadow-sm">
        {selectedPlan.name} ₹{selectedPlan.price} {Math.round(selectedPlan.duration_in_days / 30)} Month
      </div>

      {/* Close button on top-right border */}
      <button
        onClick={() => setSelectedPlan(null)}
        className="absolute -top-4 -right-4 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 font-bold shadow"
      >
        &times;
      </button>

      <h4 className="font-bold text-[#8B3C68] mb-3 text-left text-[24px]">
        Features
      </h4>

      {/* Full Description */}
      <div
        className="text-gray-700 overflow-y-auto max-h-[400px]"
        dangerouslySetInnerHTML={{ __html: selectedPlan.description }}
      ></div>

      <div className="mt-6 text-center">
        <button className="bg-[#8B3C68] text-white px-6 py-2 rounded-md text-[20px] w-[215px] h-[49px]">
          <span className="font-poppins font-semibold text-[20px] leading-[20px] tracking-[0.05em] text-justify">
            Buy Now
          </span>
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
};

export default Plans;
