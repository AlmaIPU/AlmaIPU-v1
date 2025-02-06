"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import RegisterLogo from "../../../Assets/Register.png";
import axios from "axios";

const Login = () => {
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
    <div className="min-h-screen bg-[#F2E8F4] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-[#2C114B] mb-2 whitespace-nowrap">
              Welcome Back
            </h1>
            <div className="flex font-bold items-center justify-center gap-2 text-md text-[#2C114B]">
              Don not have an account?
              <button
                onClick={() => router.push("/Register")}
                className="font-semibold hover:text-[#2C114B] transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-[#2C114B]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#CDBADA] border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-colors font-bold"
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
                className="w-full px-4 py-3 rounded-lg bg-[#CDBADA] border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-colors font-bold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600"
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
              className="w-full py-3 rounded-lg bg-[#2C114B] text-white font-semibold transition-all duration-200 hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="flex w-1/2 items-center justify-center p-12 relative mx-12">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={RegisterLogo}
            alt="Login Image"
            width={700}
            height={700}
            className="max-w-full max-h-full bg-[#2C114B] object-cover rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
