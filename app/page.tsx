import Image from "next/image";
import { Button } from "@/components/ui/button";
//import { main } from "bun";
import { Poppins } from "next/font/google";
import {cn} from "@/lib/utils";
import LoginButton from "@/components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight:["600"]
})

export default function Home() {
  return (
    <main
    className="flex flex-col h-full justify-center items-center bg-gradient-to-br from-sky-500 via-teal-500 to-blue-500"
    >
<div className="space-y-6  text-center flex flex-col">
  <h1
  className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}
  >
Auth Toolbox
  </h1>
  <p className="text-white text-lg">
    A simple authentication service for your app
  </p>
  <LoginButton>
  <Button
  variant={"secondary"}
  size={"lg"} 
  >Sign in</Button>
  </LoginButton>
</div>

<div>

</div>
    </main>
    
  );
}
