import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApplicationApplyDetails = () => {
    const navigate = useNavigate();
     
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/production/applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
         setApplicants(res.data.data || []);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 ">
     <h2
 
  style={{
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 700,
    fontStyle: "bold",
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "5%",
              }}
              className='text-[#8B3C68] mb-6'
>
  All Received Applications
</h2>


      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {applicants.map((app) => (
            <div
              key={app.application_id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Applicant Image */}
              <div className="relative">
                <img
                  src={
                    app.user.image_url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={app.user.name}
                  className="w-full h-40 object-cover"
                />
                {/* <span className="absolute bottom-2 right-2 bg-white border border-primary text-primary text-[14px] font-medium rounded w-[100px] h-[28px] flex items-center justify-center">
                  {app.user.gender}
                </span> */}
              </div>

              {/* Applicant Details */}
              <div className="p-4">
               
                <span className="font-semibold text-[#494C4E]  text-[16px]"></span> Name: <span className="text-[16px] text-[#494C4E]">{app.user.name} </span>
               
                {/* <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {app.role_specific_info || "No experience details provided"}
                </p> */}
                      <div className="mt-2">
                          
 <span className="font-bold text-[#494C4E] text-[16px]"></span> Age: <span className="text-[16px] text-[#494C4E]">{app.user.age} yrs </span>
                      </div>

                       <div className="mt-2">
                          
 <span className="font-bold text-[#494C4E]  text-[16px]"></span> Gender: <span className="text-[16px] text-[#494C4E]">{app.user.gender}</span>
                      </div>

                      <div className="mt-2 flex justify-between">
                          <div>
                              
                              <span className="font-bold text-[#494C4E]text-[16px]"></span> Location: <span className="text-[16px] text-[#494C4E]">{app.user.current_location}</span> 
                          </div>
                          
                          <div>
                                  <button
        onClick={() => navigate(`/production/applicant-profile/${app.user.id}`)}
        className="border border-primary text-[16px] rounded hover:bg-primary hover:text-white transition w-[140px] h-[40px] text-[#8B3C68]"
      >
        View More
      </button>

                          </div>
                          </div>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationApplyDetails;
