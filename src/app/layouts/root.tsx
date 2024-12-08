import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { ToastContainer } from "react-toastify";

export default function MainRootLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) { 
    return (
        <html>
            <body className="flex">
                <ToastContainer
                    position="top-center"
                    closeButton={true}
                />
                <div className="sidebar w-60">
                    <SideBar />
                </div>
                <div className="main flex flex-col flex-1">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    )
}