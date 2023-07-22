import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex justify-center bg-opacity-20"><SignIn /></div>;
}