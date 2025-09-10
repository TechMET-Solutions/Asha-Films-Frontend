// import React from "react";
// import { Button } from "../ui";

// export default function CastingCallDetails() {
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 text-pink-600 font-medium cursor-pointer">
//         <span className="text-lg">&lt;</span>
//         <h1 className="text-lg font-semibold">
//           Web Series "Mumbai Diaries – Season 2"
//         </h1>
//       </div>

//       {/* Banner Image */}
//       <div className="mt-4">
//         <img
//           src="https://images.unsplash.com/photo-1508349937151-22b85d48f5d9?q=80&w=1200"
//           alt="Casting Banner"
//           className="w-full h-56 object-cover rounded-lg shadow-md"
//         />
//       </div>

//       {/* Top Action */}
//       <div className="flex justify-end items-center gap-3 mt-3">
//         <Button className="border px-3 py-1 rounded text-sm text-gray-700">
//           4 Days to Expire
//         </Button>
//         <Button variant="outline" className="px-5">
//           Apply
//         </Button>
//       </div>

//       {/* Project Info */}
//       <div className="mt-6 space-y-2 text-gray-800">
//         <p>
//           <span className="font-semibold">Project Type:</span> OTT Web Series
//           (Drama / Thriller)
//         </p>
//         <p>
//           <span className="font-semibold">Production House:</span> DreamCraft
//           Studios
//         </p>
//         <p>
//           <span className="font-semibold">Shooting Location:</span> Mumbai,
//           Maharashtra
//         </p>
//         <p>
//           <span className="font-semibold">Shoot Dates:</span> 5th August – 20th
//           August 2025
//         </p>
//         <p>
//           <span className="font-semibold">Casting By:</span> Aarav Casting Hub
//         </p>
//       </div>

//       {/* Role Details */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Female Lead (Doctor Role)</h2>
//         <div className="space-y-1 text-gray-800">
//           <p>
//             <span className="font-semibold">Age:</span> 25–32 years
//           </p>
//           <p>
//             <span className="font-semibold">Look:</span> Confident, composed,
//             medical professional type
//           </p>
//           <p>
//             <span className="font-semibold">Skills:</span> Must be able to carry
//             intense emotional scenes
//           </p>
//           <p>
//             <span className="font-semibold">Language:</span> Hindi, English
//             bilingual preferred
//           </p>
//         </div>
//       </div>

//       {/* Application Requirements */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">
//           Application Requirements:
//         </h2>
//         <ul className="list-disc list-inside text-gray-800 space-y-1">
//           <li>Recent Portfolio (min. 4 pictures)*</li>
//           <li>
//             1-minute acting monologue video (clear sound &amp; light)*
//           </li>
//           <li>
//             Full profile details (Name, Age, Height, Weight, Location, Contact)*
//           </li>
//         </ul>
//       </div>

//       {/* Contact Details */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Contact Details</h2>
//         <div className="space-y-1 text-gray-800">
//           <p>
//             <span className="font-semibold">Email Id:</span> xyz@gmail.com
//           </p>
//           <p>
//             <span className="font-semibold">Mobile No:</span> 0976754532
//           </p>
//           <p>
//             <span className="font-semibold">Location:</span> Mumbai
//           </p>
//         </div>
//       </div>

//       {/* Audition Info */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Audition dates/ Duration</h2>
//         <p className="text-gray-800">20 August 2025</p>
//         <p className="text-gray-800">25 August 2025</p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Audition Type</h2>
//         <p className="text-gray-800">Offline</p>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../api"; 
import { Button } from "../ui";

export default function CastingCallDetails() {
  const { id } = useParams(); // get id from route param

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/api/production/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.job);
        }

        console.log(res.data.job)
      } catch (err) {
        console.error("❌ Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center py-10 text-red-500">Job not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-pink-600 font-medium cursor-pointer">
        <span className="text-lg">&lt;</span>
        <h1 className="text-lg font-semibold">
          {job.project_title}
        </h1>
      </div>

      {/* Banner Image */}
      <div className="mt-4">
        <img
          src={job.image}
          alt="Casting Banner"
          className="w-full h-56 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Top Action */}
      <div className="flex justify-end items-center gap-3 mt-3">
        <Button className="border px-3 py-1 rounded text-sm text-gray-700">
          {job.application_deadline
            ? `${Math.max(
                0,
                Math.ceil(
                  (new Date(job.application_deadline) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )} Days to Expire`
            : "No deadline"}
        </Button>
        <Button variant="outline" className="px-5">
          Apply
        </Button>
      </div>

      {/* Project Info */}
      <div className="mt-6 space-y-2 text-gray-800">
        <p>
          <span className="font-semibold">Project Type:</span> {job.project_type}
        </p>
        <p>
          <span className="font-semibold">Production House:</span>{" "}
          {job.production_house || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Shooting Location:</span>{" "}
          {job.city_location}
        </p>
        <p>
          <span className="font-semibold">Shoot Dates:</span>{" "}
          {job.shoot_dates || "TBD"}
        </p>
        <p>
          <span className="font-semibold">Casting By:</span>{" "}
          {job.casting_agency || "N/A"}
        </p>
      </div>

      {/* Role Details */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Role Details</h2>
        <p className="text-gray-800">{job.project_description}</p>
      </div>
    </div>
  );
}
