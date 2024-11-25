import NavBar from "@/components/NavBar";
import "./global.css";

export const metadata = {
  title: "Slovene Step By Step",
  description: "The best way to learn slovene",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white">
          <NavBar />
          <div className="relative isolate px-6 pt-14 lg:px-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
