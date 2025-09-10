import { useState } from 'react';
import { icons, images } from "../../assets";
import Input from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../api';

const ProductionLogin = () => {
  const [credentials, setCredentials] = useState({
    identifier: '', // Changed from email to identifier
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!credentials.identifier || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API}/api/production/login`, {
        identifier: credentials.identifier, // Changed to match backend
        password: credentials.password
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("production_house", JSON.stringify(response.data.production_house));
        navigate("/production/add-job");

      }
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';

      if (err.response) {
        // Handle different status codes from backend
        switch (err.response.status) {
          case 400:
            errorMessage = 'Email/Phone and password are required';
            break;
          case 401:
            errorMessage = 'Invalid credentials';
            break;
          case 403:
            errorMessage = 'Please verify your account first';
            break;
          case 404:
            errorMessage = 'Account not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Check your connection.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Implement proper Google OAuth flow
    window.location.href = `${API}/api/auth/google/production`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-white shadow-lg overflow-hidden rounded-lg">

        {/* Left side image */}
        <div className="bg-gradient-to-b from-[#db8faf] to-[#CF628F] hidden md:flex justify-center items-center p-8">
          <img
            src={images.loginpage}
            alt="Login Illustration"
            className="max-w-md w-full h-auto object-contain"
          />
        </div>

        {/* Right side form */}
        <div className="flex flex-col justify-center items-center p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <img src={icons.logo} alt="Logo" className="h-14" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            You bring the vision. We bring the talent.
          </p>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm w-full max-w-xs">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-xs">
            <div className="space-y-4">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

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
                href="/production/forgot-password"
                className="text-sm text-[#8B3C68] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full text-white font-medium py-2.5 rounded-lg shadow-md
                           bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                           hover:opacity-90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'LOG IN'}
              </button>
            </div>

            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>
          </form>

          <div className="text-center text-sm mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/production/register"
                className="text-[#8B3C68] font-medium hover:underline hover:text-[#6d2d54]"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionLogin;