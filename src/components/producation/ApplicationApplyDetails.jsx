import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { useParams, useNavigate } from "react-router-dom"; // added useNavigate
import { icons } from "../../assets";
import { API } from "../../api";

const ApplicationApplyDetails = () => {
    const { id } = useParams(); // ✅ match backend param name
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
                setProfile(res.data.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProfile(); // ✅ use correct param
    }, [id]);

    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>No profile found.</p>;

    return (
        <div className="max-w-full mx-auto bg-white font-primary">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
                >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {profile.name}
                </button>
                <button
                    onClick={() => navigate(`/production/applicant-profile-photos/${id}`)}
                    className="flex items-center text-primary border-2 px-3 py-1.5 gap-2 hover:text-shadow-primary font-semibold text-xs sm:text-sm">
                    Photo
                    <GrGallery />
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Profile Image */}
                <div className="w-full sm:w-56 h-72 sm:h-72 overflow-hidden mx-auto md:mx-0">
                    <img
                        src={profile.media?.profile_image}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Basic Info */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col gap-4 mt-4 md:mt-2 text-gray-600 text-sm md:text-base">
                        <span className="flex items-center gap-1">
                            <img src={icons.gender} alt="gender" className="w-4 h-5" />
                            {profile.gender}
                        </span>
                        <span className="flex items-center gap-1">
                            <img src={icons.calender} alt="calendar" className="w-5 h-5" />
                            {calculateAge(profile.date_of_birth)} years
                        </span>
                        <span className="flex items-center gap-1">
                            <img src={icons.location} alt="location" className="w-5 h-5" />
                            {profile.city}
                        </span>
                    </div>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm md:text-base border-l-2 border-primary px-4">
                        <p>{profile.name}</p>
                        <p>Height - {profile.height}</p>
                        <p>Hair - {profile.hair_color}</p>
                        <p>Shoes - {profile.shoe_size}</p>
                        <p>Eyes - {profile.eye_color}</p>
                        <p>
                            <span className="font-semibold">Available for:</span>{" "}
                            {profile.availabilities}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationApplyDetails;
