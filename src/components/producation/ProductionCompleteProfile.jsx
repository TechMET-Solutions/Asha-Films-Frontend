import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
// Keep using your Input component; native checkboxes are used for bulletproof rendering
import Input from "../ui/Input";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const booleanKeys = [
  "is_casting_director",
  "is_production_house",
  "is_ad_agency",
  "is_event_agency",
  "is_theater_group",
  "is_studio",
  "is_talent_agency",
  "works_tv",
  "works_film",
  "works_ott",
  "works_ads",
  "works_print",
  "works_theatre",
  "works_events",
];

// Convert whatever comes from API ("1","0","true","false", 1,0, true,false, null) → boolean
const normalizeBool = (v) => {
  if (typeof v === "boolean") return v;
  if (v === 1 || v === "1") return true;
  if (v === 0 || v === "0") return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true") return true;
    if (s === "false") return false;
  }
  // Default safe fallback
  return false;
};

// Convert boolean → "1"/"0" for multipart/form-data so backend reads them reliably
const toFormBool = (b) => (b ? "1" : "0");

const CheckboxField = ({ name, label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      name={name}
      checked={!!checked}
      onChange={onChange}
      className="w-5 h-5 accent-[#8B3C68] cursor-pointer"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

const ProductionCompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    owner_name: "",
    email: "",
    phone_number: "",
    alternate_contact: "",
    location: "",
    website_url: "",
    type_of_work: "",
    // flags
    is_casting_director: false,
    is_production_house: false,
    is_ad_agency: false,
    is_event_agency: false,
    is_theater_group: false,
    is_studio: false,
    is_talent_agency: false,
    works_tv: false,
    works_film: false,
    works_ott: false,
    works_ads: false,
    works_print: false,
    works_theatre: false,
    works_events: false,
  });

  // Text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Checkbox inputs
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Fetch profile
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/production/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.production_house || {};
        // Map everything; normalize booleans robustly
        const next = {
          company_name: data.company_name || "",
          owner_name: data.owner_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          alternate_contact: data.alternate_contact || "",
          location: data.location || "",
          website_url: data.website_url || "",
          type_of_work: data.type_of_work || "",
          is_casting_director: normalizeBool(data.is_casting_director),
          is_production_house: normalizeBool(data.is_production_house),
          is_ad_agency: normalizeBool(data.is_ad_agency),
          is_event_agency: normalizeBool(data.is_event_agency),
          is_theater_group: normalizeBool(data.is_theater_group),
          is_studio: normalizeBool(data.is_studio),
          is_talent_agency: normalizeBool(data.is_talent_agency),
          works_tv: normalizeBool(data.works_tv),
          works_film: normalizeBool(data.works_film),
          works_ott: normalizeBool(data.works_ott),
          works_ads: normalizeBool(data.works_ads),
          works_print: normalizeBool(data.works_print),
          works_theatre: normalizeBool(data.works_theatre),
          works_events: normalizeBool(data.works_events),
        };

        setFormData(next);

        // If backend returns a relative path, you may need to prefix with API host.
        if (data.image) {
          setImagePreview(data.image);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Save
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const token = localStorage.getItem("token");

      const submitData = new FormData();
      // append strings
      submitData.append("company_name", formData.company_name);
      submitData.append("owner_name", formData.owner_name);
      submitData.append("email", formData.email);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("alternate_contact", formData.alternate_contact);
      submitData.append("location", formData.location);
      submitData.append("website_url", formData.website_url);
      submitData.append("type_of_work", formData.type_of_work);

      // append boolean flags as "1"/"0" so backend (without changes) reads them reliably
      booleanKeys.forEach((k) => submitData.append(k, toFormBool(!!formData[k])));

      if (imageFile) submitData.append("image", imageFile);

      const res = await axios.put(`${API}/api/production/profile`, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Re-normalize response
      const ph = res.data?.production_house || {};
      setFormData((prev) => {
        const updated = { ...prev };
        booleanKeys.forEach((k) => (updated[k] = normalizeBool(ph[k])));
        return {
          ...updated,
          company_name: ph.company_name || "",
          owner_name: ph.owner_name || "",
          email: ph.email || "",
          phone_number: ph.phone_number || "",
          alternate_contact: ph.alternate_contact || "",
          location: ph.location || "",
          website_url: ph.website_url || "",
          type_of_work: ph.type_of_work || "",
        };
      });
      if (ph.image) setImagePreview(ph.image);

      toast.success("Profile updated successfully!");
      navigate("/production/add-job")
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // wflevdbkj
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_photo: file,
          profilePhotoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <div className="w-full h-screen bg-white overflow-y-auto px-16 py-10">

              {/* Profile Section */}
        <div className="flex items-center gap-4 p-6 shadow-md relative">

          {/* Profile Image */}
          <div className="relative w-28 h-28">
            {/* Progress Ring */}
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="52"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="52"
                stroke="#8B3C68"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
                strokeLinecap="round"
              />
            </svg>

            {/* Profile Image Upload */}
            <label htmlFor="profile-upload" className="cursor-pointer block w-full h-full">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Progress Text */}
            {/* <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#8B3C68]">
              {progress}%
            </span> */}
          </div>


          {/* Company Info */}
          <div className="text-start ml-4">
            <h2 className="text-xl font-bold text-gray-800">
              {formData.company_name || "Company / Agency Name"}
            </h2>
            <p className="text-sm text-gray-600">
              Profile Type : {formData.type_of_work || "Casting Director"}
            </p>
          </div>
        </div>


      <form onSubmit={onSubmit} className="space-y-8 mt-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Basic Company Information */}
        <div>
          <h2 className="text-lg font-semibold text-[#8B3C68] mb-4">Basic Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company/Agency Name**" required />
            <Input name="owner_name" value={formData.owner_name} onChange={handleChange} placeholder="Owner / Representative Name**" required />
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address*" required />
            <Input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number (WhatsApp preferred)*" required />
            <Input name="alternate_contact" value={formData.alternate_contact} onChange={handleChange} placeholder="Alternate Contact*" />
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location*" required />
            <Input name="website_url" value={formData.website_url} onChange={handleChange} placeholder="Website / Portfolio URL" />
          </div>
        </div>

        {/* Company Type */}
        <div>
          <h2 className="text-lg font-semibold text-[#8B3C68] mb-4">Company Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Casting Director", field: "is_casting_director" },
              { label: "Production House", field: "is_production_house" },
              { label: "Ad Agency", field: "is_ad_agency" },
              { label: "Event Agency", field: "is_event_agency" },
              { label: "Theater Group", field: "is_theater_group" },
              { label: "Studio", field: "is_studio" },
              { label: "Talent Agency", field: "is_talent_agency" },
            ].map((opt) => (
              <CheckboxField
                key={opt.field}
                name={opt.field}
                label={opt.label}
                checked={formData[opt.field]}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        {/* Industries Served */}
        <div>
          <h2 className="text-lg font-semibold text-[#8B3C68] mb-4">Industries Served</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {[
              { label: "TV", field: "works_tv" },
              { label: "Film", field: "works_film" },
              { label: "OTT", field: "works_ott" },
              { label: "Ads", field: "works_ads" },
              { label: "Print", field: "works_print" },
              { label: "Theater", field: "works_theatre" },
              { label: "Event", field: "works_events" },
            ].map((opt) => (
              <CheckboxField
                key={opt.field}
                name={opt.field}
                label={opt.label}
                checked={formData[opt.field]}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-[#8B3C68] text-white font-semibold px-8 py-2 rounded-xl hover:bg-[#7A2D57] disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save and Go back"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductionCompleteProfile;
