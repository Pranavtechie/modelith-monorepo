import { type User } from "./types/user";


export function getUserDataFromLocalStorage(): User | null {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
}