import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../api";

export default function PlanSubscription() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(`${API}/api/plans`);
        setPlans(data);
      } catch (error) {
        console.error("❌ Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleViewMore = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  // ✅ Extract points from Jodit HTML
  const extractPoints = (html) => {
    if (!html) return [];
    const container = document.createElement("div");
    container.innerHTML = html;
    const points = Array.from(container.querySelectorAll("li, p")).map((el) =>
      el.innerText.trim()
    );
    return points.filter((p) => p.length > 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        Loading Plans...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl">
        {plans.map((plan) => {
          const points = extractPoints(plan.description);

          return (
            <div
              key={plan.id}
              className="relative group border-2 border-primary shadow-lg shadow-primary/30 hover:shadow-2xl transition duration-300 p-6 bg-white "
            >
              {/* Plan Title */}
              <div className="absolute w-[85%] text-center -top-5 left-1/2 transform -translate-x-1/2 bg-white text-primary shadow-primary/50 shadow-md group-hover:bg-primary group-hover:text-white px-4 py-2 text-sm sm:text-base font-semibold ">
                {plan.name}{" "}
                {parseFloat(plan.price).toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                ({plan.duration_in_days} Year)
              </div>

              {/* Features */}
              <h3 className="text-center text-primary font-semibold mt-6 mb-4 text-base sm:text-lg">
                Features
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                {points.slice(0, 7).map((point, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="text-primary">•</span>
                    {point}
                  </li>
                ))}
                {points.length > 7 && (
                  <span
                    className="text-primary font-medium cursor-pointer hover:underline"
                    onClick={() => handleViewMore(plan)}
                  >
                    View More…
                  </span>
                )}
              </ul>

              {/* Price & Buy */}
              <div className="mt-6 flex flex-col items-center">
                <button className="w-full border border-primary px-6 py-2 font-semibold text-sm sm:text-base hover:bg-primary hover:text-white transition">
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Modal */}
      {openModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6">
          <div className="bg-white shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn max-h-[80vh] overflow-y-auto rounded-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg sm:text-xl font-bold text-primary mb-4 text-center">
              {selectedPlan.name} - All Features
            </h2>

            {/* ✅ Show all points in modal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {extractPoints(selectedPlan.description).map((point, index) => (
                <div
                  key={index}
                  className="text-gray-700 flex items-start gap-2 text-sm sm:text-base"
                >
                  <span className="text-primary">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* ✅ Buy Now in Modal */}
            <div className="flex justify-center">
              <button className="w-full sm:w-auto border border-primary px-8 py-2 font-semibold text-sm sm:text-base hover:bg-primary hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
