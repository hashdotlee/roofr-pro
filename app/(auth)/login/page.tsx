import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="mt-12 w-full sm:w-[440px]">
      <h2 className="text-center font-semibold text-3xl mb-8">Login to #App</h2>
      <Button
        variant={"outline"}
        className="w-full hover:bg-gray-200 border-gray-400"
      >
        <span className="text-2xl pr-2">
          <FcGoogle />
        </span>
        <span>Login with Google</span>
      </Button>

      <div className="w-full flex items-center justify-center gap-2 my-4">
        <span className="border-t flex-1 border-gray-400"></span>
        <span className="text-gray-500 text-sm ">Or using your email</span>
        <span className="border-t flex-1 border-gray-400"></span>
      </div>

      <LoginForm />

      <div className="flex flex-row justify-between">
        <Button variant={"link"} className="p-0">
          Forgot password?
        </Button>
        <Button variant={"link"} className="text-green-600" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}
