import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api"; // adjust path

export default function MySubscription() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token saved on login
        if (!token) return;

        const res = await axios.get(`${API}/api/user/plan/current`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setPlan(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading subscription...</p>;
  }

  if (!plan) {
    return (
      <p className="text-center py-10 text-gray-500">
        No active plan found.
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 sm:p-6 lg:p-8">
      {/* Left Card */}
      <div className="border border-primary p-4 sm:p-6 w-full sm:w-1/2 shadow-sm bg-white">
        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center md:text-left">
          My Subscription
        </h2>

        {/* Plan Info */}
        <div className="text-center md:text-left">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {plan.plan_name || "No Plan"}
          </h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Price: ₹
            {parseFloat(plan.plan_price).toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Date Of Purchase:{" "}
            {plan.plan_purchase_date
              ? new Date(plan.plan_purchase_date).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Status & Details */}
        <div className="mt-6 space-y-3 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Status: </span>
            <span
              className={`font-medium ${
                new Date(plan.plan_expiry) > new Date()
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {new Date(plan.plan_expiry) > new Date()
                ? "Active"
                : "Expired"}
              <span
                className={`inline-block w-2 h-2 rounded-full ml-1 ${
                  new Date(plan.plan_expiry) > new Date()
                    ? "bg-green-600 animate-ping"
                    : "bg-red-600 animate-ping"
                }`}
              ></span>
            </span>
          </p>
          <p>
            <span className="font-semibold">Payment Mode: </span>
            {plan.payment_method || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Auto Renewal: </span>
            {plan.plan_auto_renew ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Expiry Date: </span>
            {plan.plan_expiry
              ? new Date(plan.plan_expiry).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 text-sm sm:text-base font-medium ">
            Upgrade Plan
          </button>
          <button className="w-full border border-primary text-primary py-2 text-sm sm:text-base font-medium  hover:bg-primary/10">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Right Benefits Section */}
      <div className="w-full sm:w-1/2 bg-white p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-primary mb-4 text-center md:text-left">
          Benefits You Get:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Apply to Unlimited Casting Calls</li>
          <li>Verified Actor Badge</li>
          <li>Consolidated Professional Profile</li>
          <li>Free Learning Videos</li>
          <li>Access to Masterclass</li>
          <li>Showcase in Featured Section</li>
          <li>Email Alerts for New Jobs</li>
          <li>WhatsApp Alerts</li>
        </ul>
      </div>
    </div>
  );
}
