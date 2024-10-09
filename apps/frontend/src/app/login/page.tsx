"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@repo/libs";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { User } from "@/types/user";
import Link from "next/link";

export default function Component() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const { toast } = useToast();
	const [userData, addUserData] = useLocalStorage<User>("user");
	const [auth, addAuth] = useLocalStorage<string>("auth", "");

	useEffect(() => {
		if (auth?.length > 0) {
			if (userData.role === "STUDENT") {
				router.push("/student/dashboard");
			} else if (userData.role === "TEACHER") {
				router.push("/teacher/dashboard");
			}
		}
	}, [router, userData, auth]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { data, error } = await api.auth.login.post({
			email,
			password,
		});

		if (error || !data || data.error) {
			toast({
				title: "Error",
				description:
					error?.message ||
					data?.error ||
					"An unexpected error occurred.",
				variant: "destructive",
			});
			return;
		}

		if (data.authToken) {
			addAuth(data.authToken);
			addUserData(data.user);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4">
			<header className="mb-8 text-center">
				<h1 className="text-4xl font-bold text-primary">Modelith</h1>
			</header>
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>
						Enter your email and password to access your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Sign In
						</Button>
					</form>
					<Link href="/register">
						<div className="hover:underline text-sm mt-4 text-center text-gray-700">{`Don't have an account? Register`}</div>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
