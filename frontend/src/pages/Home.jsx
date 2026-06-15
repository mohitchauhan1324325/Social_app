import { Link } from "react-router-dom";
import "../css/Home.css";
import Navbar from "../components/Navbar";

function Home() {
    const token = localStorage.getItem("token");

    return (
        <>
            <Navbar />

            <div className="home-container">
                <div className="hero-card">
                    <h1>Welcome to Social App</h1>

                    <p>
                        Share your thoughts, upload images,
                        like posts, and connect with others.
                    </p>

                    {!token && (
                        <div className="hero-buttons">
                            <Link to="/login">
                                <button className="primary-btn">
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className="secondary-btn">
                                    Create Account
                                </button>
                            </Link>
                        </div>
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default Home;