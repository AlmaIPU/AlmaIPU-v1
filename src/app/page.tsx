// app/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Your App Name",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </main>
  );
}
