import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import ProfileCard from "../ProfileCard"; // import reusable component

const ApplicantProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${API}/api/production/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data.data);
        setApplicants(res.data.data || []);
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700,
          fontStyle: "bold",
          fontSize: "24px",
          lineHeight: "100%",
          letterSpacing: "5%",
        }}
        className="text-[#8B3C68] mb-6"
      >
        All Received Applications
      </h2>

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {applicants.map((app) => (
            <ProfileCard
              key={app.application_id}
              image={app.user?.image_url}
              name={app.user?.name}
              age={app.user?.age}
              gender={app.user?.gender}
              location={app.user?.city}
              onAction={() =>
                navigate(`/production/application-details/${app.user.id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
