import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            let apiUrl = "http://localhost:5000/api/public/signin";
            let response = await axios.post(apiUrl, { email, password });
    
            console.log("Full API Response:", response);  // ✅ Log the full response
            console.log("Response Data:", response.data);  // ✅ Log data inside response
    
            let { token, user } = response.data;
    
            if (!token) {
                alert("Invalid Credentials ❌");
                return;
            }
    
            localStorage.setItem("token", token);
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            }
    
            alert("Logged in successfully ✅");
            navigate("/dashboard");
    
        } catch (error) {
            console.error("Login error:", error);
    
            // ✅ Debug API errors
            if (error.response) {
                console.log("Server Error Response:", error.response.data);
                alert(error.response.data.message || "Login failed ❌");
            } else if (error.request) {
                console.log("No Response from Server:", error.request);
                alert("No response from server ❌");
            } else {
                console.log("Request Error:", error.message);
                alert("Something went wrong ❌");
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='h-screen w-screen bg-gray-900 flex items-center justify-center'>
            <div className='h-auto w-full max-w-lg border-2 rounded-2xl border-white p-8'>
                <h1 className='text-white text-center mt-3 text-3xl'>Sign In</h1>

                {/* Email Input */}
                <div className='mt-6'>
                    <h5 className='text-white pl-10'>Email</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-gray-600 border-2 p-2 rounded-2xl w-full mt-3 text-white bg-gray-800'
                        placeholder='Enter your email'
                    />
                </div>

                {/* Password Input */}
                <div className='mt-6'>
                    <h5 className='text-white pl-10'>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-gray-600 border-2 p-2 rounded-2xl w-full mt-3 text-white bg-gray-800'
                        placeholder='Enter your password'
                    />
                </div>

                {/* SignIn Button */}
                <button 
                    type='button' 
                    disabled={loading} 
                    onClick={handleSignin}
                    className='bg-blue-600 p-2 mt-5 w-full rounded-lg cursor-pointer hover:bg-blue-900 text-white'
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                {/* Signup Link */}
                <h2 className='text-white text-center mt-5'>
                    Don't have an account?{' '}
                    <a href="/signup" className='text-blue-600 underline'>Sign up here</a>
                </h2>
            </div>
        </div>
    );
};

export default Signin;
