"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from 'react-query';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                        {children}
                    </body>
                </Provider>
            </QueryClientProvider>
        </html>
    );
}
