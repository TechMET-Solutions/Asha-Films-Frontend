import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategorySelector from "../../components/ui/CategorySelector";
import { API } from "../../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All"); // filter state
  const navigate = useNavigate();

  // Fetch projects from API
  const fetchProjects = async (type = "All") => {
    try {
      setLoading(true);
      let url = `${API}/api/content/projects`;
      if (type !== "All") {
        url += `?type=${encodeURIComponent(type)}`;
      }
      const res = await axios.get(url);
      if (res.data.success) {
        setProjects(res.data.projects);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(selectedType);
  }, [selectedType]);

  const handleProjectClick = (project) => {
    navigate(`/project-details/${project.id}`, { state: { project } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-primary">Projects</h1>

          {/* Filter by type */}
          <CategorySelector
            label="Sort By "
            options={["All", "Movies", "Web Series", "Advertisement"]}
            selected={selectedType}
            onChange={setSelectedType}
          />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-yellow-50 shadow hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="aspect-[3/4] bg-gray-200">
                <img
                  src={
                    project.image_url ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={project.film_title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-1">
                    {project.type} -{" "}
                    <span className="text-primary">{project.film_title}</span>
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-3">
                    {project.about_project || "No description available."}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project);
                  }}

                  // px-3 py-2 border border-[#fff5de] font-semibold hover:bg-gradient-to-b hover:from-secondary hover:to-primary
                  className="w-full mt-auto border border-primary text-primary hover:text-[#fff5de] hover:border-[#fff5de] py-2 px-4 text-sm font-semibold hover:bg-gradient-to-b hover:from-secondary hover:to-primary"
                >
                  SEE MORE
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No projects found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
