import Link from "next/link";
import "./globals.css";

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
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/house-types" className="hover:text-blue-600 transition-colors">Properties</Link>
              <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>

            </nav>
          </div>
        </header>
        
        <main className="flex-grow">{children}</main>
        
        <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              IRE <span className="text-blue-400">Homes</span>
            </Link>

            <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="/" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="/" className="hover:text-white transition-colors">Facebook</Link>
              <Link href="/" className="hover:text-white transition-colors">YouTube</Link>
            </nav>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+353 1 234 5678</span>
              <a

              
                href="mailto:info@irehomes.ie"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@irehomes.ie</span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} IRE Homes. All rights reserved.</p>
          </div>
        </div>
        </footer>
          </body>
    </html>
  );
}
