import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      minLength: password.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const passwordCriteria = validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobile(mobile)) {
      Swal.fire("Error", "Invalid mobile number", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (profilePicture) {
      formData.append("profile", profilePicture);
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Registration successful!", "success").then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg md:max-w-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <input
              type="file"
              accept="image/*"
              className="w-full max-w-xs p-2 border rounded"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-3 border rounded"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setMobile(value);
                }
              }}
            />

            <div className="relative mt-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <div className="absolute left-0 mt-1 bg-white border p-2 rounded shadow-md text-sm w-64">
                  <p
                    className={`flex items-center ${
                      passwordCriteria.lowercase
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ● Lowercase Letter
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordCriteria.uppercase
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ● Uppercase Letter
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordCriteria.number
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ● Number
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordCriteria.minLength
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ● 8 Characters Minimum
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordCriteria.specialChar
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ● Special Character
                  </p>
                </div>
              )}
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <div className="relative mt-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 border rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
          >
            Register
          </motion.button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600">
              Log in
            </NavLink>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
