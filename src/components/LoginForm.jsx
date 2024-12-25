import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      alert("Please fill in all fields");
      return;
    }
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Login Success");
        localStorage.setItem("email", formData.email);
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert("Authentication Error");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-96 p-55 bg-green-950 text-back rounded-lg font-rowdies" style={{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      width: '180vh',
      height: '90vh',
    }}>
      <h2 className="text-3xl font-poppins font-extrabold mb-8 py-16 bg-green-950 text-yellow-300">Log In</h2>
      <h2 className="text-2xl font-poppins font-bold text-white">Welcome Back to BPL Fan Engagement Platform</h2>
      <form className="mt-8 space-y-8 rounded py-3 px-20" onSubmit={handleSubmit}>
        <div className="rounded-full shadow-sm -space-y-px w-96 ml-96">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={formData.email}
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-10 py-2 border font-poppins font-semibold mt-12 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={handleInputChange}
            />
          </div>
          <div className="relative font-poppins font-extrabold">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2C5.03 2 1 6.03 1 10s4.03 8 9 8 9-4.03 9-8-4.03-8-9-8zm0 12a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 4a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2C5.03 2 1 6.03 1 10s4.03 8 9 8 9-4.03 9-8-4.03-8-9-8zm0 12a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
        <button type="submit" className="inline-block px-12 py-3 mr-3 font-bold text-center text-blue-100 uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-blue-500 leading-pro text-small ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-red-500 hover:text-green-400 hover:shadow-lg active:opacity-85">Log In</button>
        </div>

      </form>
      <div className="text-center py-3 font-poppins">
        <p className="text-yellow-300">
          Don't have an account?{" "}
          <button>
            <Link to="/signup" className="font-medium text-purple-400 hover:text-indigo-300">
              Sign up
            </Link>
          </button>
        </p>
        <div className="text-center py-3">
          <p>
            <button>
              <Link to="/Forgetpassword" className="text-blue-100 hover:text-indigo-300">
                Forgot Password? Click Here!
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
