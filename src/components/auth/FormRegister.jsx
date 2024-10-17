"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const FormRegister = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleRegisterBtn = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("/api/v1/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await res.json();
            alert("Registration successful!");
            router.push("/auth/login")

        } catch (error) {
            console.error("Error registering:", error);
            alert("Failed to register. Please try again.");
        }
    }

    return (
        <div className="space-y-5 w-full max-w-sm sm:border-2 rounded-xl p-10 sm:shadow-lg sm:dark:border-[#121212]">
            <p className="text-xl font-bold">Create an account</p>
            <div>
                <p >Username</p>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212]"
                />
            </div>
            <div>
                <p >Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212]"
                />
            </div>
            <div>
                <p >Password</p>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212]"
                />
            </div>
            <div>
                <p>Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212]"
                />
            </div>
            <div className="space-y-1 pt-3">
                <button onClick={handleRegisterBtn} className="bg-[#1e88e5] text-white  w-full p-1.5 rounded-xl ">Register</button>
                <p className="text-center">or</p>
                <button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="bg-gray-600 text-white w-full p-1.5 rounded-xl "
                >Login with github
                </button>
            </div>
            <div className="flex gap-x-2 ">
                <p>Already have an account?</p>
                <Link href={"/api/auth/signin"} className="text-[#1e88e5]">Login</Link>
            </div>
        </div>
    )
}

export default FormRegister