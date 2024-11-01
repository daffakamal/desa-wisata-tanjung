import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import WhatsappPill from "@/components/ui/whatsapp-bubble";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desa Wisata Tanjung",
  description: "Website yang menampilkan berbagai potensi UMKM, tanaman obat, dan kesenian yang ada di Desa Wisata Tanjung",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WhatsappPill />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
