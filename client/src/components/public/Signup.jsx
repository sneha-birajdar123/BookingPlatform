import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let apiUrl = "http://localhost:5000/api/public/signup"
            let apiOutput = await axios.post(apiUrl, { email, password, username })
            console.log("API response", apiOutput.data);

            navigate("/signin")

        } catch (error) {
            console.log("Signup error:", error);
           
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 rounded-2xl border-white p-6 sm:p-8">
                <h1 className="text-white text-center text-3xl sm:text-4xl mb-6">Create an account</h1>

                <div className="mt-4">
                    <h5 className="text-white">Username</h5>
                    <input
                        type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)}
                        className="border-gray-600 border-2 p-2 rounded-2xl w-full mt-2 text-white bg-gray-800 placeholder-gray-400"
                        placeholder="Enter username" 
                    />
                </div>


                <div className="mt-4">
                    <h5 className="text-white">Email</h5>
                    <input
                        type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="border-gray-600 border-2 p-2 rounded-2xl w-full mt-2 text-white bg-gray-800 placeholder-gray-400"
                        placeholder="Enter your email"
                    />
                </div>


                <div className="mt-4">
                    <h5 className="text-white">Password</h5>
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-600 border-2 p-2 rounded-2xl w-full mt-2 text-white bg-gray-800 placeholder-gray-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button type='button' onClick={handleSignup} disabled={loading} className="bg-blue-600 p-2 mt-5 w-full rounded-lg cursor-pointer hover:bg-blue-900 text-white">
                {loading ? "loading..." : "Sign Up"}
                </button>

                <h2 className="text-white text-center mt-5">
                    Already have an account?{' '}
                    <a href="/signin" className="text-blue-600 underline">
                        Signin here
                    </a>
                </h2>
            </div>
        </div>
    );
};

export default Signup;
