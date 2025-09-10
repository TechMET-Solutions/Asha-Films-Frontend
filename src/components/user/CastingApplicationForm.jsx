import React, { useState, useEffect } from "react";
import { LuChevronLeft } from "react-icons/lu";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";
import RadioGroup from "../ui/RadioGroup";
import FormButton from "../ui/FormButton";
import axios from "axios";
import { API } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const CastingApplicationForm = () => {
    const { jobId, jobType } = useParams();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        location: "",
        height: "",
        weight: "",
        skinTone: "",
        hairColor: "",
        eyeColor: "",
        bodyType: "",
        actingExperience: "",
        keySkills: "",
        previousWork: "",
        courses: "",
        headshot: "",
        fullPhoto: "",
        auditionVideo: "",
        portfolioLink: "",
        instagramLink: "",
        roleInfo: "",
        travelRelocation: "",
        specifiedDates: "",
        consent1: false,
        consent2: false,
        consent3: false,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(jobId)
    console.log(jobType)

    // ✅ Fetch profile and prefill
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success) {
                    const user = res.data.user;
                    setFormData((prev) => ({
                        ...prev,
                        fullName: user.name || "",
                        email: user.email || "",
                        phone: user.mobile || "",
                        dob: user.date_of_birth || "",
                        gender: user.gender || "",
                        location: user.city || "",
                        height: user.height || "",
                        weight: user.weight || "",
                        skinTone: user.skin_tone || "",
                        hairColor: user.hair_color || "",
                        eyeColor: user.eye_color || "",
                        bodyType: user.body_type || "",
                        actingExperience: user.acting_experience || "",
                        keySkills: user.skills || "",
                        previousWork: user.previous_work || "",
                        courses: user.courses || "",
                        headshot: user.headshot_image || "",
                        fullPhoto: user.full_image || "",
                        auditionVideo: user.audition_video || "",
                        portfolioLink: user.portfolio_link || "",
                        instagramLink: user.instagram_link || "",
                    }));
                }
            } catch (error) {
                console.error("❌ Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // ✅ Handle form changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ Submit job application
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobId) {
            alert("❌ Job ID is missing. Please try again from a valid casting call.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const payload = {
                job_id: jobId, // ✅ Now always from URL
                role_specific_info: formData.roleInfo,
                travel: formData.travelRelocation === "Yes",
                availability: formData.specifiedDates === "Yes",
            };

            const res = await axios.post(`${API}/api/user/job-apply`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                alert("✅ Application submitted successfully!");
                navigate(-1);
            }
        } catch (error) {
            console.error("❌ Error submitting application:", error);
            alert(error.response?.data?.message || "Failed to submit application.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white p-4">
            <div className="text-primary mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <LuChevronLeft
                        className="text-2xl cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="font-bold text-2xl">
                        Apply for {jobType || "this role"}
                        
                    </h1>
                </div>
                <p className="text-primary text-lg">
                    Submit your details carefully. A complete profile improves your
                    chances.
                </p>
            </div>

            <form
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-6"
                onSubmit={handleSubmit}
            >
                {/* Column 1 - Personal Details & Appearance */}
                <div className="w-full space-y-6">
                    <div className="text-lg font-semibold text-primary">• Personal Details</div>
                    <Input placeholder="Full Name*" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <Input placeholder="Email Address*" name="email" value={formData.email} onChange={handleChange} />
                    <Input placeholder="Phone Number*" name="phone" value={formData.phone} onChange={handleChange} />
                    <Input placeholder="Date of Birth*" name="dob" value={formData.dob} onChange={handleChange} />
                    <Select name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender*" options={['Male', 'Female', 'Non-binary']} />
                    <Input placeholder="Current City / Location*" name="location" value={formData.location} onChange={handleChange} />

                    <div className="text-lg font-semibold text-primary mt-6">• Appearance Details</div>
                    <Input placeholder="Height*" name="height" value={formData.height} onChange={handleChange} />
                    <Input placeholder="Weight*" name="weight" value={formData.weight} onChange={handleChange} />
                    <Input placeholder="Skin Tone*" name="skinTone" value={formData.skinTone} onChange={handleChange} />
                    <Input placeholder="Hair Color*" name="hairColor" value={formData.hairColor} onChange={handleChange} />
                    <Input placeholder="Eye Color*" name="eyeColor" value={formData.eyeColor} onChange={handleChange} />
                    <Input placeholder="Body Type*" name="bodyType" value={formData.bodyType} onChange={handleChange} />
                </div>

                {/* Column 2 - Talent & Media Upload */}
                <div className="w-full space-y-6">
                    <div className="text-lg font-semibold text-primary">• Talent & Experience</div>
                    <Input placeholder="Acting Experience*" name="actingExperience" value={formData.actingExperience} onChange={handleChange} />
                    <Input placeholder="Key Skills*" name="keySkills" value={formData.keySkills} onChange={handleChange} />
                    <Input placeholder="Previous Notable Work*" name="previousWork" value={formData.previousWork} onChange={handleChange} />
                    <Input placeholder="Training / Courses*" name="courses" value={formData.courses} onChange={handleChange} />

                    <div className="text-lg font-semibold text-primary">• Media Upload</div>
                    <Input placeholder="Headshot (Close-up)*" name="headshot" value={formData.headshot} onChange={handleChange} />
                    <Input placeholder="Full Photo*" name="fullPhoto" value={formData.fullPhoto} onChange={handleChange} />
                    <Input placeholder="Audition Video / Intro*" name="auditionVideo" value={formData.auditionVideo} onChange={handleChange} />
                    <Input placeholder="Portfolio / Show reel Link*" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} />
                    <Input placeholder="Instagram / Social Media Link*" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />

                    <div className="text-lg font-semibold text-primary">• Role-Specific Information</div>
                    <Input placeholder="Why do you think you are suitable for this role?" name="roleInfo" value={formData.roleInfo} onChange={handleChange} />
                </div>

                {/* Column 3 - Right Side Options */}
                <div className="w-full space-y-6">
                    <div className="mt-6 space-y-4">
                        <div>Are you comfortable with travel / relocation?</div>
                        <RadioGroup name="travelRelocation" options={['Yes', 'No']} value={formData.travelRelocation} onChange={handleChange} />

                        <div>Are you available on specified dates?</div>
                        <RadioGroup name="specifiedDates" options={['Yes', 'No']} value={formData.specifiedDates} onChange={handleChange} />
                    </div>

                    <div className="text-lg font-semibold text-primary mt-6">• Consent & Declaration</div>
                    <Checkbox label="I confirm all information is true." name="consent1" checked={formData.consent1} onChange={handleChange} />
                    <Checkbox label="I authorize this platform to contact me." name="consent2" checked={formData.consent2} onChange={handleChange} />
                    <Checkbox label="I agree to the Terms & Conditions." name="consent3" checked={formData.consent3} onChange={handleChange} />

                    <div className="mt-6">
                        <FormButton type="submit" label={loading ? "Submitting..." : "Submit Application"} disabled={loading} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CastingApplicationForm;
