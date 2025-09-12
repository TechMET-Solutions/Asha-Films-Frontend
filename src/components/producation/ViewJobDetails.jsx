// src/components/ViewJobDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { API } from "../../api";

const ViewJobDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // job id from URL

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch job details
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${API}/api/production/jobs/${id}`);

                console.log(res.data)
                if (res.data.success) {
                    setJob(res.data.job);
                }
            } catch (error) {
                console.error("❌ Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const calculateDaysLeft = (deadline) => {
        if (!deadline) return "N/A";
        const today = new Date();
        const end = new Date(deadline);
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    if (loading) {
        return <p className="text-center mt-10">Loading job details...</p>;
    }

    if (!job) {
        return <p className="text-center mt-10 text-red-600">Job not found</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Back */}
            <div className="text-xl font-bold text-primary mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center hover:underline"
                >
                    <FaArrowLeft className="mr-2" /> {job.project_type || "Job Details"}
                </button>
            </div>

            {/* Image */}
            <div className="w-full h-52 bg-gray-200 overflow-hidden mb-6 rounded-lg">
                <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Project Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p><span className="font-semibold">Project Type:</span> {job.project_type}</p>
                    <p><span className="font-semibold">Production House:</span> {job.production_house_name}</p>
                    <p><span className="font-semibold">Location:</span> {job.city_location}</p>
                    <p><span className="font-semibold">Shoot Dates:</span> {job.shoot_dates}</p>
                    <p><span className="font-semibold">Casting By:</span> {job.casting_by}</p>
                </div>

                {/* Right Side Box */}
                <div className="p-4 space-y-4 flex flex-col items-end">
                    <p className="w-[160px] bg-white text-primary border-2 border-primary py-2 text-center">{calculateDaysLeft(job.audition_dates)} Days to Expire</p>
                    <button className="w-[160px] bg-white text-primary border-2 border-primary py-2">
                        Applicants
                    </button>
                </div>
            </div>

            {/* Role Details */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{job.role_title}</h2>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li><span className="font-semibold">Age:</span> {job.age_range}</li>
                    <li><span className="font-semibold">Look:</span> {job.look}</li>
                    <li><span className="font-semibold">Skills:</span> {job.skills_needed}</li>
                    <li><span className="font-semibold">Language:</span> {job.language_required}</li>
                </ul>
            </div>

            {/* Contact Details */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Details</h2>
                <div className="space-y-2 text-gray-700">
                    <p className="flex items-center"><FaEnvelope className="mr-2" /> {job.email}</p>
                    <p className="flex items-center"><FaPhoneAlt className="mr-2" /> {job.mobile}</p>
                    <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {job.city_location}</p>
                </div>
            </div>

            {/* Audition Info */}
            <div className="mt-8 flex-col gap-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Audition dates / Duration</h2>
                    <p>{job.audition_dates}</p>
                    <p>{job.audition_end_date}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Audition Type</h2>
                    <p>{job.audition_type}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewJobDetails;
