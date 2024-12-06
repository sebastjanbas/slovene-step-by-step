import "./global.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";


export const metadata = {
    title: "Slovene Step By Step",
    description: "The best way to learn slovene",
    openGraph: {
        images:
            "https://generalseba.github.io/slovene-step-by-step/meta-image-link.jpg",
    },
};

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
