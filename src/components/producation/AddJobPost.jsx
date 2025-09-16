import React, { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { FormButton } from "../ui";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../api";

const initialState = {
  projectType: "",
  projectDescription: "",
  languageRequired: "",
  roleTitle: "",
  roleType: "",
  gender: "",
  ageRange: "",
  height: "",
  bodyType: "",
  skillsNeeded: "",
  roleDescription: "",
  phoneNumber: "",
  email: "",
  city: "",
  auditionType: "",
  auditionDates: "",
  shootDates: "",
  shootDuration: "",
  applicationDeadline: "",
  availability: "",
  compensation: "",
  appPhoto: null,
};

const AddJobPost = () => {
  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, appPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 drag-drop file
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, appPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token"); // ✅ adjust if stored differently

      // FormData (for text + file)
      const fd = new FormData();
      fd.append("project_type", formData.projectType);
      fd.append("project_description", formData.projectDescription);
      fd.append("language_required", formData.languageRequired);
      fd.append("role_details", formData.roleTitle);
      fd.append("role_type", formData.roleType);
      fd.append("gender", formData.gender);
      fd.append("age_range", formData.ageRange);
      fd.append("height", formData.height);
      fd.append("body_type", formData.bodyType);
      fd.append("skills_needed", formData.skillsNeeded);
      fd.append("role_description", formData.roleDescription);
      fd.append("phone_number", formData.phoneNumber);
      fd.append("email", formData.email);
      fd.append("city_location", formData.city);
      fd.append("audition_type", formData.auditionType);
      fd.append("audition_dates", formData.auditionDates);
      fd.append("shoot_dates", formData.shootDates);
      fd.append("shoot_duration", formData.shootDuration);
      fd.append("application_deadline", formData.applicationDeadline);
      fd.append("availability_required", formData.availability);
      fd.append("compensation", formData.compensation);

      if (formData.appPhoto) {
        fd.append("image", formData.appPhoto);
      }

      // 🔹 send request
      await axios.post(
        `${API}/api/production/jobs`, // ✅ adjust API URL
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job Post Added Successfully 🎉");
      setFormData(initialState);
      setPreview(null);
    } catch (error) {
      console.error("❌ Job post error:", error);
      toast.error(error.response?.data?.message || "Failed to add job post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Column 1 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">• Project Information</h2>
          <Input
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            placeholder="Project Type (e.g. Movie, Ad, Short Film, etc)*"
          />
          <Input
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Project Description*"
          />
          <Input
            name="languageRequired"
            value={formData.languageRequired}
            onChange={handleChange}
            placeholder="Language Required*"
          />

          <h2 className="text-lg font-semibold text-primary mt-8">• Role Details</h2>
          <Input
            name="roleTitle"
            value={formData.roleTitle}
            onChange={handleChange}
            placeholder="Role Title (e.g Lead Male, Dancer, Supporting Role)*"
          />
          <Select
            name="roleType"
            value={formData.roleType}
            onChange={handleChange}
            placeholder="Role Type*"
            options={["Primary", "Secondary", "Tertiary"]}
          />
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender (Male/Female/Any)*"
            options={["Male", "Female", "Other"]}
          />
          <Input
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
            placeholder="Age Range*"
          />
          <Input
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height*"
          />
          <Input
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
            placeholder="Body Type*"
          />
          <Input
            name="skillsNeeded"
            value={formData.skillsNeeded}
            onChange={handleChange}
            placeholder="Skills Needed (e.g Dancing, Singing, Martial Arts, Hosting)*"
          />
          <Input
            name="roleDescription"
            value={formData.roleDescription}
            onChange={handleChange}
            placeholder="Role Description / Character Brief*"
          />
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number*"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID*"
          />
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">• Logistics</h2>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City / Shooting Location*"
          />

          <Select
            name="auditionType"
            value={formData.auditionType}
            onChange={handleChange}
            placeholder="Select Audition Type*"
            options={["Online", "Offline", "Self-tape"]}
          />

          <Input
            type="date"
            name="auditionDates"
            value={formData.auditionDates}
            onChange={handleChange}
            placeholder="Audition Dates*"
          />
          <Input
            type="date"
            name="shootDates"
            value={formData.shootDates}
            onChange={handleChange}
            placeholder="Shoot Dates*"
          />
          <Input
            name="shootDuration"
            value={formData.shootDuration}
            onChange={handleChange}
            placeholder="Shoot Duration (e.g, 3 days, 1 week, etc.)*"
          />
          <Input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            placeholder="Application Deadline*"
          />
          <Select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Availability Required (Full-time/ Part-time/ Flexible)*"
            options={["Full-time", "Part-time", "Flexible"]}
          />

          <h2 className="text-lg font-semibold text-primary mt-8">• Compensation</h2>
          <Input
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
            placeholder="Paid / Unpaid / Profit Share / Other"
          />

       

          <FormButton
            type="submit"
            label={isSubmitting ? "Submitting..." : "Add Job Post"}
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default AddJobPost;
