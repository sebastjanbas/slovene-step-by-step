import SigninCard from "@/components/auth/sign-in-card";
import Image from "next/image";

export default function SigninPage() {
  return (
    <div className="w-screen p-0 m-0 h-screen overflow-hidden flex justify-center items-center">
      <div className="flex flex-1/2 justify-center items-center">
        <SigninCard />
      </div>
      <div className="hidden md:flex h-full flex-1/2">
        <Image
          className="object-cover"
          src={
            "https://placehold.co/1280x1920/EEE/31343C/png/?text=Placeholder&font=nato-sans"
          }
          alt="Placeholder image"
          width={1280}
          height={1920}
        />
      </div>
    </div>
  );
}
