import { AuthProvider } from "@/components/auth/AuthProvider";
import "./global.css";

export default async function RootLayout({ children }) {

    return (
        <html suppressHydrationWarning>
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}