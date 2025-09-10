import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { icons, images } from '../../assets';
import { Input } from '../../components/ui';
import { API } from '../../api';


function UserForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API}/api/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send OTP');
            }

            setStep(2); // Move to OTP verification step
            setSuccess(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp) {
            setError('OTP is required');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API}/api/user/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid OTP');
            }

            setStep(3); // Move to password reset step
            setSuccess(false);
        } catch (err) {
            console.error('OTP verification error:', err);
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API}/api/user/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            setSuccess(true);
            setTimeout(() => navigate('/user/login'), 2000);
        } catch (err) {
            console.error('Password reset error:', err);
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
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
                        {step === 1 ? 'Forgot Password' : 
                         step === 2 ? 'Verify OTP' : 'Reset Password'}
                    </h5>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        {step === 1 ? 'Enter your email to receive a reset code' : 
                         step === 2 ? 'Enter the OTP sent to your email' : 
                         'Enter your new password'}
                    </p>

                    {/* Success message */}
                    {success && step === 1 && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
                            OTP sent successfully! Check your email.
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Email input */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-4 w-full max-w-xs">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full text-white font-medium py-2 rounded-md shadow 
                                bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                                hover:opacity-90 transition disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'SEND OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP verification */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4 w-full max-w-xs">
                            <Input
                                type="text"
                                name="otp"
                                placeholder="OTP Code*"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full text-white font-medium py-2 rounded-md shadow 
                                bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                                hover:opacity-90 transition disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'VERIFY OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 3: Password reset */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4 w-full max-w-xs">
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="New Password*"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />

                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password*"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full text-white font-medium py-2 rounded-md shadow 
                                bg-gradient-to-b from-[#db8faf] to-[#CF628F] 
                                hover:opacity-90 transition disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Resetting...' : 'RESET PASSWORD'}
                            </button>
                        </form>
                    )}

                    <p className="text-center text-sm mt-4">
                        Remember your password?{" "}
                        <a
                            href="/login"
                            className="text-[#8B3C68] font-medium hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserForgotPassword;