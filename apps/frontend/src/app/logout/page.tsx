"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
	const router = useRouter();

	localStorage.removeItem("auth");
	localStorage.removeItem("user");

	router.push("/login");

	return (
		<>
			<div className="flex items-center justify-center">
				<h1 className="text-3xl">Logging Out...</h1>
			</div>
		</>
	);
}
