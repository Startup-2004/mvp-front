import { useState } from "react";
import { auth } from "../../services/imports";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const user = auth.currentUser;
    const navigate = useNavigate();

    return (
        <>
            <header className="flex border-b min-h-[56px] max-h-[64px] items-center justify-center">
                <div className="px-8 w-full flex">
                    <h1
                        className="font-bold text-2xl mt-[0.375rem]"
                        onClick={() => navigate("/")}
                    >
                        Antibiotik
                    </h1>
                    <div className="flex-auto"></div>
                    <div className="border p-2 mr-4 items-center hidden md:flex">
                        <input
                            className="outline-none"
                            type="text"
                            value={search}
                            onChange={({ target: { value } }) =>
                                setSearch(value)
                            }
                        />
                        <button
                            className="m-0 p-0 border-l h-full"
                            onClick={() => navigate("search/" + search)}
                        >
                            Search
                        </button>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex gap-2 items-center">
                                {user.email}{" "}
                                <span
                                    className="bg-red-500 text-white p-2 rounded"
                                    onClick={() => signOut(auth)}
                                >
                                    Logout
                                </span>
                            </div>
                        ) : (
                            <a onClick={() => navigate("/auth/login")}>
                                {" "}
                                Go to Login{" "}
                            </a>
                        )}
                    </div>
                </div>
            </header>
            <div className="border p-2 mx-auto my-4 md:hidden flex w-max">
                <input
                    className="outline-none"
                    type="text"
                    value={search}
                    onChange={({ target: { value } }) => setSearch(value)}
                />
                <button
                    className="m-0 p-0 border-l h-full"
                    onClick={() => navigate("search/" + search)}
                >
                    Search
                </button>
            </div>
        </>
    );
}
