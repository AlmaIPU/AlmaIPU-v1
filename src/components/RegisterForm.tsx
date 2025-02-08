// app/components/RegisterForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { registerUser } from "@/app/api/auth";
import { signIn } from "next-auth/react";

// Submit Button Component with loading state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Creating Account..." : "Sign Up"}
    </button>
  );
}

// Initial state for form
const initialState = {
  message: "",
  success: false,
  user: null,
};

export default function RegisterForm() {
  const [state, formAction] = useFormState(registerUser, initialState);
  const [showPassword, setShowPassword] = useState(false);

  // Handle successful registration
  async function handleSuccess() {
    if (state.success && state.user) {
      // Automatically sign in the user
      const result = await signIn("credentials", {
        redirect: false,
        email: state.user.email,
        password: state.user.password,
      });

      if (result?.ok) {
        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    }
  }

  // Effect to handle successful registration
  useEffect(() => {
    if (state.success) {
      handleSuccess();
    }
  }, [state.success]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

      {state.message && (
        <div
          className={`mb-4 p-3 rounded ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium">
              College (Optional)
            </label>
            <input
              type="text"
              name="college"
              id="college"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="graduationYear"
              className="block text-sm font-medium"
            >
              Graduation Year (Optional)
            </label>
            <input
              type="number"
              name="graduationYear"
              id="graduationYear"
              defaultValue={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <SubmitButton />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Or continue with</p>
        <button
          onClick={() => signIn("linkedin")}
          className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign up with LinkedIn
        </button>
      </div>
    </div>
  );
}
