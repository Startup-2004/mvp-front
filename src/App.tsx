import { Outlet, useRoutes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import AuthCard from "./components/layout/AuthCard";
import { auth } from "./services/imports";
import { useState } from "react";
import { User } from "firebase/auth";
import Login from "./pages/Login";

function App() {
    const [user, setUser] = useState<User | null | false>(false);

    auth.onAuthStateChanged((user) => {
        setUser(user);
    });

    if (user === false) {
      return <>Loading...</>
    }

    return useRoutes([
        {
            path: "/",
            element: (
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            ),
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "about",
                    element: <About />,
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthCard />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
            ],
        },
    ]);
}

export default App;
