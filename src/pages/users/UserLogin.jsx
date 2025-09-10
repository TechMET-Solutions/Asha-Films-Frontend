import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { icons, images } from "../../assets";
import Input from '../../components/ui/Input';
import { API } from '../../api';
import { useAuth } from '../../context/AuthContext';

const UserLogin = () => {
  // const [credentials, setCredentials] = useState({
  //   identifier: '',
  //   password: ''
  // });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCredentials(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Basic client-side validation
  //   if (!credentials.identifier || !credentials.password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post(`${API}/api/user/login`, {
  //       identifier: credentials.identifier, // Changed to match backend
  //       password: credentials.password
  //     });

  //     if (response.data.success) {

  //       console.log(response.data)
  //       console.log(response.data.token)
  //       console.log(response.data.user)
  //       // Store token and user data
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //       navigate("/user/dashboard");

  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.identifier || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await login(credentials);

    if (result.success) {
      navigate("/user/popular-casting-calls");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-white shadow-lg overflow-hidden md:h-[90vh]">

        {/* Left side image */}
        <div className="bg-[#C77496] hidden md:flex justify-center items-center p-8">
          <img
            src={images.loginpage}
            alt="Login Illustration"
            className="max-w-md object-contain h-full"
          />
        </div>

        {/* Right side form */}
        <div className="flex flex-col justify-center items-center p-6">
          <div className="flex justify-center mb-4">
            <img src={icons.logo} alt="Logo" className="h-12" />
          </div>

          <h5 className="text-lg font-medium text-center mb-1">
            Good to See You Again!
          </h5>
          <p className="text-sm text-gray-600 text-center mb-6">
            You bring the vision. We bring the talent.
          </p>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
            <Input
              type="text"
              name="identifier"  // Changed from email to identifier
              placeholder="Email or Phone Number*"
              value={credentials.identifier}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password*"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-[#8B3C68] focus:ring-[#8B3C68] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a
                href="/user/forgot-password"
                className="text-sm text-[#8B3C68] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full text-white font-medium py-2 rounded-md shadow 
                        bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                        hover:opacity-90 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full border border-[#2D2D2D] py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a
              href="/user/register"
              className="text-[#8B3C68] font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;