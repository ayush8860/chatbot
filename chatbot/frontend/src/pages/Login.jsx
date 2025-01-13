import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 to-black">
      {/* Left section with tagline */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <h1 className="text-5xl font-bold text-white">
          Unleash your inner<br />sloth today.
          <span className="text-purple-400">🦥</span>
        </h1>
      </div>

      {/* Right section with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Sign In to Your Account
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Let's get you signed in and get you started
          </p>

          <form className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm">Email Address</label>
              <input
                type="email"
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="username@slothmail.com"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <p className="text-gray-400 text-sm text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Social login options */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex justify-center space-x-4">
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <img src="/twitter-icon.svg" alt="Twitter" className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
