import "./globals.css"
import { Nova_Square } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"

const novaSquare = Nova_Square({
  subsets: ["latin"],
  weight: "400",
})
export const metadata = {
  title: "TENGU",
  description: "Tu solución digital personalizada",
  icons: {
    icon: "/tomoe.png", // o .png
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="w-screen min-h-full bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white transition-colors "
    >
      <body className={`${novaSquare.className} font-sans transition-colors min-h-full`}>
        <ThemeProvider>

          <Navbar />
          <main className="w-screen min-h-screen px-4 py-8">{children}</main>
          <Footer />

          
        </ThemeProvider>
      </body>
    </html>
  )
}
