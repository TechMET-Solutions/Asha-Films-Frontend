import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";


function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API}/api/content/projects/${id}`); // adjust API base URL if needed
        const data = await res.json();

        if (data.success) {
          setProject(data.project); // make sure backend sends { success, project }
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center">Loading project...</div>;
  if (!project) return <div className="text-center">Project not found.</div>;

  const {
    film_title,
    genre,
    directed_by,
    produced_by,
    released_year,
    language,
    platform,
    about_project,
    type,
    image_url,
  } = project;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Projects
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Poster */}
          <div className="mx-auto lg:mx-0 max-w-xs flex-shrink-0">
            <img
              src={
                image_url ||
                "https://via.placeholder.com/300x400?text=No+Image"
              }
              alt={`${film_title} Poster`}
              className="w-96 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">
              {type}: {film_title}
            </h1>

            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <div>
                <span className="font-semibold">Genre:</span> {genre}
              </div>
              <div>
                <span className="font-semibold">Directed by:</span>{" "}
                {directed_by}
              </div>
              <div>
                <span className="font-semibold">Produced by:</span>{" "}
                {produced_by}
              </div>
              <div>
                <span className="font-semibold">Released Year:</span>{" "}
                {released_year}
              </div>
              <div>
                <span className="font-semibold">Language:</span> {language}
              </div>
              <div>
                <span className="font-semibold">Platform:</span> {platform}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                About the Project:
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {about_project || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
