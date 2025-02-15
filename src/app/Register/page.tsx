"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import RegisterImage from "../../Assets/Images/Register1.png";
import LogoLight from "../../Assets/Logo/LogoLight.png";
import LogoDark from "../../Assets/Logo/LogoDark.png";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const router = useRouter();

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account created successfully!");
      router.push("/Login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
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
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#121C42] flex font-montserrat">
        {/* Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
          <div className="w-full max-w-md space-y-4">
            <div className="text-center">
              <h1 className="flex font-semibold items-center justify-start gap-2 text-5xl text-[#121C42] dark:text-[#E3F4FD] text-start whitespace-nowrap">
                Create an Account
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-2 text-[#1A2251] dark:text-[#C8E6F9]"
            >
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#C8E6F9] dark:bg-[#495FDB]   focus:border-[#1A2251] focus:outline-none font-bold placeholder-[#1A2251] dark:placeholder-[#C8E6F9]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  // 1A2251
                  value={user.lastName}
                  onChange={handleChange}
                  required
                  className="-full px-4 py-3 rounded-md bg-[#C8E6F9] dark:bg-[#495FDB]   focus:border-[#1A2251] focus:outline-none font-bold placeholder-[#1A2251] dark:placeholder-[#C8E6F9]"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-[#C8E6F9] dark:bg-[#495FDB]   focus:border-[#1A2251] focus:outline-none font-bold placeholder-[#1A2251] dark:placeholder-[#C8E6F9]"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-md bg-[#C8E6F9] dark:bg-[#495FDB]   focus:border-[#1A2251] focus:outline-none font-bold placeholder-[#1A2251] dark:placeholder-[#C8E6F9]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A2251] dark:text-[#E3F4FD]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#121C42] dark:bg-[#E3F4FD]  font-semibold transition-all duration-200 hover:text-[#FFCC04] focus:ring-2 focus:ring-[#1A2251] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#E3F4FD] dark:text-[#1A2251]"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#FFFFFF] dark:bg-[#121C42] text-[#121C42] dark:text-[#E3F4FD] font-bold">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {/* Social Login Buttons */}
              <div className="flex gap-2 items-center justify-center">
                <button className="inline-flex w-full justify-center rounded-md bg-[#FFCC04] p-3 text-[#1A2251] hover:text-[#E3F4FD]">
                  <FaLinkedinIn size={20} />
                </button>
                <button className="inline-flex w-full justify-center rounded-md bg-[#FFCC04] p-3 text-[#1A2251] hover:text-[#E3F4FD]">
                  <FaGoogle size={20} />
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={() => router.push("/Login")}
                className="w-full py-3 rounded-md bg-[#121C42] dark:bg-[#E3F4FD] font-semibold transition-all duration-200 hover:text-[#FFCC04] focus:ring-2 focus:ring-[#1A2251] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-[#E3F4FD] dark:text-[#1A2251]"
              >
                {loading ? "Redirecting..." : "Log In"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex w-1/2 bg-[#FFFFFF] dark:bg-[#121C42] relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={RegisterImage}
              alt="Register Logo"
              width={2000}
              height={2000}
              className="max-w-full max-h-full object-cover rounded-2xl p-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// #FFEDB3 hover linkedin and other
