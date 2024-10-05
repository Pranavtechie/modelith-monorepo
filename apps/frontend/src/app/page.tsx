"use client";
import { api } from "@repo/libs";

export default async function Home() {
	const { data, error } = await api.hi.get();

	console.log(data, error);

	return <>Hello there</>;
}
