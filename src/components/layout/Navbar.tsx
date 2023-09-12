import { useState } from "react";
import { auth } from "../../services/imports";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const user = auth.currentUser;
    return (
        <header className="flex border-b min-h-[56px] max-h-[64px] items-center">
            <div className="px-8 w-full flex">
                <h1 className="font-bold text-2xl">Antibiotik</h1>
                <div className="flex-auto"></div>
                <div className="border p-2 mr-4 flex items-center">
                    <input
                        className="outline-none"
                        type="text"
                        value={search}
                        onChange={({ target: { value } }) => setSearch(value)}
                    />
                    <button className="m-0 p-0 border-l h-full">Search</button>
                </div>
                <div className="flex items-center">
                    {user ? (
                        <>{user.displayName}</>
                    ) : (
                        <Link to={"/auth/login"}> Go to Login </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
