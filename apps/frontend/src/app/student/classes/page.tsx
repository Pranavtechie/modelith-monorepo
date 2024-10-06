"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserDataFromLocalStorage } from "@/util";
import ClassCard from "@/components/classCard";
import { api } from "@repo/libs";
import { useToast } from "@/hooks/use-toast";

interface Class {
	id: string;
	name: string;
	createdAt: Date;
	enrolledAt: Date;
}

export default function JoinClassButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [classCode, setClassCode] = useState("");
	const [classes, setClasses] = useState<Class[]>([]);

	const { toast } = useToast();

	const router = useRouter();

	useEffect(() => {
		const fetchClasses = async () => {
			const userId = getUserDataFromLocalStorage()?.id || "";

			const { data, error } = await api.class.procure.post({ userId });

			if (error || !data) {
				toast({
					title: "Error",
					description:
						error?.message || "An unexpected error occurred.",
					variant: "destructive",
				});
				return;
			}

			setClasses(data);
		};

		fetchClasses();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { data, error } = await api.class.join.post({
			inviteCode: classCode,
			userId: getUserDataFromLocalStorage()?.id || "",
		});

		if (error || !data) {
			toast({
				title: "Error",
				description: error?.message || "An unexpected error occurred.",
				variant: "destructive",
			});
			return;
		}

		router.push(`/student/class/${data?.enrollment?.classId}`);

		setIsOpen(false);
		setClassCode("");
	};

	return (
		<>
			<div className="p-4 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold mb-4 items-center">
						Your Classes
					</h1>
				</div>
				<div>
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" /> Join Class
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Join Class</DialogTitle>
								<DialogDescription>
									Enter the class code provided by your
									instructor to join the class.
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit}>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label
											htmlFor="classCode"
											className="text-right"
										>
											Class Code
										</Label>
										<Input
											id="classCode"
											value={classCode}
											onChange={(e) =>
												setClassCode(e.target.value)
											}
											className="col-span-3"
											placeholder="Enter class code"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Join Class</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="flex flex-wrap gap-4">
				{classes.map((classData: Class) => (
					<ClassCard key={classData.id} {...classData} />
				))}
			</div>
		</>
	);
}
