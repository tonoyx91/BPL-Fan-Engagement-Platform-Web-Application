import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure email and password from formData
    const { email, password } = formData;

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create an object to send in the request body
    const requestBody = {
      email,
      password,
    };

    // Make a POST request to your server
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.status === 400) {
          // If status is 400, email already exists, show an alert
          alert("User already exists");
          throw new Error("User already exists");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userRegister");
        alert("Account Created");
        window.location.reload();
        console.log("Form submitted");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="w-96 p-55 bg-green-950 text-back rounded-lg font-poppins font-bold" style={{
       // Set the background image path here
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed', // Keeps the background fixed
      backgroundPosition: 'center',
      width: '180vh', // Set the width to 100%
      height: '90vh', // Set the height to 100% of the viewport height
    }}>
      <h2 className="text-4xl font-extrabold mb-12 py-5 bg-green-850 border-white text-lime-400">Sign Up</h2>
      <h3 className="text-xl mb-6 bg-green-850 text-white">Welcome to BPL Fan Engagement Platform </h3>
      <h4 className="text-l mb-4 bg-green-850 text-blue-300">Create your account to join the platform!!! </h4>
      <form onSubmit={handleSubmit}>
      <div className="mb-8">
          <label className="block text-l text-yellow-300">Email:</label>
          <input
            className="border rounded py-3 px-20 text-black"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-9">
          <label className="block text-l text-yellow-300">
            Password:
            <span
              className="ml-2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </label>
          <input
            className="border rounded py-3 px-20 text-black"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-l text-yellow-300">
            Confirm Password:
            <span
              className="ml-2 cursor-pointer"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </span>
          </label>
          <input
            className="border rounded py-3 px-20 text-black"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <br/>
          
          <br></br>
        </div>
        <div className="mb-9">
        <button type="submit" class="inline-block px-12 py-3 mr-3 font-bold text-center text-blue-100 uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-blue-500 leading-pro text-small ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-red-500 hover:text-green-400 hover:shadow-lg active:opacity-85">Create Account</button>
        </div>      </form>
    </div>
  );
}

export default SignUp;
