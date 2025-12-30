import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import { DashboardProvider } from "@/context/DashboardContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </Providers>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}