import { AuthProvider } from "@/components/auth/AuthProvider";
import "./global.css";
import { Toaster } from "sonner";


export default async function RootLayout({ children }) {

    return (
        <html suppressHydrationWarning>
            <body className="bg-white dark:bg-[#121212]">
                <Toaster richColors position="top-center" />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}