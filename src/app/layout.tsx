import "./globals.css"
import { Nova_Square } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import TenguChat from "@/components/TenguChat"
import { I18nProvider } from "@/lib/i18n"

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
      className="min-h-full bg-[#050507] text-zinc-900 dark:bg-[#050507] dark:text-white overflow-x-hidden"
    >
      <body className={`${novaSquare.className} font-sans min-h-full w-full overflow-x-hidden`}>
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            {children}
            <Footer />
            <TenguChat />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
