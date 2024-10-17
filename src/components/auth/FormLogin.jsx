"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const FormLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegisterBtn = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            alert("Login failed");
            return
        } else {
            router.push("/")
            router.refresh()
        }
    }

    return (
        <div className="space-y-5 w-full max-w-sm sm:border-2 rounded-xl p-10 sm:shadow-lg sm:dark:border-[#121212]">
            <p className="text-xl font-bold">Login to your account</p>
            <div>
                <p >Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212] "
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
            <div className="space-y-1 pt-3">
                <button onClick={handleRegisterBtn} className="bg-[#1e88e5] text-white  w-full p-1.5 rounded-xl ">Login</button>
                <p className="text-center">or</p>
                <button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="bg-gray-600 text-white w-full p-1.5 rounded-xl "
                >Login with github
                </button>
            </div>
            <div className="flex gap-x-1 ">
                <p>Don&apos;t have an account? Please</p>
                <Link href={"/auth/register"} className="text-[#1e88e5]">register</Link>
            </div>
        </div>
    )
}

export default FormLogin