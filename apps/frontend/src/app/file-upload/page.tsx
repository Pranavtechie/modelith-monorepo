"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function FileUploadPage() {
	const [ipynbFile, setIpynbFile] = useState<File | null>(null);
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [ipynbError, setIpynbError] = useState<string | null>(null);
	const [csvError, setCsvError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);

	const validateFile = (file: File, expectedExtension: string) => {
		const fileExtension = file.name.split(".").pop()?.toLowerCase();
		return fileExtension === expectedExtension;
	};

	const handleIpynbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (validateFile(file, "ipynb")) {
				setIpynbFile(file);
				setIpynbError(null);
			} else {
				setIpynbFile(null);
				setIpynbError("Please select a valid .ipynb file");
			}
		}
	};

	const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (validateFile(file, "csv")) {
				setCsvFile(file);
				setCsvError(null);
			} else {
				setCsvFile(null);
				setCsvError("Please select a valid .csv file");
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (ipynbFile && csvFile) {
			setIsUploading(true);
			// Simulating upload process
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsUploading(false);
			setUploadSuccess(true);
			// Reset form after successful upload
			setTimeout(() => {
				setIpynbFile(null);
				setCsvFile(null);
				setUploadSuccess(false);
			}, 3000);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6">File Upload</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="ipynb-file">
						Jupyter Notebook (.ipynb)
					</Label>
					<Input
						id="ipynb-file"
						type="file"
						accept=".ipynb"
						onChange={handleIpynbChange}
						className="mt-1"
					/>
					{ipynbError && (
						<p className="text-red-500 text-sm mt-1 flex items-center">
							<AlertCircle className="w-4 h-4 mr-1" />
							{ipynbError}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="csv-file">CSV File (.csv)</Label>
					<Input
						id="csv-file"
						type="file"
						accept=".csv"
						onChange={handleCsvChange}
						className="mt-1"
					/>
					{csvError && (
						<p className="text-red-500 text-sm mt-1 flex items-center">
							<AlertCircle className="w-4 h-4 mr-1" />
							{csvError}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="w-full"
					disabled={!ipynbFile || !csvFile || isUploading}
				>
					{isUploading ? "Uploading..." : "Upload Files"}
				</Button>
			</form>
			{uploadSuccess && (
				<div className="mt-4 p-2 bg-green-100 text-green-700 rounded flex items-center justify-center">
					<CheckCircle2 className="w-5 h-5 mr-2" />
					Files uploaded successfully!
				</div>
			)}
		</div>
	);
}
