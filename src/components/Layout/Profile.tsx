import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Upload } from "lucide-react";

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars: string[] = ["#1E40AF", "#DC2626", "#16A34A", "#9333EA"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-[#E3F4FD] rounded-3xl w-full max-w-2xl shadow-lg p-6 flex gap-8">
          {/* Left Section - Image Upload */}
          <div className="w-1/2 flex flex-col items-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer relative w-80 h-60 flex items-center justify-center rounded-3xl overflow-hidden dark:bg-[#121C42]"
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white text-center font-montserrat font-normal">
                  <Upload className="h-20 w-20 mb-6" />
                  Upload Image
                  <p className="text-xs text-gray-300 mt-2">
                    ONLY JPG, PNG, JPEG FORMATS
                  </p>
                </div>
              )}
            </label>
            <input
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Default Avatars Selection */}
            <div className="mt-6">
              <p className="text-center dark:text-[#0A153A] font-montserrat font-bold">
                Or choose an avatar
              </p>
              <div className="flex justify-center gap-4 mt-3">
                {avatars.map((color) => (
                  <div
                    key={color}
                    className={`w-12 h-12 rounded-lg cursor-pointer border-4 transition ${selectedAvatar === color ? "border-black" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedAvatar(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Profile Details */}
          <div className="w-1/2">
            <h2 className="text-[#0A153A] text-3xl mb-6 text-center pt-4 font-montserrat font-bold">
              Profile Section
            </h2>

            <div className="flex gap-2 font-montserrat font-normal text-[#0A153A]">
              <Input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="dark:placeholder-[#1A2251]"
              />
              <Input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="dark:placeholder-[#1A2251]"
              />
            </div>

            <div className="mt-4 flex gap-2 items-center font-montserrat">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:placeholder-[#1A2251]"
              />
              <Button className="dark:bg-[#0A153A] text-white">Verify</Button>
            </div>

            <div className="mt-4 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:placeholder-[#1A2251] dark:text-[#0A153A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#0A153A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mt-4 relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`dark:placeholder-[#1A2251] dark:text-[#0A153A] ${
                  password && confirmPassword && password !== confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#0A153A]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match!
              </p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>Save</Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileForm;
