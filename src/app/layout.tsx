"use client"

import "./globals.css";

import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from "./layouts/auth";
import MainRootLayout from "./layouts/root";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  
  const isAuthPage = pathname === "/";
  console.log(pathname)

  if (isAuthPage) {
    return (
      <AuthLayout>
        {children}
      </AuthLayout>
    );
  }

  return (
    <MainRootLayout>
      {children}
    </MainRootLayout>
  );
}
