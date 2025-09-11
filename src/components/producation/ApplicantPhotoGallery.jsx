// import React from 'react'
// import { FaChevronLeft } from 'react-icons/fa';

// function ApplicantPhotoGallery() {
//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
//                 <button
//                     // onClick={() => navigate(-1)}
//                     className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
//                 >
//                     <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//                     Trisha Krishnan
//                 </button>
//             </div>

//             {/* Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {photos.map((src, index) => (
//                     <div key={index} className="overflow-hidden shadow-md">
//                         <img
//                             src={src}
//                             alt={`Trisha Krishnan ${index + 1}`}
//                             className="w-full h-full object-cover transition-transform duration-300"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default ApplicantPhotoGallery

import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../api";

function ApplicantPhotoGallery() {
  const { id } = useParams(); // ✅ match backend param
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("PHOTOS : ",res.data)
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading) return <p>Loading photos...</p>;
  if (!profile) return <p>No profile found.</p>;

  const photos = profile.media?.images || [];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {profile.name}
        </button>
      </div>

      {/* Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden shadow-md rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={src}
                alt={`${profile.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No photos uploaded yet.</p>
      )}
    </div>
  );
}

export default ApplicantPhotoGallery;
