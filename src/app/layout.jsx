import "./global.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export default async function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
