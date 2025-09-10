import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { icons } from "../../assets";

const ApplicantProfile = () => {
     const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(profile,"profile")
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔑 use saved token
            },
          }
        );
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);
 const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

//   const age = calculateAge(date_of_birth);
  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found.</p>;

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg font-primary">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
                <button
                    // onClick={() => navigate(-1)}
                    className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
                >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Trisha Krishnan
                </button>
                <button
                    // onClick={() => navigate(-1)}
                    className="flex items-center text-primary border-2 px-3 py-1.5 gap-2 hover:text-shadow-primary font-semibold text-xs sm:text-sm"
                >
                    Photo
                    <GrGallery />
                </button>

            </div>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Profile Image */}
                <div className="w-full sm:w-56 h-72 sm:h-72 overflow-hidden mx-auto md:mx-0">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Trisha_Krishnan_at_PS1_pre_release_event_%283%29_%28cropped%29.jpg/250px-Trisha_Krishnan_at_PS1_pre_release_event_%283%29_%28cropped%29.jpg"
                        alt="Trisha Krishnan"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Basic Info */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col gap-4 mt-4 md:mt-2 text-gray-600 text-sm md:text-base">
                        <span className="flex items-center gap-1">
                            <img
                                src={icons.gender}
                                alt="gender"
                                className="w-4 h-5"
                            /> {profile.gender}
                        </span>
                           <span className="flex items-center gap-1">
    <img src={icons.calender} alt="calendar" className="w-5 h-5" />
    {calculateAge(profile?.date_of_birth)}
  </span>
                        <span className="flex items-center gap-1">
                            <img
                                src={icons.location}
                                alt="location"
                                className="w-5 h-5"
                            /> {profile?.city}
                        </span>
                    </div>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm md:text-base border-l-2 border-primary px-4">
                        <p>Trisha Krishnan</p>
                        <p>Height - 5 Feet 8 Inches</p>
                        <p>Hair - Brown</p>
                        <p>Shoes - UK 7 / EUR40</p>
                        <p>Eyes - Brown</p>
                        <p>
                            <span className="font-semibold">Available for:</span>{" "}
                            Films / Web Series / TV / Ads / Fashion Shoots
                        </p>
                    </div>
                </div>
            </div>

            {/* Experience */}
            <div className="mt-8">
                <h2 className="text-lg md:text-xl font-semibold text-primary">Experience</h2>
                <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1 text-sm md:text-base">
                    <li><span className="font-semibold">Years of Experience:</span> 3+ Years in Industry</li>
                    <li><span className="font-semibold">Industries Worked In:</span> Films, TV Serials, Web Series, Commercials</li>
                    <li>
                        <span>Notable Projects:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li><span className="font-semibold">TV Serial:</span> StarPlus Drama (Lead Role)</li>
                            <li><span className="font-semibold">Web Series:</span> OTT Platform XYZ</li>
                            <li><span className="font-semibold">Ad Campaign:</span> Lakmé Beauty Commercial</li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* Skills & Education */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-primary border-t p-1">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-primary pt-3">Special Skills</h2>
                    <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1 text-sm md:text-base">
                        <li>Dancing (Bollywood / Contemporary)</li>
                        <li>Singing (Basic)</li>
                        <li>Stage Performance & Delivery</li>
                        <li>Dialogue</li>
                        <li>Voiceover Capabilities</li>
                        <li>Fashion & Lifestyle Modeling</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-primary pt-3">Education / Training</h2>
                    <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1 text-sm md:text-base">
                        <li>Bachelor’s Degree in Arts</li>
                        <li>Trained in Acting – XYZ Acting Institute</li>
                        <li>Dance Training – Classical / Bollywood / Contemporary</li>
                    </ul>
                </div>
            </div>

            {/* Portfolio Links */}
            <div className="mt-8 text-primary border-t p-1">
                <h2 className="text-lg md:text-xl font-semibold text-primary pt-3">Portfolio Links / Media</h2>
                <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1 text-sm md:text-base">
                    <li>Showreel / Audition Tape: [YouTube / Vimeo link]</li>
                    <li>Instagram: @trishakrishnan_official</li>
                    <li>
                        YouTube Channel:{" "}
                        <a href="#" className="text-primary underline">Link</a>
                    </li>
                    <li>
                        Drive Link:{" "}
                        <a href="#" className="text-primary underline">Link</a>
                    </li>
                </ul>
            </div>

            {/* Achievements */}
            <div className="mt-8 text-primary border-t p-1">
                <h2 className="text-lg md:text-xl font-semibold text-primary pt-3">Achievements / Recognition</h2>
                <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1 text-sm md:text-base">
                    <li>Featured in Femina Calendar 2024</li>
                    <li>Shortlisted for XYZ National Commercial</li>
                    <li>Stage Award for Best Newcomer Actress</li>
                </ul>
            </div>
        </div>
    );
};

export default ApplicantProfile;
