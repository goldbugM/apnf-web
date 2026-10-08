import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APNF — Ambulanter privatärztlicher Notdienst Frankfurt e.V.",
  description:
    "Notdienst für Privatpatienten und Selbstzahler im Rhein-Main-Gebiet. Seit über 30 Jahren kommen wir zu Ihnen — rund um die Uhr, mit moderner Apparatur und erfahrenen Fachärzten. Tel: 0180 – 22 7 44",
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
