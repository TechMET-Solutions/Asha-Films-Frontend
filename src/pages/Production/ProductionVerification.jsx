import { useEffect, useRef, useState } from 'react';
import { gif, icons, images } from '../../assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../api';
import axios from 'axios';


const ProductionVerification = () => {
  const inputsRef = useRef([]);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from location state (passed from register page)
  const email = location.state?.email || '';
  
  // If email is not available, redirect back to register
  useEffect(() => {
    if (!email) {
      navigate('/production/register');
    }
  }, [email, navigate]);

  // Handle OTP input changes
  const handleInput = (e, index) => {
    const value = e.target.value;
    
    // Only allow numeric values
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
    
    // Auto-focus to previous input on backspace
    if (value.length === 0 && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle verify click
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/api/production/verify`, {
        email,
        otp: otpCode
      });
      
      if (response.data.success) {
        setIsVerified(true);
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/production/login');
        }, 2000);
      } else {
        setError(response.data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/api/production/resend`, { email });
      
      if (response.data.success) {
        setCountdown(60); // Reset countdown
        startCountdown();
      } else {
        setError(response.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };

  // Start countdown on component mount
  useEffect(() => {
    const cleanup = startCountdown();
    return cleanup;
  }, []);

  // Mask email for display
  const maskedEmail = email ? email.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + b.replace(/./g, '*')) : '';


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-white shadow-lg md:border-gray-400 overflow-hidden md:h-[90vh]">
        
        {/* Left side image */}
        <div className="bg-[#C77496] hidden md:flex justify-center items-center p-8">
          <img src={images.verfiypage} alt="Email Verification" className="max-w-md" />
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center items-center p-6 relative">
          {!isVerified ? (
            <>
              <div className="flex justify-center mb-4">
                <img src={icons.logo} alt="Logo" className="h-12" />
              </div>

              <h5 className="text-lg font-medium text-center mb-2">
                Email Verification
              </h5>
              <p className="text-sm text-gray-600 text-center mb-6">
                Introduce the 4 digit verification code sent <br />
                to ******@gmail.com
              </p>

              {/* OTP Input Fields */}
              <form className="flex gap-3 justify-center mb-6">
                {Array(6).fill(0).map((_, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputsRef.current[idx] = el)}
                    onChange={(e) => handleInput(e, idx)}
                    className="w-10 h-10 border border-gray-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                ))}
              </form>

              <p className="text-sm text-gray-500 mb-4">
                Resend Code? <span className="text-black">00:59</span>
              </p>

              <button
                onClick={handleVerify}
                className="w-40 text-white font-medium py-2 rounded-md shadow 
                          bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                          hover:opacity-90 transition"
              >
                VERIFY
              </button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-md p-8 text-center">
              <img src={gif.verify} alt="Success" className="w-24 h-24 mb-4" />
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                Verification Successful!
              </h5>
              <p className="text-sm text-gray-600">
                You Can Now Continue To The Next Step.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionVerification;