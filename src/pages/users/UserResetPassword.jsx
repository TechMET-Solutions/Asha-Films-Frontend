import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { icons, images } from '../../assets';
import { Input } from '../../components/ui';
import { API } from '../../api';


function UserResetPassword() {
    const [credentials, setCredentials] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { email } = useParams(); // Assuming email is passed as a URL parameter

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (credentials.newPassword !== credentials.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength (optional)
        if (credentials.newPassword.length < 8) {
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
                body: JSON.stringify({
                    email: email,
                    newPassword: credentials.newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            setSuccess(true);
            // Optionally redirect after a delay
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
                        Reset Your Password
                    </h5>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Enter your new password below
                    </p>

                    {/* Success message */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
                            Password reset successfully! Redirecting...
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm w-full max-w-xs">
                            {error}
                        </div>
                    )}

                    {/* Reset Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="New Password*"
                            value={credentials.newPassword}
                            onChange={handleChange}
                            className="w-full border border-[#2D2D2D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password*"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
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
                            {loading ? 'Resetting password...' : 'RESET PASSWORD'}
                        </button>
                    </form>

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

export default UserResetPassword;