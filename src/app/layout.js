import Link from "next/link";
import "./globals.css"; // Ensure Tailwind is imported here

export const metadata = {
  title: "IRE Homes | Premium Real Estate",
  description: "Find your dream home today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
              IRE Homes
            </Link>
            <nav className="hidden md:flex gap-8 font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/house-types" className="hover:text-blue-600 transition-colors">Properties</Link>
              <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">{children}</main>
        
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} IRE Homes. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}