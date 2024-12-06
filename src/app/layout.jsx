import "./global.css";

export const metadata = {
    title: "Become fluent in Slovene",
    description: "The best way to learn slovene",
    openGraph: {
        siteName: "Slovene Step By Step",
        images: "https://slovene-step-by-step.vercel.app/meta-image-link.jpg",
        url: "https://slovene-step-by-step.vercel.app/"

    },
};

export default async function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
