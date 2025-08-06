import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pulse Co-Pilot - Daily Recap",
    description: "AI-powered call analytics and daily recap system",
    icons: {
        icon: [
            {
                url: "/favicon.svg?v=2",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/favicon.svg?v=2"
                    type="image/svg+xml"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.svg?v=2"
                    type="image/svg+xml"
                />
            </head>
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
