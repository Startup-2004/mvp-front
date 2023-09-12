import { Outlet } from "react-router-dom";

export default function AuthCard() {
    return (
        <div className="w-full h-screen px-4">
            <div className="border w-max mx-auto h-full">
                <Outlet />
            </div>
        </div>
    );
}
