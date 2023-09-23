import { auth } from "./services/imports";
import { useState } from "react";
import { User } from "firebase/auth";
import Router from "./router";

function App() {
    const [_, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);
    auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoaded(true);
    });

    if (loaded === false) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return <Router />;
}

export default App;