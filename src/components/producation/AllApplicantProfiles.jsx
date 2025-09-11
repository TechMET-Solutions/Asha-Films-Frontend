import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import ProfileCard from "../ProfileCard";

const AllApplicantProfiles = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/production/applications/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API:", res.data.users);

        if (res.data.success) {
          const mappedUsers = res.data.users.map((u) => ({
            id: u.id || "null",
            name: u.name || "Unknown",
            age: u.age || "N/A",
            city: u.city || "N/A",
            gender: res.data.job?.gender || "N/A",
            location: u.city || "Not Provided",
            image: u.image_url,
          }));

          setApplicants(mappedUsers);
        }
      } catch (error) {
        console.error("❌ Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-[#8B3C68] mb-6 text-2xl font-bold">
        “ Discover Professional Actors & Actresses for Your Next Project ”
      </h2>

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {applicants.map((app) => (
            <ProfileCard
              key={app.id}
              image={app.image}
              name={app.name}
              age={app.age}
              gender={app.gender}
              location={app.location}
              onAction={() =>
                navigate(`/production/application-details/${app.id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllApplicantProfiles;


