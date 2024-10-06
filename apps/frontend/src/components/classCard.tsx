import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ClassCardProps {
	id: string;
	name: string;
	createdAt: Date;
	enrolledAt: Date;
}

export default function Component({ id, name, enrolledAt }: ClassCardProps) {
	return (
		<Link href={`/student/class/${id}`}>
			<Card className="w-64 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
				<CardHeader>
					<CardTitle className="text-sm font-medium text-muted-foreground">
						<p className="text-sm text-muted-foreground">
							Joined on {format(enrolledAt, "MMMM d, yyyy")}
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold mb-2 text-primary">
						{name}
					</h2>
				</CardContent>
			</Card>
		</Link>
	);
}
