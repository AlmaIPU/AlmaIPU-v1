"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import RegisterLogo from "../../../Assets/Register.png";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
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
    <div className="min-h-screen bg-[#F2E8F4] flex">
      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-[#2C114B] mb-2 whitespace-nowrap">
              Create an account
            </h1>
            <div className="flex font-bold items-center justify-center gap-2 text-md text-[#2C114B]">
              Already have an account?
              <Link
                href="/Login"
                className="font-semibold hover:text-[#2C114B] transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-[#2C114B]">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#CDBADA] border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-colors font-bold"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#CDBADA] border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-colors font-bold"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#CDBADA] border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-colors font-bold"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#2C114B] text-white font-semibold transition-all duration-200 hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="flex w-1/2 items-center justify-center p-12 relative mx-12">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={RegisterLogo}
            alt="Register Logo"
            width={700}
            height={700}
            className="max-w-full max-h-full bg-[#2C114B] object-cover rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
