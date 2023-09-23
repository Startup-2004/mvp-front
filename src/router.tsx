import { Outlet, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import AuthCard from "./components/layout/AuthCard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import ProductView from "./pages/ProductView";
import CompanyView from "./pages/CompanyView";

export default function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </>
                }
            >
                <Route path="" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="search/:q" element={<SearchPage />} />
                <Route path="product/:id" element={<ProductView />} />
                <Route path="company/:id" element={<CompanyView />} />
            </Route>
            <Route path="/auth" element={<AuthCard />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route
                path="*"
                element={
                    <div className="w-screen h-screen flex justify-center items-center text-2xl font-bold">
                        This page doesn't exist
                    </div>
                }
            />
        </Routes>
    );
}
