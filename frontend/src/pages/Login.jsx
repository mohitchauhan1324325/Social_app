import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post(
                "/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                data.token
            );

            navigate("/");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="login-container">
            <form
                className="login-form"
                onSubmit={submitHandler}
            >
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Login
                </button>

                <p className="login-link">
                    Don't have an account?
                    <span onClick={() => navigate("/signup")}>
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;