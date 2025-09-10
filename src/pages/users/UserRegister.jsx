import { useState } from 'react';
import { icons, images } from "../../assets";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import axios from 'axios';
import { API } from '../../api';
import { useAuth } from '../../context/AuthContext';

const UserRegister = () => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   mobile: '',
  //   password: '',
  //   pan_no: '',
  //   aadhaar_no: ''
  // });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post(`${API}/api/user/register`, {
  //       pan_no: formData.pan_no,
  //       aadhaar_no: formData.aadhaar_no,
  //       name: formData.name,
  //       email: formData.email,
  //       mobile: formData.mobile,
  //       password: formData.password
  //     });

  //     if (response.data.success) {
  //       navigate('/user/verify', { state: { email: formData.email } });
  //     } else {
  //       setError(response.data.message || 'Registration failed');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Registration failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    pan_no: '',
    aadhaar_no: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await register(formData);

    if (result.success) {
      navigate('/user/verify', { state: { email: formData.email } });
    } else {
      setError(result.message || 'Registration failed');
    }

    setLoading(false);
  };

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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs">
            <Input
              type="text"
              name="pan_no"
              placeholder="PAN Number*"
              value={formData.pan_no}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="text"
              name="aadhaar_no"
              placeholder="Aadhaar Number*"
              value={formData.aadhaar_no}
              onChange={handleChange}
              className="border-[#2D2D2D] rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <Input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
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
              name="mobile"
              placeholder="Phone Number*"
              value={formData.mobile}
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
            <a href="/user/login" className="text-[#8B3C68] font-medium hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;