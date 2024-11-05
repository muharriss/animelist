"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { registerSchema } from "@/libs/authSchema"
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react"

const FormRegister = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [loadingCredential, setLoadingCredential] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingGithub, setLoadingGithub] = useState(false);

    const handleRegisterBtn = async (e) => {
        e.preventDefault()

        // if (password !== confirmPassword) {
        //     alert("Passwords do not match!");
        //     return;
        // }

        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!regex.test(email)) {
        //     alert("Enter email in correct format")
        //     return
        // }

        setLoading(true)
        setLoadingCredential(true)
        setErrors({})

        const data = {
            name,
            email,
            password,
            confirmPassword,
        }

        const result = registerSchema.safeParse(data)

        if (!result.success) {
            // console.log(result.error.format())
            setErrors(result.error.format());
            setLoading(false)
            setLoadingCredential(false)
            return
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
                setErrors({ error: errorData.message })
                // console.log(errors)
                // alert(`Error: ${errorData.message}`);
                setLoading(false)
                setLoadingCredential(false)
                return;
            }

            const data = await res.json();
            // alert("Registration successful!");
            router.push("/auth/login")

        } catch (error) {
            console.error("Error registering:", error);
            alert("Failed to register. Please try again.");
        }
    }

    const handleGoogleBtn = async (e) => {
        e.preventDefault();
        setLoading(true)
        setLoadingGoogle(true)
        try {
            await signIn("google", { callbackUrl: "/" })
        } catch (error) {
            alert("Failed to Login")
            setLoading(false)
            setLoadingGoogle(false)
        }

    }
    const handleGithubBtn = async (e) => {
        e.preventDefault();
        setLoading(true)
        setLoadingGithub(true)
        try {
            await signIn("github", { callbackUrl: "/" })
        } catch (error) {
            alert("Failed to Login")
            setLoading(false)
            setLoadingGithub(false)
        }
    }

    return (
        <div className="space-y-5 w-full max-w-sm sm:border-2 rounded-xl p-10 sm:shadow-lg sm:dark:border-[#121212]">
            <p className="text-xl font-bold">Create an account</p>
            {errors.error && (
                <div className="bg-red-100  p-2.5 rounded-xl w-full text-sm">
                    <p className="text-red-800 ">{errors.error}</p>
                </div>
            )}
            <div>
                <p >Username</p>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 p-2 rounded-xl w-full shadow-sm  outline-none dark:border-[#333333] dark:bg-[#121212]"
                />
                {errors.name && <p className="text-red-500 text-sm pt-1">{errors.name._errors[0]}</p>}
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
                {errors.email && <p className="text-red-500 text-sm pt-1">{errors.email._errors[0]}</p>}
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
                {errors.password && <p className="text-red-500 text-sm pt-1">{errors.password._errors[0]}</p>}
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
                {errors.confirmPassword && <p className="text-red-500 text-sm pt-1">{errors.confirmPassword._errors[0]}</p>}
            </div>
            <div className="space-y-1 pt-3">
                <button
                    onClick={handleRegisterBtn}
                    disabled={loading ? true : false}
                    className="bg-[#1e88e5] text-white  w-full p-1.5 rounded-xl "
                >
                    {loadingCredential ? (
                        <p className="animate-pulse">Register...</p>
                    ) : (
                        <p>Register</p>
                    )}

                </button>
                <p className="text-center">or</p>
                <div className="space-y-3">
                    <button
                        disabled={loading ? true : false}
                        onClick={handleGoogleBtn}
                        className="bg-white  text-black border-gray-300 dark:border-none border  w-full p-1.5 rounded-xl flex justify-center items-center gap-2"
                    >
                        <GoogleLogo size={20} className={`${loadingGoogle ? "animate-pulse" : "animate-none"}`} />
                        {loadingGoogle ? (
                            <p className="animate-pulse">Login with Google...</p>
                        ) : (
                            <p>Login with Google</p>
                        )}

                    </button>
                    <button
                        disabled={loading ? true : false}
                        onClick={handleGithubBtn}
                        className="bg-gray-600 text-white w-full p-1.5 rounded-xl flex justify-center items-center gap-2"
                    >
                        <GithubLogo size={20} className={`${loadingGithub ? "animate-pulse" : "animate-none"}`} />
                        {loadingGithub ? (
                            <p className="animate-pulse">Login with Github...</p>
                        ) : (
                            <p>Login with Github</p>
                        )}

                    </button>
                </div>
            </div>
            <div className="flex gap-x-2 ">
                <p>Already have an account?</p>
                <Link href={"/api/auth/signin"} className={`text-[#1e88e5]  ${loading ? "pointer-events-none" : "pointer-events-auto"}`}>Login</Link>
            </div>
        </div>
    )
}

export default FormRegister