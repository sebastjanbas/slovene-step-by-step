import { BackArrowButton } from "@/components/auth/BackArrowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";



const ProtectedLayout = async ({ children }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <>
            <div className="flex flex-col h-screen overflow-hidden">
                <header className="border-b-[1px] border-gray-300">
                    <div className="flex flex-row justify-between items-center px-5 py-3">
                        <div>
                            <BackArrowButton />
                        </div>
                        <div className="flex flex-row items-center gap-x-5">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={35}
                                height={35}
                            />
                            <h1 className="text-custom-light-1 text-xl font-bold">My App</h1>
                        </div>
                    </div>
                </header>
                <div className="flex flex-row h-full">
                    <div className="sticky flex flex-col top-0 h-full w-96 border-r-[1px] border-gray-300">
                        <div className="flex flex-row gap-4 items-center px-6 py-4 border-b-[1px] border-gray-300">
                            <Avatar>
                                <AvatarImage src={user.user_metadata.avatar_url} />
                                <AvatarFallback >
                                    <FaUser className="text-white" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-bold capitalize text-xl/tight">{user.user_metadata.full_name}</h2>
                                <p className="text-custom-light-2 text-xs/tight">Free Plan</p>
                            </div>
                        </div>
                        <div>
                            NAV PLACEHOLDER
                        </div>
                    </div>
                    <div className="h-full overflow-auto w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProtectedLayout