import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                Social App
            </Link>

            <div className="nav-links">

                {token ? (
                    <>
                        <Link to="/feed">
                            <button className="nav-btn">
                                Feed
                            </button>
                        </Link>

                        <button
                            className="nav-btn logout-btn"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="nav-btn">
                                Login
                            </button>
                        </Link>

                        <Link to="/signup">
                            <button className="nav-btn signup-btn">
                                Signup
                            </button>
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;