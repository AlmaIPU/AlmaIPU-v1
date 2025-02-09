"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import RegisterImage from "../../Assets/Images/Register.png";
import axios from "axios";
import LogoLight from "../../Assets/Logo/LogoLight.png";
import LogoDark from "../../Assets/Logo/LogoDark.png";

const Login = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Image
          src={darkMode ? LogoDark : LogoLight}
          alt="Site Logo"
          width={70}
          height={70}
        />
      </div>
      <div className="min-h-screen bg-white dark:bg-[#1A2251] flex font-montserrat">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="flex font-semibold items-center justify-start gap-2 text-5xl text-[#1A2251] dark:text-[#E3F4FD]">
                Welcome Back
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-[#E3F4FD]">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-[#E3F4FD] dark:bg-[#324F93] border-2  focus:border-[#1A2251] focus:outline-none transition-colors font-bold placeholder-[#1A2251] dark:placeholder-[#E3F4FD]"
              />
              {formErrors.email && (
                <p className="text-red-600 text-sm">{formErrors.email}</p>
              )}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#E3F4FD] dark:bg-[#324F93] border-2  focus:border-[#1A2251] focus:outline-none transition-colors font-bold placeholder-[#1A2251] dark:placeholder-[#E3F4FD]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A2251] dark:text-[#E3F4FD]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-600 text-sm">{formErrors.password}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#1A2251] dark:bg-[#E3F4FD]  font-semibold transition-all duration-200 hover:text-[#E3F4FD] focus:ring-2 focus:ring-[#1A2251] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#FFCC04] dark:text-[#1A2251]"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-[#1A2251] px-2 text-[#1A2251] dark:text-[#E3F4FD] font-bold">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-center">
                <button className="inline-flex w-full justify-center rounded-md  bg-[#FFCC04] p-3 text-[#1A2251] hover:text-[#E3F4FD]">
                  <FaLinkedinIn size={20} />
                </button>

                <button className="inline-flex w-full justify-center rounded-md  bg-[#FFCC04] p-3 text-[#1A2251] hover:text-[#E3F4FD]">
                  <FaGoogle size={20} />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                onClick={() => router.push("/Register")}
                className="w-full py-3 rounded-md bg-[#1A2251] dark:bg-[#E3F4FD]  font-semibold transition-all duration-200 hover:text-[#E3F4FD] focus:ring-2 focus:ring-[#1A2251] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#FFCC04] dark:text-[#1A2251]"
              >
                Already have an Account!
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex w-1/2 bg-[#1A2251] dark:bg-[#E3F4FD] shadow-[0_10px_30px_rgba(26,34,81,1.5)] dark:shadow-[0_10px_30px_rgba(173,216,230,0.8)] relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={RegisterImage}
              alt="Register Logo"
              width={5000}
              height={5000}
              className="max-w-full max-h-full object-cover rounded-2xl p-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
