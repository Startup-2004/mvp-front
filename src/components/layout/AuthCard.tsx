import { Outlet } from "react-router-dom";

export default function AuthCard() {
    return (
        <div className="w-screen h-screen px-4 flex justify-center items-center">
            <div className="w-min mx-auto h-max">
                <Outlet />
            </div>
        </div>
    );
}
