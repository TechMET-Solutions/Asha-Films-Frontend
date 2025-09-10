import { useState } from 'react';
import axios from 'axios'; // Added missing import
import { icons, images } from "../../assets";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { API } from '../../api';

const ProductionRegister = () => {
  const [formData, setFormData] = useState({
    gstNo: '',
    panNo: '',
    aadhaarNo: '',
    companyName: '',
    workType: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post(`${API}/api/production/register`, {
  //       gstNo: formData.gstNo,
  //       panNo: formData.panNo, // Changed from pan_no to panNo
  //       aadhaarNo: formData.aadhaarNo, // Changed from aadhaar_no to aadhaarNo
  //       companyName: formData.companyName, // Changed from name to companyName
  //       workType: formData.workType, // Added missing workType
  //       email: formData.email,
  //       phone: formData.phone, // Changed from mobile to phone
  //       password: formData.password
  //     });

  //     if (response.data.success) {
  //       navigate('/production/verify', { state: { email: formData.email } });
  //     } else {
  //       setError(response.data.message || 'Registration failed');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Registration failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post(`${API}/api/production/register`, {
      gst_no: formData.gstNo,        // Changed from gstNo to gst_no
      pan_no: formData.panNo,        // Changed from panNo to pan_no
      aadhaar_no: formData.aadhaarNo, // Changed from aadhaarNo to aadhaar_no
      company_name: formData.companyName, // Changed from companyName to company_name
      type_of_work: formData.workType, // Changed from workType to type_of_work
      email: formData.email,
      phone_number: formData.phone,   // Changed from phone to phone_number
      password: formData.password
    });

    if (response.data.success) {
      navigate('/production/verify', { state: { email: formData.email } });
    } else {
      setError(response.data.message || 'Registration failed');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const workTypeOptions = [
    'Film Production',
    'TV Production',
    'Advertisement',
    'Other'
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white shadow-lg md:h-[95vh] overflow-hidden">

        {/* Left side image */}
        <div className="bg-[#8B3C68] hidden md:flex justify-center items-center p-8">
          <img src={images.registerpage} alt="Register Illustration" className="max-w-md" />
        </div>

        {/* Right side form */}
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex justify-center mb-4">
            <img src={icons.logo} alt="Logo" className="h-12" />
          </div>

          <p className="text-center mb-3">
            Create Your Account and Begin Casting with Confidence.
          </p>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs">
            <Input
              type="text"
              name="gstNo"
              placeholder="GST No"
              value={formData.gstNo}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <Input
              type="text"
              name="panNo"
              placeholder="PAN No*"
              value={formData.panNo}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="text"
              name="aadhaarNo"
              placeholder="Aadhar Card*"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="text"
              name="companyName"
              placeholder="Company/Production name"
              value={formData.companyName}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <Select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              options={workTypeOptions}
              placeholder="Type Of Work*"
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email Id*"
              value={formData.email}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              value={formData.phone}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#8B3C68] text-white font-medium py-2 text-sm rounded-md shadow hover:bg-[#732d55] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'SEND OTP'}
            </button>

            <button
              type="button"
              className="w-full border border-[#2D2D2D] py-2 text-sm rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-4 w-4" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs mt-2">
            Already have an account?{" "}
            <a href="/production/login" className="text-[#8B3C68] font-medium hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductionRegister;