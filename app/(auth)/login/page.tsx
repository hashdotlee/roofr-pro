import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="w-full">
      <h2 className="text-center font-semibold text-xl">Login to #App</h2>
      <Button variant={"outline"} className="w-full">
        <span className="text-2xl pr-2">
          <FcGoogle />
        </span>
        <span>Login with Google</span>
      </Button>

      <div className="w-full flex items-center justify-center gap-2">
        <span className="border-t flex-1"></span>
        <span className="text-gray-400 text-sm">Or using your email</span>
        <span className="border-t flex-1"></span>
      </div>
      
      <LoginForm />

      <div className="flex flex-row justify-between">
        <Button variant={"link"} className="p-0">Forgot password?</Button>
        <Button variant={"link"} className="text-green-600">Register</Button>
      </div>
    </div>
  );
}
