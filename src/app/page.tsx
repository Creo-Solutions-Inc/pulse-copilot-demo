"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(username, password);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {/* Main Login Card */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full">
                    {/* Branding */}
                    <div className="text-center mb-8">
                        {/* CSP Logo Placeholder */}
                        <div className="mx-auto rounded-full bg-gray-200 flex items-center justify-center h-16 w-16 text-gray-600 font-bold text-lg mb-4">
                            Your Logo
                        </div>

                        {/* Title & Tagline */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pulse Co-Pilot</h2>
                        <p className="text-sm text-gray-600 mb-1">Daily Recap System</p>
                        <p className="text-sm text-gray-600 mt-1">Your conversations. Your insights. Every day.</p>
                    </div>

                    {/* Login Form */}
                    <form
                        className="space-y-6"
                        onSubmit={handleLogin}
                    >
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1a730] focus:border-[#e1a730] transition-colors text-gray-900 bg-white placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1a730] focus:border-[#e1a730] transition-colors text-gray-900 bg-white placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#e1a730] hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Demo Mode Note */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-600">Demo Mode - Any credentials will work</p>
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-600">Powered by Creo Solutions</p>
                </div>
            </div>
        </div>
    );
}
