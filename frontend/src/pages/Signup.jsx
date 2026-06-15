import { useState } from "react";
import api from "../services/api";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await api.post("/register", {
                name,
                email,
                password,
            });

            alert("Signup Success");
            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );

        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={submitHandler}>
                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Sign Up
                </button>
                <p className="login-link">
                    Already have an account?
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Signup;