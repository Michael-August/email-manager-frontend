import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <LoginForm />
    </div>
  );
}
