import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<h1 className="text-5xl font-bold mb-6 text-center">Modelith</h1>
			<div className="flex flex-row gap-4">
				<Link href="/sign-in">
					<Button>Sign In</Button>
				</Link>
				<Link href="/sign-up">
					<Button>Sign Up</Button>
				</Link>
			</div>
		</div>
	);
}
