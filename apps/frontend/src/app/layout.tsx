import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Modelith",
	description: "A data science platform designed for teachers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

export const dynamic = "force-dynamic";
