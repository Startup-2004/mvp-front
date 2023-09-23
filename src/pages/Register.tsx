import { useState } from "react";
import Input from "../components/reusable/Input";
import { auth } from "../services/imports";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [credential, setCredential] = useState({ email: "", password: "" });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        return setCredential((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const navigate = useNavigate();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        return createUserWithEmailAndPassword(
            auth,
            credential.email,
            credential.password
        )
            .then(() => navigate("/"))
            .catch((error) => alert(error.message));
    }

    return (
        <form
            className="px-12 py-8 bg-white gap-2 flex flex-col shadow-lg items-center"
            onSubmit={onSubmit}
        >
            <h1>Register</h1>
            <Input type="text" onChange={handleChange} name="email" />
            <Input type="password" onChange={handleChange} name="password" />
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">
                Register
            </button>
            <a onClick={() => navigate("/auth/login")}>Go to Login</a>
        </form>
    );
}
