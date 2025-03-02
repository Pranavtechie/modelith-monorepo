import * as React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import App from "./app";
import Register from "@/pages/register";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "about",
		element: <div>About</div>,
	},
	{
		path: "register",
		element: <Register />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<>
		<Toaster />
		<RouterProvider router={router} />
	</>
);
