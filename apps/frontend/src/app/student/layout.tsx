"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Menu, Settings, GraduationCap } from "lucide-react";

const sidebarItems = [
	{ name: "Classes", href: "/student/classes", icon: GraduationCap },
	{ name: "Settings", href: "/student/settings", icon: Settings },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const pathname = usePathname();

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar for larger screens */}
			<aside
				className={`hidden lg:flex flex-col w-64 ${
					isSidebarOpen ? "lg:w-64" : "lg:w-20"
				} bg-gray-800 text-white transition-all duration-300 ease-in-out`}
			>
				<div className="flex items-center justify-between p-4">
					{isSidebarOpen && (
						<span className="text-xl font-semibold">Modelith</span>
					)}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="text-white hover:bg-gray-700"
					>
						<ChevronRight
							className={`h-6 w-6 transition-transform duration-300 ${
								isSidebarOpen ? "rotate-180" : ""
							}`}
						/>
					</Button>
				</div>
				<ScrollArea className="flex-1">
					<nav className="space-y-2 p-2">
						{sidebarItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
									pathname === item.href
										? "bg-gray-900 text-white"
										: "text-gray-300 hover:bg-gray-700"
								}`}
							>
								<item.icon className="h-5 w-5" />
								{isSidebarOpen && <span>{item.name}</span>}
							</Link>
						))}
					</nav>
				</ScrollArea>
			</aside>

			{/* Mobile sidebar */}
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="lg:hidden absolute left-4 top-4 z-50"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-64 bg-gray-800 text-white p-0"
				>
					<div className="flex items-center justify-between p-4">
						<span className="text-xl font-semibold">John Doe</span>
					</div>
					<ScrollArea className="h-[calc(100vh-5rem)]">
						<nav className="space-y-2 p-2">
							{sidebarItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
										pathname === item.href
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700"
									}`}
								>
									<item.icon className="h-5 w-5" />
									<span>{item.name}</span>
								</Link>
							))}
						</nav>
					</ScrollArea>
				</SheetContent>
			</Sheet>

			{/* Main content */}
			<main className="flex-1 overflow-auto bg-gray-100 p-8">
				{children}
			</main>
		</div>
	);
}
