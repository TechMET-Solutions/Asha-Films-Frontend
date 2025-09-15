
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBirthdayCake,
  FaChild,
  FaMapMarkerAlt,
  FaPalette,
  FaTimes,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { icons } from "../../assets";
import { CategorySelector } from "../../components/ui";
import { API } from "../../api";


const ProfileCard = ({ name, age, gender, location, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-full h-[360px] flex flex-col">
      {/* Image Section */}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/300x400?text=No+Image";
        }}
      />

      {/* Name Badge */}
      <div className="text-center -mt-5 relative z-10">
        <div className="inline-block bg-white px-4 py-1 rounded-lg shadow text-primary font-semibold text-lg">
          {name}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 text-sm text-gray-700 font-medium">
        <div className="flex justify-around items-center flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <FaBirthdayCake className="text-primary" />
            <span>{age ? `${age} yrs` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaVenusMars className="text-primary" />
            <span>{gender}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, icon: Icon = FaUser, onChange }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon className="text-primary text-lg" />}
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    </div>
    <ul className="space-y-2">
      {options.map((opt) => (
        <li key={opt} className="flex items-center">
          <input
            type="checkbox"
            id={opt}
            className="mr-2 h-4 w-4 text-blue-600"
            onChange={(e) => onChange(opt, e.target.checked)}
          />
          <label htmlFor={opt} className="text-gray-600 text-sm">
            {opt}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const FilterSection2 = ({ title, options, icon: Icon, selectedOptions = [], onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="text-gray-600" />}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => {
          const isChecked = selectedOptions.includes(option); // ✅ match with state
          return (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked} // ✅ checkbox shows selected if matched
                onChange={(e) => onChange(option, e.target.checked)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  console.log(filteredProfiles,"filteredProfiles")
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
const location = useLocation();

// Store selected filters
const [filters, setFilters] = useState({
  gender: [],
  ageRange: [],
  hair_color: [],
  body_type: [],
  beard: [],
  eye_color: [],
});
console.log(filters, "filters");

// ✅ Fetch profiles from backend
const fetchProfiles = async (appliedFilters = {}) => {
  try {
    setLoading(true);

    // Merge filters + category
    const payload = {
      ...appliedFilters,
      category: selectedCategory,   // 👈 add selected category here
    };

    const res = await axios.post(
      `${API}/api/pages/filter`,
      payload
    );

    if (res.data.success) {
      setProfiles(res.data.data);
      setFilteredProfiles(res.data.data);
    }
  } catch (err) {
    console.error("Error fetching profiles:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (location.state) {
    const { category, gender } = location.state;
    console.log(category, gender);

    if (category) setSelectedCategory(category);
    if (gender) {
      const formattedGender =
        gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(); // 👈 "Male"

      setFilters((prev) => ({
        ...prev,
        gender: [formattedGender],
      }));
    }
  }
}, [location.state]);
// When filters change, refetch
useEffect(() => {
  fetchProfiles(filters);
}, [filters]);

  // ✅ Filter logic
const handleFilterChange = (field, value, checked) => {
  setFilters((prev) => {
    const updated = { ...prev };
    if (checked) {
      updated[field] = [...prev[field], value];
    } else {
      updated[field] = prev[field].filter((v) => v !== value);
    }
    return updated;
  });
};

  useEffect(() => {
    let result = [...profiles];

    // Gender filter
    if (filters.gender.length > 0) {
      result = result.filter((p) => filters.gender.includes(p.gender));
    }

    // Age range filter
    if (filters.ageRange.length > 0) {
      result = result.filter((p) => {
        if (!p.age) return false;
        return filters.ageRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return p.age >= min && p.age <= max;
        });
      });
    }

    // Hair color, body type, beard, eye color
    ["hair_color", "body_type", "beard", "eye_color"].forEach((field) => {
      if (filters[field].length > 0) {
        result = result.filter((p) => filters[field].includes(p[field]));
      }
    });

    setFilteredProfiles(result);
  }, [filters, profiles]);

  return (
    <div className="p-4 max-w-7xl mx-auto mb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center sm:text-left">
          Profiles
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 sm:w-auto border rounded-md"
          >
            <img src={icons.Filter} alt="filter" className="w-5 h-5" />
          </button>

          <div className="w-full sm:w-auto">
            <CategorySelector
              label="Sort by"
              options={[
                "All",
                "ACTORS & ACTRESS",
                "FASHION MODELS",
                "KIDS",
                "INFLUENCERS",
                "VOICE OVER",
                "DANCERS",
                "Freelance Foreigners",
                "Talent Agencies",
                "Theater Artist",
              ]}
              selected={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-6 lg:sticky lg:top-4 lg:h-fit">
        <FilterSection2
  title="Gender"
  options={["Male", "Female", "Other"]}
  icon={FaUser}
  selectedOptions={filters.gender}   // ✅ pass state
  onChange={(v, c) => handleFilterChange("gender", v, c)}
/>
          <FilterSection
            title="Age"
            options={["0-2", "3-5", "6-9", "10-13", "14-17", "18-24"]}
            icon={FaChild}
            onChange={(v, c) => handleFilterChange("ageRange", v, c)}
          />
          <FilterSection
            title="Hair Color"
            options={[
              "Black",
              "Golden",
              "Silver",
              "Copper",
              "Bronze",
              "Blue",
              "Wood Finish",
            ]}
            icon={FaPalette}
            onChange={(v, c) => handleFilterChange("hair_color", v, c)}
          />
          <FilterSection
            title="Body Type"
            options={[
              "Slim",
              "Average",
              "Healthy",
              "Chubby",
              "Short Height",
              "Athletic",
            ]}
            icon={FaPalette}
            onChange={(v, c) => handleFilterChange("body_type", v, c)}
          />
          <FilterSection
            title="Beard"
            options={["None", "Short", "Medium", "Long", "Styled"]}
            icon={FaPalette}
            onChange={(v, c) => handleFilterChange("beard", v, c)}
          />
          <FilterSection
            title="Eye Color"
            options={["Black", "Brown", "Blue", "Green", "Hazel", "Grey"]}
            icon={FaPalette}
            onChange={(v, c) => handleFilterChange("eye_color", v, c)}
          />
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, idx) => (
              <ProfileCard
                key={idx}
                name={profile.name}
                age={profile.age}
                gender={profile.gender}
                location={profile.city}
                image={profile.image}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No profiles found</p>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/20 z-50 flex">
          <div className="w-72 bg-white p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-6">
              {/* Reuse FilterSection here */}
              <FilterSection
                title="Gender"
                options={["Male", "Female", "Other"]}
                icon={FaUser}
                onChange={(v, c) => handleFilterChange("gender", v, c)}
              />
              <FilterSection
                title="Age"
                options={["0-2", "3-5", "6-9", "10-13", "14-17", "18-24"]}
                icon={FaChild}
                onChange={(v, c) => handleFilterChange("ageRange", v, c)}
              />
              <FilterSection
                title="Hair Color"
                options={[
                  "Black",
                  "Golden",
                  "Silver",
                  "Copper",
                  "Bronze",
                  "Blue",
                  "Wood Finish",
                ]}
                icon={FaPalette}
                onChange={(v, c) => handleFilterChange("hair_color", v, c)}
              />
              <FilterSection
                title="Body Type"
                options={[
                  "Slim",
                  "Average",
                  "Healthy",
                  "Chubby",
                  "Short Height",
                  "Athletic",
                ]}
                icon={FaPalette}
                onChange={(v, c) => handleFilterChange("body_type", v, c)}
              />
              <FilterSection
                title="Beard"
                options={["None", "Short", "Medium", "Long", "Styled"]}
                icon={FaPalette}
                onChange={(v, c) => handleFilterChange("beard", v, c)}
              />
              <FilterSection
                title="Eye Color"
                options={["Black", "Brown", "Blue", "Green", "Hazel", "Grey"]}
                icon={FaPalette}
                onChange={(v, c) => handleFilterChange("eye_color", v, c)}
              />
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowFilters(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
