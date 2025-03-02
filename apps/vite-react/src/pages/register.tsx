"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@repo/libs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

export default function SignUpPage() {
	const { toast } = useToast();

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	console.log("amazing");

	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const { data, error } = await api.auth.register.post({
			name: formData.fullName,
			email: formData.email,
			password: formData.password,
			role: "STUDENT",
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

		console.log("registration");

		toast({
			title: "Registered!",
			description: "Your account has been created successfully",
		});

		if (data.authToken) {
			localStorage.setItem("auth", data?.authToken);
			localStorage.setItem("user", data?.user);
		}

		console.log("hi");
		redirect("/student/dashboard");
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md">
				<header className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Modelith
					</h1>
				</header>
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<Label htmlFor="fullName">Full Name</Label>
						<Input
							id="fullName"
							name="fullName"
							type="text"
							placeholder="John Doe"
							value={formData.fullName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="john@example.com"
							autoComplete="username"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							autoComplete="new-password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-6">
						<Label htmlFor="confirmPassword">
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="••••••••"
							autoComplete="new-password"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Button type="submit" className="w-full">
						Sign Up
					</Button>

					<Link to="/login">
						<div className="hover:underline text-sm mt-4 text-center text-gray-700">{`Already have an account? Login`}</div>
					</Link>
				</form>
			</div>
		</div>
	);
}
