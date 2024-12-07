import "./global.css";

export default async function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
